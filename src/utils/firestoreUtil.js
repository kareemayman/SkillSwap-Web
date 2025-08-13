import {
  collection,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  query,
  where,
  addDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { getSkillCategory, translateSkillToArabic } from "./geminiPrompts";
import { generateFromGemini } from "../api/gemini";

export const fetchSkillsList = async () => {
  const qSnap = await getDocs(collection(db, "skills"));
  return qSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// export const getSkillById = async (id) => {
//   const qSnap = await getDocs(collection(db, "skills"));
//   return qSnap.docs.find(doc => doc.id === id);
// };

export const getUserById = async (id) => {
  const qSnap = await getDocs(collection(db, "users"));
  return qSnap.docs.find((doc) => doc.id === id);
};

export const getAllUsers = async () => {
  const qSnap = await getDocs(collection(db, "users"));
  return qSnap.docs
    .map((doc) => ({
      ...doc.data(),
    }))
    .filter((user) => user.email !== "skills.swap.app@gmail.com");
};

export const createUserDoc = async (user) => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: user.createdAt || serverTimestamp(),
        profilePicture: null, // string with url
        bio: null, // string
        phone: null, // string
        location: {
          city: null, // string
          country: null, // string
        },
        availability: null, // ["Mon 6-8pm", "Fri 3-5pm"],
        isAvailableForTrade: null, //boolean
        isAvailableForPaid: null, //boolean
        rating: null, //number
        totalSessions: null, // number
        hasSkills: null, // array of skill objects [{ id: "skillId", name: "skillName", skillLevel: "beginner" }]
        needSkills: null, // array of skill objects [{ id: "skillId", name: "skillName", skillLevel: "beginner" }]
        reviews: [], // array of review objects [{ id: "reviewId", reviewerId: "userId", reviewText: "Great session!", rating: 5 }]
        subscribtion: {
          plan: "free", // string, can be "free" or "pro"
          activeTradeCount: 0, // number of active trades
        },
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const submitRating = async (ratingData) => {
  try {
    const userRef = doc(db, "users", ratingData.revieweeId);

    const reviewId = crypto.randomUUID();
    const review = {
      reviewId,
      reviewerId: ratingData.reviewerId,
      authorName: ratingData.authorName,
      authorPhoto: ratingData.authorPhoto || "", // make sure you pass it
      text: ratingData.text || "", // optional comment
      rating: ratingData.overallRating,
      teachingSkill: ratingData.teachingSkill,
      communication: ratingData.communication,
      punctuality: ratingData.punctuality,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      reviews: arrayUnion(review),
    });

    return reviewId;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};
export const getUserRatings = async (userId) => {
  const q = query(collection(db, "ratings"), where("revieweeId", "==", userId));
  const qSnap = await getDocs(q);
  return qSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateUserRatingStats = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  const reviews = userData.reviews || [];
  const totalRatings = reviews.length;

  if (totalRatings === 0) return;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings;

  await updateDoc(userRef, {
    rating: averageRating,
    totalSessions: totalRatings,
  });
};

export const createSkillDoc = async (skill) => {
  try {
    const category = await generateFromGemini(getSkillCategory(skill.skillName, await getSkillCategories()));
    const skillNameArabic = await generateFromGemini(translateSkillToArabic(skill.skillName, category));

    const newSkill = {
      skillName: skill.skillName,
      skillNameArabic: skillNameArabic,
      createdAt: new Date(),
      category: category,
    };

    const skillDocRef = await addDoc(collection(db, "skills"), newSkill);

    newSkill.skillId = skillDocRef.id;
    delete newSkill.id;
    delete newSkill.createdAt;
    delete newSkill.category;

    return newSkill;
  } catch (error) {
    console.error("@fireStoreUtils -- @createSkillDoc -- Error creating skill document:\n", error);
    throw error;
  }
};

export const getSkillCategories = async () => {
  const skills = await fetchSkillsList();
  const categories = new Set(skills.map((skill) => skill.category));
  return Array.from(categories);
};

export const createFirestoreTrade = async (tradeData) => {
  try {
    const tradeDocRef = await addDoc(collection(db, "trades"), {
      ...tradeData,
      createdAt: serverTimestamp(),
    });
    return tradeDocRef.id;
  } catch (error) {
    console.error("Error creating trade document:", error);
    throw error;
  }
};

export const deleteDocById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName} with ID ${docId}:`, error);
  }
};

export const deleteSkillFromUsers = async (skillId) => {
  try {
    const usersSnap = await getDocs(collection(db, "users"));
    const batchPromises = [];

    usersSnap.forEach((docSnap) => {
      const userRef = docSnap.ref;
      const userData = docSnap.data();

      const newHasSkills = (userData.hasSkills || []).filter((skill) => skill.skillId !== skillId);
      const newNeedSkills = (userData.needSkills || []).filter((skill) => skill.skillId !== skillId);

      // Only update if something changed
      if (newHasSkills.length !== (userData.hasSkills || []).length || newNeedSkills.length !== (userData.needSkills || []).length) {
        batchPromises.push(
          updateDoc(userRef, {
            hasSkills: newHasSkills,
            needSkills: newNeedSkills,
          })
        );
      }
    });

    await Promise.all(batchPromises);
  } catch (error) {
    console.error("Error deleting skill from users:", error);
  }
};

export const deleteReview = async (userId, reviewId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const newReviews = (userData.reviews || []).filter((review) => review.reviewId !== reviewId);

    await updateDoc(userRef, {
      reviews: newReviews,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export const getTradeById = async (tradeId) => {
  try {
    const tradeDocRef = doc(db, "trades", tradeId);
    const tradeSnap = await getDoc(tradeDocRef);
    return tradeSnap.data();
  } catch (error) {
    console.error("Error getting trade by ID:", error);
  }
};

export const updateMilestone = async (tradeId, myMilestone, isUserA) => {
  try {
    const tradeDocRef = doc(db, "trades", tradeId);
    const tradeSnap = await getDoc(tradeDocRef);
    const tradeData = tradeSnap.data();

    if (isUserA) {
      // Get current milestonesA array
      const milestonesA = tradeData.milestonesA || [];

      // Update the milestone with matching id
      const updatedMilestonesA = milestonesA.map((m) => (m.id === myMilestone.id ? myMilestone : m));

      // Update milestonesA in Firestore
      await updateDoc(tradeDocRef, {
        milestonesA: updatedMilestonesA,
      });
    } else {
      // Get current milestonesB array
      const milestonesB = tradeData.milestonesB || [];

      // Update the milestone with matching id
      const updatedMilestonesB = milestonesB.map((m) => (m.id === myMilestone.id ? myMilestone : m));

      // Update milestonesB in Firestore
      await updateDoc(tradeDocRef, {
        milestonesB: updatedMilestonesB,
      });
    }
  } catch (error) {
    console.error("Error updating milestone:", error);
  }
};

export const updateTrade = async (tradeId, tradeData) => {
  try {
    const tradeDocRef = doc(db, "trades", tradeId);
    await updateDoc(tradeDocRef, tradeData);
  } catch (error) {
    console.error("Error updating trade:", error);
  }
};

export const updateSkillById = async (skillId, skillData) => {
  try {
    const skillDocRef = doc(db, "skills", skillId);
    await updateDoc(skillDocRef, skillData);
  } catch (error) {
    console.error("Error updating skill:", error);
  }
};

export const getSkillTrades = async () => {
  try {
    const qSnap = await getDocs(collection(db, "trades"));
    return qSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting skill trades:", error);
  }
};

export const getRequests = async () => {
  try {
    const qSnap = await getDocs(collection(db, "requests"));
    return qSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting requests:", error);
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, userData);
  } catch (error) {
    console.error("Error updating user by ID:", error);
  }
};
