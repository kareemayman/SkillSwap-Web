export default function ExpTag({ expLevel }) {
  return (
    <span
      className={`absolute text-[10px] sm:flex justify-center items-center hidden bg-[#2a2724] text-[var(--color-text-secondary)] rounded-xl px-2 left-[calc(100%+10px)] h-5 top-[50%] -translate-y-1/2`}
    >
      {expLevel}
    </span>
  )
}
