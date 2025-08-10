import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
import dark from "../../assets/images/chat.jpg";
import light from "../../assets/images/lightchat.jpg";
import { useTranslation } from "react-i18next";
import {ThemeContext} from"../../contexts/ThemeContext.jsx";

export default function ChatScreen() {
  const { user: currentUser } = useAuth();
  const { userId: otherUserId } = useParams();

  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const { t }= useTranslation();
  const { darkMode } = useContext(ThemeContext);
    const chatImg = darkMode ? dark : light;


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


useEffect(() => {
  if (!chatId || !currentUser?.uid) return;

  const markLastMessageAsRead = async () => {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    const chatData = chatSnap.data();
    const lastMsg = chatData?.lastMessage;

    if (lastMsg && !lastMsg.readBy?.includes(currentUser.uid)) {
      await updateDoc(chatRef, {
        "lastMessage.readBy": [...(lastMsg.readBy || []), currentUser.uid],
      });
    }
  };

  markLastMessageAsRead();
}, [chatId, currentUser?.uid]);






  const handleSend = (text) => {
    if (chatId) sendMessage(chatId, currentUser.uid, text);
  };

  if (!currentUser) return <div>Loading current user...</div>;
  if (!otherUser) return <div>Loading chat partner...</div>;

  return (
    
<div className="w-full chat-box overflow-y-scroll  ">
  <div className="flex h-[100vh] bg-black backdrop-blur-xl  shadow-xl overflow-hidden">
    <div className="flex-1 flex flex-col px-5 overflow-hidden"
            style={{ backgroundImage: `url(${chatImg})`, backgroundSize: "cover" }}>

      {/* Header */}
      <div className="dark:bg-[var(--input-bg)] bg-[var(--input-bg)] px-5 -mx-5 py-4 border-b border-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold dark:text-gray-300 text-[var(--color-text-primary)]">
            {t("chat.chat")} {otherUser.name}
          </h1>
          <button
            onClick={() => navigate("/messages")}
            className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-light)] rounded-md shadow-sm  hover:bg-[var(--color-btn-back-hover)] transition"
          >
            <span>🔙</span>
            <span className="text-[var(--color-text-primary)] dark:text-gray-300"> {t("chat.Back")}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      
      <div className="flex-1 overflow-y-auto space-y-3 px-2 custom-scrollbar py-7">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isCurrentUser={msg.senderId === currentUser.uid}
            otherUserName={otherUser.name}
          />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>

    {/* Sidebar */}
    <UserSidebar user={otherUser} />
  </div>
</div>
  );
}
