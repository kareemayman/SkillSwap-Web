import {
  faCheck,
  faFlagCheckered,
  faPencil,
  faRobot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { updateMilestone, updateTrade } from "../../../utils/firestoreUtil"

export default function Milestone({ tradeId, milestone, controls, setTrade, trade, isUserA }) {
  const [myMilestone, setMyMilestone] = useState(milestone)

  useEffect(() => {
    updateMilestone(tradeId, myMilestone, isUserA)
    if (setTrade) {
      if (isUserA) {
        setTrade((prevTrade) => ({
          ...prevTrade,
          milestonesA: prevTrade.milestonesA.map((m) =>
            m.id === myMilestone.id ? myMilestone : m
          ),
        }))
      } else {
        setTrade((prevTrade) => ({
          ...prevTrade,
          milestonesB: prevTrade.milestonesB.map((m) =>
            m.id === myMilestone.id ? myMilestone : m
          ),
        }))
      }
    }
  }, [myMilestone])

  function deleteMilestone() {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      if (setTrade) {
        const prevTrade = trade
        if (isUserA) {
          const newTrade = {
            ...prevTrade,
            milestonesA: prevTrade.milestonesA.filter((m) => m.id !== myMilestone.id),
          }
          setTrade(newTrade)
          updateTrade(tradeId, newTrade)
        } else {
          const newTrade = {
            ...prevTrade,
            milestonesB: prevTrade.milestonesB.filter((m) => m.id !== myMilestone.id),
          }
          setTrade(newTrade)
          updateTrade(tradeId, newTrade)
        }
      }
    }
  }

  return (
    <div
      className={`mb-6 p-4 pr-6 rounded-lg border border-[var(--color-card-border)] bg-[#252321] flex items-start gap-3 relative`}
    >
      {controls ? (
        <div
          onClick={() => {
            setMyMilestone({ ...myMilestone, isCompleted: !myMilestone.isCompleted })
          }}
          className={`rounded-md w-7 h-7 ${
            myMilestone.isCompleted ? "bg-[var(--main-color)]" : "bg-white"
          } cursor-pointer transition-all duration-300 flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={faCheck} className="text-white"></FontAwesomeIcon>
        </div>
      ) : (
        <div
          className={`rounded-full ${
            myMilestone.isCompleted
              ? "bg-[var(--main-color)] text-white"
              : "bg-[#36322f] text-[var(--color-text-primary)]"
          } w-7 h-7 flex items-center justify-center`}
        >
          {myMilestone.isCompleted ? (
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faFlagCheckered}></FontAwesomeIcon>
          )}
        </div>
      )}
      <div className="flex-1">
        <h2 className={`text-[var(--color-text-light)] font-bold ${controls && "pr-11"}`}>
          {myMilestone.title}
        </h2>
        <p className="text-[var(--color-text-primary)] font-semibold mt-1">
          {myMilestone.description}
        </p>
        {myMilestone.AI && (
          <div className="bg-[#31292a] px-1 py-[2px] flex gap-1 items-center text-[var(--main-color)] w-fit text-xs rounded-sm mt-2">
            <FontAwesomeIcon icon={faRobot}></FontAwesomeIcon>
            <p>AI Generated</p>
          </div>
        )}
      </div>
      {controls && (
        <div className="flex absolute top-4 right-4 items-center gap-2 text-[var(--color-text-primary)]">
          <FontAwesomeIcon
            icon={faPencil}
            className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]"
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            onClick={deleteMilestone}
            icon={faTrash}
            className="cursor-pointer transition-all duration-300 hover:text-[var(--main-color)]"
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  )
}
