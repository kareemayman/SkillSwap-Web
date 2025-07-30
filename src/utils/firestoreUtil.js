import { collection, doc, getDocs, getDoc, serverTimestamp, setDoc, updateDoc, query, where, addDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
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
  return qSnap.docs.map((doc) => ({
    ...doc.data(),
  }));
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
        reviews: null, // array of review objects [{ id: "reviewId", reviewerId: "userId", reviewText: "Great session!", rating: 5 }]
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const submitRating = async (ratingData) => {
  try {
    const userRef = doc(db, "users", ratingData.revieweeId);
    
    const reviewId = crypto.randomUUID(); // Or any unique ID logic
    const review = {
      reviewId,
      reviewerId: ratingData.reviewerId,
      authorName: ratingData.authorName,
      authorPhoto: ratingData.authorPhoto || "", // make sure you pass it
      text: ratingData.text || "",        // optional comment
      rating: ratingData.overallRating,
      teachingSkill: ratingData.teachingSkill,
      communication: ratingData.communication,
      punctuality: ratingData.punctuality,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      reviews: arrayUnion(review)
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
    const skillNameArabic = await generateFromGemini(translateSkillToArabic(skill.skillName));

    const skillDocRef = await addDoc(collection(db, "skills"), {
      skillName: skill.skillName,
      skillNameArabic: skillNameArabic,
      createdAt: new Date(),
      category: category,
    })
  } catch (error) {
    console.error("Error creating skill document:", error);
  }
}

export const getSkillCategories = async () => {
  const skills = await fetchSkillsList();
  const categories = new Set(skills.map(skill => skill.category));
  return Array.from(categories);
}

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
}

export const deleteDocById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName} with ID ${docId}:`, error);
  }
}