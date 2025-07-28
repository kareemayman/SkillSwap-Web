export const Tag = ({ children, onClick, type = "teach" }) => {
  const bgClass =
    type === "learn"
      ? "bg-[var(--color-skill-learn-bg)] hover:bg-red-600 text-white/800"
      : "bg-[var(--color-skill-teach-bg)] hover:bg-red-600 text-[var(--color-text-secondary)]";

  return (
    <p
      onClick={onClick}
      className={`flex justify-center items-center ${bgClass}  p-4 py-2 rounded-lg w-fit hover:text-white/ text-center capitalize transition-all duration-300 cursor-pointer`}
    >
      {children}
    </p>
  );
};
