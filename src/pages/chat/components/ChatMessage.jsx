export default function ChatMessage({ message, isCurrentUser }) {
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] ${
          isCurrentUser ? "bg-[var(--color-skill-teach-bg)] " : "bg-[var(--color-skill-learn-bg)] text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
