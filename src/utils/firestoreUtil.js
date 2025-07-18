import { collection, doc, getDocs, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
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

export const createUserDoc = async (user) => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      createdAt: user.metadata?.creationTime || serverTimestamp(),
      profilePicture: user.photoURL || "",
      isAvailableForTrade: true,
      isAvailableForPaid: false,
    });
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

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

export const createUserDoc2 = async (user) => {
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
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};
