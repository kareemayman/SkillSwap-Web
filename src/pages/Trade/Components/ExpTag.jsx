export default function ExpTag({ expLevel }) {
  return (
    <span
      className={`capitalize absolute text-[10px] sm:flex justify-center items-center hidden dark:bg-[#2a2724] bg-[var(--color-skill-learn-bg)] dark:text-[var(--color-text-secondary)] text-white/80 rounded-xl px-2 left-[calc(100%+10px)] h-5 top-[50%] -translate-y-1/2`}
    >
      {expLevel}
    </span>
  )
}
