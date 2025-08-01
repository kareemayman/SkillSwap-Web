import { faCheck, faFlagCheckered, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function Milestone({ milestone, controls }) {
  const [isCompleted, setIsCompleted] = useState(milestone.isCompleted)

  return (
    <div className="mb-6 p-4 pr-6 rounded-lg border border-[var(--color-card-border)] bg-[#252321] flex items-start gap-3 relative">
      {controls ? (
        <div 
          onClick={() => setIsCompleted(!isCompleted)}
          className={`rounded-md w-7 h-7 ${isCompleted ? "bg-[var(--main-color)]" : "bg-white"} cursor-pointer transition-all duration-300 flex items-center justify-center`}>
            <FontAwesomeIcon icon={faCheck} className="text-white"></FontAwesomeIcon>
        </div>
      ) : (
        <div
          className={`rounded-full ${
            milestone.isCompleted
              ? "bg-[var(--main-color)] text-white"
              : "bg-[#36322f] text-[var(--color-text-primary)]"
          } w-7 h-7 flex items-center justify-center`}
        >
          {milestone.isCompleted ? (
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faFlagCheckered}></FontAwesomeIcon>
          )}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-[var(--color-text-light)] font-bold">{milestone.title}</h2>
        <p className="text-[var(--color-text-primary)] font-semibold mt-1">
          {milestone.description}
        </p>
      </div>
      {controls && (
        <div className="flex absolute top-4 right-4 items-center gap-2 text-[var(--color-text-primary)]">
          <FontAwesomeIcon
            icon={faPencil}
            className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]"
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer transition-all duration-300 hover:text-[var(--main-color)]"
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  )
}
