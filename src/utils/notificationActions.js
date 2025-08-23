// utils/notificationActions.js
import { doc, updateDoc, getDoc, increment, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { createNotification } from "./notificationService";
import { generateFromGemini } from "../api/gemini";
import { generateMilestonesPrompt } from "./geminiPrompts";
import { createFirestoreTrade } from "./firestoreUtil";

export const handleNotificationAction = async (
  notificationId,
  action,
  navigate,
  currentUser,
  callBack = {
    fn: (text) => {
      console.log("no callBack function was provided, this the default message ---- text:", text);
    },
    args: {},
  }
) => {
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
        return await handleAcceptRequest(notification, currentUser, navigate, callBack);

      case "decline":
        return await handleDeclineRequest(notification, currentUser);

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

const handleAcceptRequest = async (notification, currentUser, navigate, callBack) => {
  const requestRef = doc(db, "requests", notification.requestId);

  console.log("@handleAcceptRequest ---- callBack =", callBack);

  try {
    // provide feedback to user with toast
    callBack.fn?.loading("Updating users data...", callBack?.args);

    const requestSnap = await getDoc(requestRef);
    if (!requestSnap.exists()) {
      console.error("Request does not exist:", notification.requestId);
      throw new Error("This request no longer exists.");
    }

    const { requestedSkill, requestedSkillLevel, requestedUser, offeredSkill, offeredSkillLevel, payment, requestingUser } = requestSnap.data();

    const userARef = doc(db, "users", requestedUser.uid);
    const userBRef = doc(db, "users", requestingUser.uid);

    const [userASnap, userBSnap] = await Promise.all([getDoc(userARef), getDoc(userBRef)]);

    if (!userASnap.exists()) {
      console.error("Current user does not exist:", requestedUser.uid);
      throw new Error("One of the trade participants no longer exists.");
    }
    if (!userBSnap.exists()) {
      console.error("Request sender does not exist:", requestingUser.uid);
      throw new Error("One of the trade participants no longer exists.");
    }

    const userAData = userASnap.data();
    const userBData = userBSnap.data();

    await runTransaction(db, async (transaction) => {
      // Helper: determine plan
      const isPro = (user) => user.subscribtion?.plan === "pro";

      // Current counts
      const skillTradesCountUserA = userAData.subscribtion?.activeTradeCount || 0;
      const skillTradesCountUserB = userBData.subscribtion?.activeTradeCount || 0;

      // Check the accepter
      if (!isPro(userAData) && skillTradesCountUserA >= 1) {
        throw new Error("Free users can only have 1 active skill-for-skill trade at a time.");
      }

      // Check the other user (the one who sent the request)
      if (!isPro(userBData) && skillTradesCountUserB >= 1) {
        throw new Error("The other user has already reached their free plan skill trade limit.");
      }

      transaction.update(userARef, {
        "subscribtion.activeTradeCount": skillTradesCountUserA + 1,
      });
      transaction.update(userBRef, {
        "subscribtion.activeTradeCount": skillTradesCountUserB + 1,
      });

      transaction.update(requestRef, {
        requestStatus: "accepted",
        acceptedAt: serverTimestamp(),
      });
    });

    callBack.fn?.success("Users data updated successfully", callBack?.args);

    callBack.fn?.loading("Creating milestones...", callBack?.args);

    // Create the trade
    let milestonesA = await generateFromGemini(generateMilestonesPrompt(requestedSkill, requestedSkillLevel));
    milestonesA = milestonesA.replace("```json", "").replace("```", "");
    milestonesA = JSON.parse(milestonesA);

    let milestonesB = null;
    if (offeredSkill && offeredSkillLevel) {
      milestonesB = await generateFromGemini(generateMilestonesPrompt(offeredSkill, offeredSkillLevel));
      milestonesB = milestonesB.replace("```json", "").replace("```", "");
      milestonesB = JSON.parse(milestonesB);
    }

    callBack.fn?.success("Milestones created successfully", callBack?.args);

    callBack.fn?.loading("Saving trade data...", callBack?.args);

    const tradeData = {
      userA: requestedUser.uid,
      userB: requestingUser.uid,
      skillA: requestedSkill,
      skillALevel: requestedSkillLevel,
      skillB: payment ? "PAYMENT" : offeredSkill,
      skillBLevel: payment ? "PAYMENT" : offeredSkillLevel,
      milestonesA,
      milestonesB,
      payment: payment || null,
      status: "active",
    };

    const createdTrade = await createFirestoreTrade(tradeData);
    // toast.success(t("Session scheduled successfully!"));
    // navigate(`/trade/${trade?.id}`);
    // setDisabledButton(false);

    callBack.fn?.success("Trade data saved successfully, Redirecting...", callBack?.args);

    // Create notification for the requesting user
    await createNotification("TRADE_ACCEPTED", {
      recipientId: notification.senderId,
      senderId: currentUser.uid,
      senderName: currentUser.name,
      senderProfilePicture: currentUser.profilePicture,
      requestId: notification.requestId,
      tradeId: createdTrade.id,
    });

    // TODO: can add notifications to users about the new trade

    // Navigate to trade page where AI will create the trade and milestones
    navigate(`/trade/${createdTrade.id}`);

    return { success: true, message: "Trade accepted successfully!" };
  } catch (error) {
    console.error("Error accepting request:", error);
    throw new Error(error.message);
  }
};

const handleDeclineRequest = async (notification, currentUser) => {
  const requestRef = doc(db, "requests", notification.requestId);

  // Update request status
  await updateDoc(requestRef, {
    requestStatus: "declined",
    declinedAt: new Date(),
  });

  // Create notification for the requesting user
  await createNotification("TRADE_DECLINED", {
    recipientId: notification.senderId,
    senderId: currentUser.uid,
    senderName: currentUser.name,
    senderProfilePicture: currentUser.profilePicture,
    requestId: notification.requestId,
  });
};
