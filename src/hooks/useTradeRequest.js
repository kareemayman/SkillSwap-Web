// hooks/useTradeRequest.js
import { useState } from "react";
import { createRequest } from "../utils/requestsUtils";
import { createNotification } from "../utils/notificationService";
import { useAuth } from "../contexts/Auth/context";
import toast from "react-hot-toast";

export const useTradeRequest = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendTradeRequest = async (requestData, targetUser) => {
    try {
      setLoading(true);
      setError(null);

      // Create the request first
      const newRequest = await createRequest(requestData, user, targetUser);

      // Then create notification using the request data
      await createNotification("TRADE_REQUEST", {
        recipientId: targetUser.uid,
        senderId: user.uid,
        senderName: user.name,
        senderProfilePicture: user.profilePicture,
        requestId: newRequest.requestId,
        requestedSkill: newRequest.requestedSkill,
        offeredSkill: newRequest.offeredSkill,
        payment: newRequest.payment,
        notes: newRequest.notes,
      });

      toast.success("Trade request sent successfully!");
      return newRequest;
    } catch (err) {
      const errorMessage = err.message || "Failed to send trade request";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendTradeRequest,
    loading,
    error,
  };
};
