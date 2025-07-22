import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/Auth/context";
import { db } from "../../firebase";

import {
  getOrCreateChatRoom,
  sendMessage,
  subscribeToMessages,
} from "../../utils/chatUtil";
import UserSidebar from "./components/UserSidebar";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import Header from "../../components/Header";

export default function ChatScreen() {
  const { user: currentUser } = useAuth();
  const { userId: otherUserId } = useParams();

  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!otherUserId) return;
    getDoc(doc(db, "users", otherUserId)).then((snap) => {
      if (snap.exists()) setOtherUser({ uid: otherUserId, ...snap.data() });
    });
  }, [otherUserId]);

  useEffect(() => {
    if (!currentUser?.uid || !otherUser?.uid) return;

    const init = async () => {
      const id = await getOrCreateChatRoom(currentUser.uid, otherUser.uid);
      setChatId(id);
      const unsub = subscribeToMessages(id, setMessages);
      return () => unsub();
    };
    init();
  }, [currentUser, otherUser]);

  const handleSend = (text) => {
    if (chatId) sendMessage(chatId, currentUser.uid, text);
  };

  if (!currentUser) return <div>Loading current user...</div>;
  if (!otherUser) return <div>Loading chat partner...</div>;

  return (
    <>
      <Header></Header>
      <div className=" container mx-auto py-9 px-4 md:px-16">
        <div className="flex h-screen backdrop-blur-xl border shadow-2xl rounded-[18px] p-2 w-full border-[var(--color-card-border)]">
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4 " style={{borderBottom: "1px solid var(--color-card-border)",paddingBottom: "15px"}}>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Chat with {otherUser.name}
              </h1>
              <button
                onClick={() => navigate("/messages")}
                className="group flex items-center gap-2 px-4 py-2 bg-black font-semibold rounded-lg text-[var(--color-text-light)] hover:scale-105 transition-all"
              >
                <span className="transform group-hover:-translate-x-1 transition">
                  🔙
                </span>
                <span>Back</span>
              </button>
            </div>
            {/* <h2 className="text-2xl font-bold mb-4">Chat with {otherUser.name}</h2> */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 pt-2">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.senderId === currentUser.uid}
                />
              ))}
            </div>
            <ChatInput onSend={handleSend} />
          </div>
          <UserSidebar user={otherUser} />
        </div>
      </div>
    </>
  );
}
