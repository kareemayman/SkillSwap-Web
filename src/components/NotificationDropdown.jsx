import { useAuth } from "../contexts/Auth/context";
import { db } from "../firebase";
import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBell, FaTimes, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { handleNotificationAction } from "../utils/notificationActions";
import toast from "react-hot-toast";

// Sample notification data
// const sampleNotifications = [
//   {
//     id: 1,
//     type: "TRADE_REQUEST",
//     title: "newSkillExchangeRequest",
//     description: "wantsToTrade",
//     createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
//     isRead: false,
//     senderId: "user123",
//     senderName: "John Doe",
//     senderProfilePicture: "https://example.com/john.jpg",
//     recipientId: "currentUserId",
//     yourSkill: "Python",
//     theirSkill: "JavaScript",
//     actions: ["accept", "decline"],
//     requestId: "req123",
//     payment: null,
//     notes: "I would love to learn Python from you!",
//   },
//   {
//     id: 2,
//     type: "PAYMENT_RECEIVED",
//     title: "paymentReceived",
//     description: "receivedPaymentFrom",
//     createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
//     isRead: false,
//     senderId: "user456",
//     senderName: "Sarah Johnson",
//     senderProfilePicture: "https://example.com/sarah.jpg",
//     recipientId: "currentUserId",
//     actions: ["viewBalance", "withdraw"],
//     amount: 50,
//     currency: "USD",
//     tradeId: "trade789",
//   },
//   {
//     id: 3,
//     type: "SYSTEM_NOTIFICATION",
//     title: "profileUpdated",
//     description: "profileSuccessfullyUpdated",
//     createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
//     isRead: true,
//     senderId: "system",
//     senderName: "Swapoo",
//     senderProfilePicture: null,
//     recipientId: "currentUserId",
//     actions: [],
//   },
//   {
//     id: 4,
//     type: "TRADE_COMPLETED",
//     title: "tradeCompleted",
//     description: "tradeCompletedWith",
//     createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
//     isRead: true,
//     senderId: "user789",
//     senderName: "Mike Wilson",
//     senderProfilePicture: "https://example.com/mike.jpg",
//     recipientId: "currentUserId",
//     yourSkill: "Design",
//     theirSkill: "Marketing",
//     actions: ["ratePartner"],
//     tradeId: "trade456",
//     partnerId: "user789",
//   },
//   {
//     id: 5,
//     type: "MILESTONE_COMPLETED",
//     title: "milestoneCompleted",
//     description: "completedMilestone",
//     createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
//     isRead: false,
//     senderId: "user101",
//     senderName: "Alice Brown",
//     senderProfilePicture: "https://example.com/alice.jpg",
//     recipientId: "currentUserId",
//     actions: ["reviewMilestone"],
//     tradeId: "trade123",
//     milestoneId: "milestone456",
//     milestoneTitle: "Project Setup Phase",
//   },
//   {
//     id: 6,
//     type: "WITHDRAWAL_APPROVED",
//     title: "withdrawalApproved",
//     description: "withdrawalRequestApproved",
//     createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
//     isRead: true,
//     senderId: "system",
//     senderName: "Swapoo",
//     senderProfilePicture: null,
//     recipientId: "currentUserId",
//     actions: ["viewBalance"],
//     amount: 100,
//     currency: "USD",
//     withdrawalId: "withdrawal789",
//   },
// ];

const sampleNotifications = [];

export default function NotificationDropdown({ iconOrText = "icon", userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { t } = useTranslation();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  // Real-time notifications listener
  useEffect(() => {
    if (!authUser?.uid) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "notifications"), where("recipientId", "==", authUser.uid), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to JavaScript Date
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setNotifications(notificationData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setNotifications(sampleNotifications);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authUser?.uid]);

  // Combined effect for closing dropdown on outside click and escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (id) => {
    if (!authUser?.uid) return; // Don't call API if no authUser

    try {
      const notificationRef = doc(db, "notifications", id);
      await updateDoc(notificationRef, { isRead: true });
      // Real-time listener will update the state automatically
    } catch (error) {
      console.error("Error marking as read:", error);
      // // Fallback: update local state if API fails
      // setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    }
  };

  const markAsUnread = async (id) => {
    if (!authUser?.uid) return; // Don't call API if no authUser
    console.log("Marking as unread:", id);

    try {
      const notificationRef = doc(db, "notifications", id);
      await updateDoc(notificationRef, { isRead: false });
      // Real-time listener will update the state automatically
    } catch (error) {
      console.error("Error marking as unread:", error);
      // // Fallback: update local state if API fails
      // setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)));
    }
  };

  const markAllAsRead = async () => {
    if (!authUser?.uid) return; // Don't call API if no authUser

    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      const promises = unreadNotifications.map((notification) => updateDoc(doc(db, "notifications", notification.id), { isRead: true }));
      await Promise.all(promises);
      // Real-time listener will update the state automatically
    } catch (error) {
      console.error("Error marking all as read:", error);
      // // Fallback: update local state if API fails
      // setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  const handleAction = async (notificationId, action) => {
    let toastId;

    try {
      if (!authUser?.uid) {
        console.log(`Demo action: ${action} for notification: ${notificationId}`);
        return;
      }

      toastId = toast.loading("Processing...");

      await handleNotificationAction(notificationId, action, navigate, userProfile, { fn: toast, args: { id: toastId } });
    } catch (error) {
      console.error("Error handling action:", error);
      // You might want to show a toast notification here
      toast.error("Action failed. Please try again.", { id: toastId });
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Show loading state
  if (loading) {
    return (
      <button className="relative text-xl p-2 rounded-full" title="Loading notifications">
        <FaBell size={20} className="text-gray-400 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Notification Button */}
      {iconOrText === "text" ? (
        <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2" title="Notifications">
          <span>{t("notifications")}</span>

          {/* Badge */}
          {unreadCount > 0 && (
            <span className="bg-[--main-color] text-white font-bold rounded-full h-5 w-5 text-center text-[10px]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      ) : (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative text-xl p-2 rounded-full transition-transform duration-200 hover:scale-110 "
          title="Notifications"
        >
          <FaBell size={20} className="" />

          {/* Badge */}
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-[--main-color] text-white font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25 sm:hidden" />

          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-[--bg-color1] rounded-lg shadow-lg border border-[--color-card-border] z-50 max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-[--color-card-border]">
              <h3 className="font-semibold text-[--color-text-primary]">
                {t("notifications")}
                <span className="font-medium text-sm text-[--color-text-secondary]">
                  {" "}
                  ({unreadCount} {t("unread")})
                </span>
              </h3>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[--color-btn-submit-bg] hover:text-[--color-btn-submit-hover] dark:hover:text-gray-300 hover:underline flex flex-col"
                  >
                    <span>{t("markAll")}</span>
                    <span> {t("asRead")}</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[--color-btn-submit-bg] hover:text-[--color-btn-submit-hover] dark:hover:text-gray-300"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto brand">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-[--color-text-primary] bg-[--bg-color2]">
                  <FaBell size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onMarkAsUnread={markAsUnread}
                    onAction={handleAction}
                    onRemove={removeNotification}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {/* <div className="p-3 border-t border-[--color-card-border] bg-gray-50 dark:bg-gray-900">
              <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline">View all notifications</button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}

function NotificationItem({ notification, onMarkAsRead, onMarkAsUnread, onAction, onRemove }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    // can open
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  // Generate localized description with dynamic content
  const getLocalizedDescription = (notification) => {
    const baseDescription = t(notification.description);

    switch (notification.type) {
      case "TRADE_REQUEST":
      case "TRADE_ACCEPTED":
      case "TRADE_DECLINED":
      case "TRADE_COMPLETED":
      case "PAYMENT_RECEIVED":
        return `${notification.senderName} ${baseDescription}`;

      case "MILESTONE_COMPLETED":
        return `${baseDescription} "${notification.milestoneTitle}"`;

      case "PAYMENT_SENT":
        return `${baseDescription} ${notification.recipientName}`;

      default:
        return baseDescription;
    }
  };

  return (
    <div
      className={`p-3 border-b border-[--color-card-border] transition-colors duration-150  group hover:bg-[--bg-color3] ${
        !notification.isRead ? "bg-[--bg-color2]" : "bg-[--bg-color1]"
      }`}
      // onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between">
          {/* Unread indicator & profile picture */}
          <div className="flex items-start gap-2">
            {!notification.isRead && <div className=" w-2 h-2 bg-[--main-color] rounded-full" />}

            {notification.senderProfilePicture ? (
              <img
                src={notification.senderProfilePicture}
                alt={notification.senderName}
                className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{notification.senderName?.[0]?.toUpperCase() || "S"}</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 px-2">
            <h4 className="font-medium text-sm">{t(notification.title)}</h4>
            <p className="text-xs text-[--color-text-secondary] mt-1">{getTimeAgo(notification.createdAt, t)}</p>
          </div>

          {/* notifications actions buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                notification.isRead ? onMarkAsUnread(notification.id) : onMarkAsRead(notification.id);
              }}
              title={notification.isRead ? "Mark as Unread" : "Mark as Read"}
              className={`text-[--color-btn-submit-bg] hover:text-[--color-btn-submit-hover] transition-opacity ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {notification.isRead ? <FaRegEyeSlash size={14} /> : <FaRegEye size={14} />}
            </button>

            {/* Remove button */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(notification.id);
              }}
              title="Remove Notification"
              className={`text-[--color-btn-submit-bg] hover:text-[--color-btn-submit-hover] transition-opacity ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <FaTimes size={14} />
            </button> */}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm pl-10">
          {getLocalizedDescription(notification)}
          {notification.amount && (
            <span className="font-semibold text-green-600 dark:text-green-400">
              {" "}
              ${notification.amount} {notification.currency}
            </span>
          )}
        </p>

        {/* Skill Exchange Display */}
        {(notification.type === "TRADE_REQUEST" || notification.type === "TRADE_COMPLETED") && notification.yourSkill && notification.theirSkill && (
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg ml-10">
            <span className="text-xs md:text-sm font-semibold text-[--color-text-secondary]">{notification.yourSkill}</span>
            <TbArrowsExchange size={24} className="" />
            <span className="text-xs md:text-sm font-semibold text-[--color-text-secondary]">{notification.theirSkill}</span>
          </div>
        )}

        {/* Action Buttons */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="flex gap-2 pt-2 pl-10">
            {notification.actions.map((action) => (
              <button
                key={action}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(notification.id, action);
                }}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg shadow-md hover:shadow-xl active:shadow-sm active:scale-95 transition-all ${
                  action === "decline"
                    ? "bg-white/100 text-[--color-btn-submit-bg] hover:bg-[--color-btn-submit-hover] hover:text-white/100"
                    : "bg-[--color-btn-submit-bg] dark:text-[--color-text-light] text-white/100 hover:bg-[--color-btn-submit-hover]"
                }`}
              >
                {t(action)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Time calculation function
function getTimeAgo(createdAt, t) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));

  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? `1 ${t("minute")} ${t("ago")}` : `${diffInMinutes} ${t("minutesAgo")}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? `1 ${t("hour")} ${t("ago")}` : `${diffInHours} ${t("hoursAgo")}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? `1 ${t("day")} ${t("ago")}` : `${diffInDays} ${t("daysAgo")}`;
}
