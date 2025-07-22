export default function ChatMessage({ message, isCurrentUser, otherUserName }) {

  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mb-2`}>
      {/* Display name */}
      <span className="text-xs text-gray-500 mb-1">
        {isCurrentUser ? "You" : otherUserName || "User"}
      </span>

      {/* Message bubble */}
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] ${
          isCurrentUser
            ? "bg-[var(--color-skill-teach-bg)]"
            : "bg-[var(--color-skill-learn-bg)] text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
