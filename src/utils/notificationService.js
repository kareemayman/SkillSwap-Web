// utils/notificationService.js
import { db } from "../firebase";
import { doc, setDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";

export const createNotification = async (type, data) => {
  try {
    const docRef = doc(collection(db, "notifications"));

    const baseNotification = {
      id: docRef.id,
      type,
      createdAt: new Date(),
      isRead: false,
      recipientId: data.recipientId,
      senderId: data.senderId || "system",
      senderName: data.senderName || "System",
      senderProfilePicture: data.senderProfilePicture || null,
      ...generateNotificationContent(type, data),
    };

    await setDoc(docRef, baseNotification);

    // // Add to user's notification array for easy querying
    // await updateDoc(doc(db, "users", data.recipientId), {
    //   notifications: arrayUnion(docRef.id),
    // });

    return baseNotification;
  } catch (error) {
    throw new Error(error.message);
  }
};

const generateNotificationContent = (type, data) => {
  switch (type) {
    case "TRADE_REQUEST":
      return {
        title: "newSkillExchangeRequest",
        description: "wantsToTrade", // Will be: t("wantsToTrade") + " " + senderName
        actions: ["accept", "decline"],
        yourSkill: data.requestedSkill,
        theirSkill: data.offeredSkill,
        // Additional data for actions
        requestId: data.requestId,
        payment: data.payment || null,
        notes: data.notes || null,
      };

    case "TRADE_ACCEPTED":
      return {
        title: "tradeRequestAccepted",
        description: "acceptedYourTradeRequest", // Will be: t("acceptedYourTradeRequest") + " " + senderName
        actions: ["viewTrade"],
        requestId: data.requestId,
        tradeId: data.tradeId || null,
      };

    case "TRADE_DECLINED":
      return {
        title: "tradeRequestDeclined",
        description: "declinedYourTradeRequest", // Will be: t("declinedYourTradeRequest") + " " + senderName
        actions: [],
        requestId: data.requestId,
      };

    case "MILESTONE_COMPLETED":
      return {
        title: "milestoneCompleted",
        description: "completedMilestone", // Will be: t("completedMilestone") + " " + milestoneTitle
        actions: ["reviewMilestone"],
        tradeId: data.tradeId,
        milestoneId: data.milestoneId,
        milestoneTitle: data.milestoneTitle,
      };

    case "PAYMENT_RECEIVED":
      return {
        title: "paymentReceived",
        description: "receivedPaymentFrom", // Will be: t("receivedPaymentFrom") + " " + senderName
        actions: ["viewBalance", "withdraw"],
        amount: data.amount,
        tradeId: data.tradeId,
        currency: data.currency || "USD",
      };

    case "TRADE_COMPLETED":
      return {
        title: "tradeCompleted",
        description: "tradeCompletedWith", // Will be: t("tradeCompletedWith") + " " + senderName
        actions: ["ratePartner"],
        tradeId: data.tradeId,
        partnerId: data.partnerId || data.senderId,
      };

    case "PAYMENT_SENT":
      return {
        title: "paymentSent",
        description: "sentPaymentTo", // Will be: t("sentPaymentTo") + " " + recipientName
        actions: ["viewTransaction"],
        amount: data.amount,
        tradeId: data.tradeId,
        currency: data.currency || "USD",
        recipientName: data.recipientName,
      };

    case "WITHDRAWAL_APPROVED":
      return {
        title: "withdrawalApproved",
        description: "withdrawalRequestApproved", // Will be: t("withdrawalRequestApproved")
        actions: ["viewBalance"],
        amount: data.amount,
        withdrawalId: data.withdrawalId,
        currency: data.currency || "USD",
      };

    case "SYSTEM_NOTIFICATION":
      return {
        title: data.title || "systemNotification",
        description: data.description || "systemUpdate",
        actions: data.actions || [],
        ...(data.metadata || {}),
      };

    default:
      return {
        title: data.title || "notification",
        description: data.description || "newNotification",
        actions: data.actions || [],
        ...(data.metadata || {}),
      };
  }
};
