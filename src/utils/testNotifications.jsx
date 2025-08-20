// populateNotifications.js
// Run this script to populate your Firestore with sample notifications

import { useAuth } from "../contexts/Auth/context";
import { db } from "../firebase";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

// Sample notification data with proper structure for Firestore
const sampleNotifications = [
  {
    id: 1,
    type: "TRADE_REQUEST",
    title: "newSkillExchangeRequest",
    description: "wantsToTrade",
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isRead: false,
    senderId: "user123",
    senderName: "John Doe",
    senderProfilePicture: "https://example.com/john.jpg",
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    yourSkill: "Python",
    theirSkill: "JavaScript",
    actions: ["accept", "decline"],
    requestId: "req123",
    payment: null,
    notes: "I would love to learn Python from you!",
  },
  {
    id: 2,
    type: "PAYMENT_RECEIVED",
    title: "paymentReceived",
    description: "receivedPaymentFrom",
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false,
    senderId: "user456",
    senderName: "Sarah Johnson",
    senderProfilePicture: "https://example.com/sarah.jpg",
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    actions: ["viewBalance", "withdraw"],
    amount: 50,
    currency: "USD",
    tradeId: "trade789",
  },
  {
    id: 3,
    type: "SYSTEM_NOTIFICATION",
    title: "profileUpdated",
    description: "profileSuccessfullyUpdated",
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isRead: true,
    senderId: "system",
    senderName: "Swapoo",
    senderProfilePicture: null,
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    actions: [],
  },
  {
    id: 4,
    type: "TRADE_COMPLETED",
    title: "tradeCompleted",
    description: "tradeCompletedWith",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    senderId: "user789",
    senderName: "Mike Wilson",
    senderProfilePicture: "https://example.com/mike.jpg",
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    yourSkill: "Design",
    theirSkill: "Marketing",
    actions: ["ratePartner"],
    tradeId: "trade456",
    partnerId: "user789",
  },
  {
    id: 5,
    type: "MILESTONE_COMPLETED",
    title: "milestoneCompleted",
    description: "completedMilestone",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: false,
    senderId: "user101",
    senderName: "Alice Brown",
    senderProfilePicture: "https://example.com/alice.jpg",
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    actions: ["reviewMilestone"],
    tradeId: "trade123",
    milestoneId: "milestone456",
    milestoneTitle: "Project Setup Phase",
  },
  {
    id: 6,
    type: "WITHDRAWAL_APPROVED",
    title: "withdrawalApproved",
    description: "withdrawalRequestApproved",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    senderId: "system",
    senderName: "Swapoo",
    senderProfilePicture: null,
    recipientId: "A8iXup6TK8XE4z9AhavT791Q3Em2",
    actions: ["viewBalance"],
    amount: 100,
    currency: "USD",
    withdrawalId: "withdrawal789",
  },
];

// Function to populate notifications
export const populateNotifications = async (userId = "A8iXup6TK8XE4z9AhavT791Q3Em2") => {
  try {
    console.log("🚀 Starting to populate notifications...");

    // Update recipient ID for all notifications
    const notificationsToCreate = sampleNotifications.map((notification) => ({
      ...notification,
      recipientId: userId,
    }));

    // Use batch write for better performance
    const batch = writeBatch(db);
    const createdIds = [];

    for (const notification of notificationsToCreate) {
      // Generate a document reference with auto ID
      const docRef = doc(collection(db, "notifications"));
      const notificationWithId = {
        id: docRef.id,
        ...notification,
      };

      batch.set(docRef, notificationWithId);
      createdIds.push(docRef.id);
      console.log(`📝 Queued notification: ${notification.type} (${docRef.id})`);
    }

    // Commit the batch
    await batch.commit();

    console.log("✅ Successfully created notifications!");
    console.log(`📊 Total notifications created: ${createdIds.length}`);
    console.log(`👤 For user: ${userId}`);

    return {
      success: true,
      count: createdIds.length,
      ids: createdIds,
    };
  } catch (error) {
    console.error("❌ Error populating notifications:", error);
    throw error;
  }
};

// Function to clear all notifications (for testing)
export const clearAllNotifications = async (userId = "A8iXup6TK8XE4z9AhavT791Q3Em2") => {
  try {
    console.log("🧹 Clearing all notifications...");

    // Note: You'll need to implement this based on your needs
    // This is a basic example - in production you might want pagination

    const { getDocs, query, where, deleteDoc } = await import("firebase/firestore");

    const q = query(collection(db, "notifications"), where("recipientId", "==", userId));

    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`✅ Cleared ${querySnapshot.size} notifications for user: ${userId}`);

    return {
      success: true,
      deletedCount: querySnapshot.size,
    };
  } catch (error) {
    console.error("❌ Error clearing notifications:", error);
    throw error;
  }
};

// Quick test function you can call
export const testNotifications = async (userId) => {
  try {
    console.log("🧪 Starting notification test...");

    // Clear existing notifications
    await clearAllNotifications(userId);

    // Populate new notifications
    const result = await populateNotifications(userId);

    console.log("🎉 Test completed successfully!");
    return result;
  } catch (error) {
    console.error("❌ Test failed:", error);
    throw error;
  }
};

const TestNotificationsButton = () => {
  const { user } = useAuth();

  const handlePopulate = async () => {
    try {
      console.log("🚀 Starting to populate notifications from React component...");
      const result = await populateNotifications(user?.uid);
      alert(`✅ Success! Created ${result.count} notifications`);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Error creating notifications: " + error.message);
    }
  };

  const handleClear = async () => {
    try {
      console.log("🧹 Clearing notifications from React component...");
      const result = await clearAllNotifications(user?.uid);
      alert(`✅ Cleared ${result.deletedCount} notifications`);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Error clearing notifications: " + error.message);
    }
  };

  const handleTest = async () => {
    try {
      console.log("🧪 Running full test from React component...");
      const result = await testNotifications(user?.uid);
      alert(`✅ Test completed! Created ${result.count} notifications`);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Test failed: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p className="text-yellow-800">Please log in to test notifications</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg space-y-3">
      <h3 className="font-bold text-lg">🧪 Notification Testing</h3>
      <p className="text-sm text-gray-600">User ID: {user.uid}</p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePopulate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          📝 Populate Notifications
        </button>

        <button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          🧹 Clear All
        </button>

        <button
          onClick={handleTest}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🚀 Full Test (Clear + Populate)
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">💡 Check browser console for detailed logs</p>
    </div>
  );
};

// Export individual functions for use in other components
// export { populateNotifications, clearAllNotifications, testNotifications };

// Export React component as default
export default TestNotificationsButton;
