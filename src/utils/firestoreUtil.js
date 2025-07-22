import { collection, doc, getDocs, getDoc, serverTimestamp, setDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

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
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const submitRating = async (ratingData) => {
  try {
    // Only create one document when submitting
    const ratingRef = doc(collection(db, "ratings"));
    await setDoc(ratingRef, {
      ...ratingData,
      createdAt: serverTimestamp(), // Use server timestamp
    });
    return ratingRef.id;
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
  const ratings = await getUserRatings(userId);
  const totalRatings = ratings.length;

  if (totalRatings === 0) return;

  const averageRating = ratings.reduce((sum, rating) => sum + rating.overallRating, 0) / totalRatings;

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    rating: averageRating,
    totalSessions: totalRatings,
  });
};
