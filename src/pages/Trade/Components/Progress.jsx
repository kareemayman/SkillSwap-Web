export default function Progress({ completed, outOf }) {
  return (
    <div>
      <div className="flex justify-between items-center text-[var(--color-text-primary)] text-sm font-semibold">
        <p>
          Progress: {completed} of {outOf} completed
        </p>
        <p>{Math.floor((completed / outOf) * 100)}%</p>
      </div>
      <div className="rounded-full bg-[#2a2724] h-2 mt-2 w-full">
        <div
          className="h-2 rounded-full bg-[var(--main-color)]"
          style={{ width: `${Math.floor((completed / outOf) * 100)}%` }}
        ></div>
      </div>
    </div>
  )
}
