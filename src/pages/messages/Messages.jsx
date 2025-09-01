import { useEffect, useState } from "react";
import { Tabs, TabItem } from "flowbite-react";
import MsgCart from "./components/MsgCart";
import { useAuth } from "../../contexts/Auth/context";
import { subscribeToUserChats } from "../../utils/chatUtil";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import img from "/images/profile.png";
import { useTranslation } from "react-i18next";

export default function Messages() {
  const { user: currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [userCache, setUserCache] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = subscribeToUserChats(currentUser.uid, setChats);
    return () => unsub();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchUsers = async () => {
      const newCache = { ...userCache };
      for (const chat of chats) {
        for (const uid of chat.participants) {
          if (uid !== currentUser.uid && !newCache[uid]) {
            const snap = await getDoc(doc(db, "users", uid));
            if (snap.exists()) newCache[uid] = snap.data();
          }
        }
      }
      setUserCache(newCache);
    };

    fetchUsers();
  }, [chats, currentUser?.uid]);

  const handleClick = (chat) => {
    const otherUserId = chat.participants.find((id) => id !== currentUser.uid);
    navigate(`/chat/${otherUserId}`);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-16">
      <h1 className="text-[var(--main-color)] text-3xl font-bold mb-4">
       {t("messages.Messages")} 📩
      </h1>
      <p className="text-[var(--color-text-secondary)] leading-5 mb-4">
        {t("messages.title")}
      </p>

<div className="flex border-b mb-4">
  <button
    onClick={() => setActiveTab("all")}
    className={`px-4 py-2 font-medium border-b-2 ${
      activeTab === "all"
        ? "border-[var(--color-accent)] text-[var(--main-color)]"
        : "border-transparent text-gray-500"
    }`}
  >
        {t("messages.all")}
  </button>
  <button
    onClick={() => setActiveTab("unread")}
    className={`px-4 py-2 font-medium border-b-2 ${
      activeTab === "unread"
        ? "border-[var(--color-accent)] text-[var(--main-color)]"
        : "border-transparent text-gray-500"
    }`}
  >
        {t("messages.unread")}
  </button>
</div>

{/* Show content based on activeTab */}
<div className="flex flex-col gap-4 w-full">
  {(activeTab === "all" ? chats : chats.filter((chat) => {
    const lastMsg = chat.lastMessage;
    return (
      lastMsg &&
      lastMsg.senderId !== currentUser.uid &&
      (!lastMsg.readBy || !lastMsg.readBy.includes(currentUser.uid))
    );
  }))
    .map((chat) => {
      const otherUserId = chat.participants.find(
        (id) => id !== currentUser.uid
      );
      const otherUser = userCache[otherUserId];

      const isUnread =
        chat?.lastMessage?.senderId !== currentUser.uid &&
        (!chat?.lastMessage?.readBy ||
          !chat?.lastMessage?.readBy.includes(currentUser.uid));

      return otherUser ? (
        <div
          key={chat.id}
          onClick={() => handleClick(chat)}
          className="cursor-pointer"
        >
          <MsgCart
            data={{
              pic: otherUser.profilePicture || img,
              name: otherUser.name || "Unknown",
              msg: chat?.lastMessage?.text || "",
              time: new Date(
                chat?.lastMessage?.timestamp?.toDate()
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: isUnread,
            }}
          />
        </div>
      ) : null;
    })}
</div>
    </div>
  );
}
