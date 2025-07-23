import { useEffect, useState } from "react";
import { Tabs, TabItem } from "flowbite-react";
import MsgCart from "./components/MsgCart";
import { useAuth } from "../../contexts/Auth/context";
import { subscribeToUserChats } from "../../utils/chatUtil";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/profile.png";
export default function Messages() {
  const { user: currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [userCache, setUserCache] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = subscribeToUserChats(currentUser.uid, setChats);
    return () => unsub();
  }, [currentUser]);

  // Fetch user info for participants
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchUsers = async () => {
      const newCache = { ...userCache }; // safe to use snapshot
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

  // ⬅️ removed `userCache` here
  const handleClick = (chat) => {
    const otherUserId = chat.participants.find((id) => id !== currentUser.uid);
    navigate(`/chat/${otherUserId}`);
  };

  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-16">
        <h1 className="text-[var(--color-text-primary)] text-3xl font-bold mb-4">
          Messages 📩
        </h1>
        <p className="text-[var(--color-text-secondary)] leading-5 mb-4">
          Communicate with potential matches, discuss skill exchange, schedule
          sessions.
        </p>
        <Tabs aria-label="Tabs with underline" variant="underline">
          <TabItem active title="All" />
          <TabItem title="Unread" />
        </Tabs>

        <div className="flex flex-col gap-4 w-full">
          {chats.map((chat) => {
            const otherUserId = chat.participants.find(
              (id) => id !== currentUser.uid
            );
            const otherUser = userCache[otherUserId];

            return otherUser ? (
              <div
                key={chat.id}
                onClick={() => handleClick(chat)}
                className="cursor-pointer"
              >
                <MsgCart
                  data={{
                    pic: otherUser.photoURL || img,
                    name: otherUser.name || "Unknown",
                    msg: chat?.lastMessage?.text || "",
                    time: new Date(
                      chat?.lastMessage?.timestamp?.toDate()
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    unread: false, // you can enhance this later
                  }}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
