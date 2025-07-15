import { collection, getDocs } from "firebase/firestore"
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