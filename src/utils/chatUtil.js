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
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Create or fetch existing chat between two users
export const getOrCreateChatRoom = async (user1Id, user2Id) => {
  const chatId = user1Id < user2Id
    ? `${user1Id}_${user2Id}`
    : `${user2Id}_${user1Id}`;

  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [user1Id, user2Id],
      createdAt: serverTimestamp(),
      lastMessage: null,
    });
  }

  return chatId;
};


export const sendMessage = async (chatId, senderId, text) => {
  const messageRef = collection(db, "chats", chatId, "messages");
const messageData = {
  text,
  senderId,
  timestamp: serverTimestamp(),
  readBy: [senderId], 
};
  await addDoc(messageRef, messageData);

  await updateDoc(doc(db, "chats", chatId), {
lastMessage: {
    text,
    senderId,
    timestamp: serverTimestamp(),
    readBy: [senderId],
  },  });
};


export const subscribeToMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

export const getChatMessagesOnce = async (chatId) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// fetch last message for each user

export const subscribeToUserChats = (userId, callback) => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId),
    orderBy("lastMessage.timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(chats);
  });
};