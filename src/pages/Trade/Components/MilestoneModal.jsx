import { faCheck, faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function MilestoneModal({ data, setShowModal, deleteMilestone, setMyMilestone }) {
  const [milestoneTitle, setMilestoneTitle] = useState(data.title)
  const [milestoneDesc, setMilestoneDesc] = useState(data.description)
  const [milestoneCompleted, setMilestoneCompleted] = useState(data.isCompleted)

  return (
    <div className="top-0 left-0 z-50 fixed bg-[rgba(0,0,0,0.5)] w-full h-full">
      <div className="top-1/2 left-1/2 fixed bg-[#1e1c1b] p-5 border border-[var(--color-card-border)] rounded-lg lg:min-w-[500px] text-[var(--color-text-primary)] -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-[var(--color-text-light)] text-xl">Edit Milestone</h1>
          <FontAwesomeIcon
            onClick={() => {setShowModal(false)}}
            className="mt-0.5 hover:text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
            icon={faClose}
          ></FontAwesomeIcon>
        </div>

        <h2 className="mb-2 font-semibold text-base">Milestone Title *</h2>
        <input
          type="text"
          name="milestoneTitle"
          id="milestoneTitle"
          value={milestoneTitle}
          onChange={e => {setMilestoneTitle(e.target.value)}}
          className="bg-[#151313f7] mb-6 p-4 py-3 border border-[var(--color-card-border)] focus:border-[var(--main-color)] rounded-md outline-none w-full placeholder-[var(--color-text-placeholder)] text-[var(--color-text-light)] transition-all duration-300"
        />

        <h2 className="mb-2 font-semibold text-base">Description *</h2>
        <textarea
          name="milestoneTitle"
          id="milestoneTitle"
          value={milestoneDesc}
          onChange={e => {setMilestoneDesc(e.target.value)}}
          className="bg-[#151313f7] mb-6 p-4 py-3 border border-[var(--color-card-border)] focus:border-[var(--main-color)] rounded-md outline-none w-full min-h-40 placeholder-[var(--color-text-placeholder)] text-[var(--color-text-light)] transition-all duration-300 resize-none"
        />

        <div
          onClick={() => {setMilestoneCompleted(!milestoneCompleted)}}
          className="flex items-center pb-6 border-b border-b-[var(--color-card-border)]">
          <div className={`${milestoneCompleted ? "bg-[var(--main-color)]" : "bg-white"} mr-1.5 rounded-sm w-5 h-5 transition-all duration-300 cursor-pointer text-white font-bold text-lg flex justify-center items-center`}>
              {milestoneCompleted && <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>}
          </div>
          <p className="cursor-pointer font-semibold text-[var(--color-text-primary)] text-base">
            Mark as completed
          </p>
        </div>

        <div className="flex justify-between items-center pt-6">
          <div 
            onClick={deleteMilestone}
            className="flex justify-center items-center gap-1 border border-[#542b2b] bg-[#2e1c1c] hover:bg-[#3a2424] px-4 py-3 rounded-md font-bold text-[#ff6b6b] text-base transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            <p>Delete</p>
          </div>

          <div className="flex gap-4">
            <div 
              onClick={() => {setShowModal(false)}}
              className="flex justify-center items-center gap-1 border border-[var(--color-card-border)] bg-transparent hover:bg-[#252321] px-4 py-3 rounded-md font-bold text-[var(--color-text-primary)] text-base transition-all duration-300 cursor-pointer">
              <p>Cancel</p>
            </div>
            <div 
              onClick={() => {
                setMyMilestone({...data, title: milestoneTitle, description: milestoneDesc, isCompleted: milestoneCompleted})
                setShowModal(false)
              }}
              className="flex justify-center items-center gap-1 border border-[var(--color-card-border)] bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] px-4 py-3 rounded-md font-bold text-[var(--color-text-light)] text-base transition-all duration-300 cursor-pointer">
              <FontAwesomeIcon className="text-lg" icon={faCheck}></FontAwesomeIcon>
              <p>Save Milestone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
