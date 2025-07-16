import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export const fetchSkillsList = async () => {
  const qSnap = await getDocs(collection(db, "skills"));
  return qSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
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
      name: user.displayName ,
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