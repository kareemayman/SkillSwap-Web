export default function ChatMessage({ message, isCurrentUser, otherUserName }) {
  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
      <span className="text-xs text-gray-400 mb-1">
        {isCurrentUser ? "You" : otherUserName || "User"}
      </span>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] shadow ${
          isCurrentUser
            ? "bg-gray-300 text-black"
            : "bg-zinc-700 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
