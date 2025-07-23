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
    <form onSubmit={handleSubmit} className="flex mt-4 gap-3 border-t border-gray-700 pt-4">
      <input
        type="text"
      className='w-full border-neutral-950 focus:border-[var(--color-card-content-border)] bg-[var(--input-bg)] text-[var(--color-text-primary)] rounded-md shadow-sm   '
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] text-white font-medium rounded-xl  transition"
      >
        Send
      </button>
    </form>
  );
}
