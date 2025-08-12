import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function FAQ({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="sm:w-[600px] md:w-[740px] mx-auto border border-[var(--color-card-border)] rounded-lg p-5 my-5 select-none">
      <div
        className="flex font-bold justify-between items-center text-[var(--color-text-light)] text-base cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <p>{question}</p>
        <FontAwesomeIcon
          icon={showAnswer ? faAngleUp : faAngleDown}
          className="text-[var(--color-text-primary)] transition-all duration-300 hover:text-[var(--color-text-light)]"
        ></FontAwesomeIcon>
      </div>

      {showAnswer && <p className="text-[var(--color-text-primary)] pt-4">{answer}</p>}
    </div>
  )
}
