export default function ChatMessage({ message, isCurrentUser, otherUserName }) {
  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
      <span className="text-xs dark:text-gray-400 text-black mb-1">
        {isCurrentUser ? "You" : otherUserName || "User"}
      </span>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] shadow ${
          isCurrentUser
            ? "dark:bg-gray-300 bg-gray-300 text-black"
            : "dark:bg-zinc-700 bg-[#bc640dd8] text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
