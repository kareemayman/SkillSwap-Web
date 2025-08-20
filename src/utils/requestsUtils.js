import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const createRequest = async (request, user, otherUser) => {
  try {
    const docRef = doc(collection(db, "requests"));
    const newRequest = {
      requestId: docRef.id,
      requestedSkill: request.requestedSkill,
      offeredSkill: request.offeredSkill || null,
      payment: request.payment || null,
      requestStatus: "pending",
      requestedUser: {
        uid: otherUser.uid,
        name: otherUser.name,
        profilePicture: otherUser.profilePicture,
      },
      requestingUser: {
        uid: user.uid,
        name: user.name,
        profilePicture: user.profilePicture,
      },
      notes: request.notes || null,
    };
    await setDoc(docRef, newRequest);
    return newRequest;
  } catch (error) {
    throw new Error(error.message);
  }
};
