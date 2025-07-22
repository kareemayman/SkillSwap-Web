import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-2 gap-2 border-t">
      <input
        type="text"
        className="flex-1 p-2 border-[1px] border-[var(--color-card-content-bg)] bg-[var(--color-card-content-bg)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)]"

        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
              className="px-6 py-3 font-semibold rounded-lg text-[var(--color-text-light)] shadow-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-2xl hover:backdrop-blur-xl"
      >
        Send
      </button>
    </form>
  );
}
