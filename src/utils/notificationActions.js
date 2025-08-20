// utils/notificationActions.js
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createNotification } from "./notificationService";

export const handleNotificationAction = async (notificationId, action, userId, navigate, currentUser) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    const notificationDoc = await getDoc(notificationRef);

    if (!notificationDoc.exists()) {
      throw new Error("Notification not found");
    }

    const notification = notificationDoc.data();

    // Mark notification as read
    await updateDoc(notificationRef, { isRead: true });

    switch (action) {
      case "accept":
        return await handleAcceptRequest(notification, userId, currentUser, navigate);

      case "decline":
        return await handleDeclineRequest(notification, userId, currentUser);

      case "viewTrade":
        navigate(`/trade/${notification.tradeId}`);
        break;

      case "reviewMilestone":
        navigate(`/trade/${notification.tradeId}?milestone=${notification.milestoneId}`);
        break;

      case "viewBalance":
        navigate("/wallet");
        break;

      case "withdraw":
        navigate("/wallet?action=withdraw");
        break;

      case "ratePartner":
        navigate(`/rate/${notification.partnerId}?trade=${notification.tradeId}`);
        break;

      case "viewTransaction":
        navigate(`/transactions/${notification.tradeId}`);
        break;

      default:
        console.log("Unknown action:", action);
    }
  } catch (error) {
    console.error("Error handling notification action:", error);
    throw error;
  }
};

const handleAcceptRequest = async (notification, userId, currentUser, navigate) => {
  const requestRef = doc(db, "requests", notification.requestId);

  // Update request status
  await updateDoc(requestRef, {
    requestStatus: "accepted",
    acceptedAt: new Date(),
  });

  // Create notification for the requesting user
  await createNotification("TRADE_ACCEPTED", {
    recipientId: notification.senderId,
    senderId: userId,
    senderName: currentUser.name,
    senderProfilePicture: currentUser.profilePicture,
    requestId: notification.requestId,
    tradeId: null, // Will be set after trade creation
  });

  // Navigate to trade page where AI will create the trade and milestones
  navigate(`/trade/${notification.requestId}?status=accepted`);
};

const handleDeclineRequest = async (notification, userId, currentUser) => {
  const requestRef = doc(db, "requests", notification.requestId);

  // Update request status
  await updateDoc(requestRef, {
    requestStatus: "declined",
    declinedAt: new Date(),
  });

  // Create notification for the requesting user
  await createNotification("TRADE_DECLINED", {
    recipientId: notification.senderId,
    senderId: userId,
    senderName: currentUser.name,
    senderProfilePicture: currentUser.profilePicture,
    requestId: notification.requestId,
  });
};
