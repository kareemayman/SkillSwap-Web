import { faCheck, faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import toast from "react-hot-toast"
import { updateSkillById } from "../../../utils/firestoreUtil"

export default function EditSkillForm({ skill, setShowModal, deleteSkill, setAllSkills }) {
  const [skillName, setSkillName] = useState(skill?.skillName || "")
  const [skillNameArabic, setSkillNameArabic] = useState(skill?.skillNameArabic || "")
  const [category, setCategory] = useState(skill?.category || "")

  async function updateSkill() {
    if (skillName && skillNameArabic && category) {
      const updatedSkill = { ...skill, skillName, skillNameArabic, category }
      setAllSkills((prev) => prev.map((s) => (s.id === skill.id ? updatedSkill : s)))
      await updateSkillById(skill.id, updatedSkill)
      toast.success("Skill updated successfully!")
      setShowModal(false)
    }
  }

  return (
    <div className="top-0 left-0 z-50 fixed bg-[rgba(0,0,0,0.5)] w-full h-full">
      <div className="top-1/2 left-1/2 fixed bg-[#1e1c1b] p-5 border border-[var(--color-card-border)] rounded-lg min-w-[80%] sm:min-w-[500px] text-[var(--color-text-primary)] -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-[var(--color-text-light)] text-xl">Edit Skill</h1>
          <FontAwesomeIcon
            onClick={() => {
              setShowModal(false)
            }}
            className="mt-0.5 hover:text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
            icon={faClose}
          ></FontAwesomeIcon>
        </div>

        <h2 className="mb-2 font-semibold text-base">Skill Name</h2>
        <input
          type="text"
          name="skillName"
          id="skillName"
          value={skillName}
          onChange={(e) => {
            setSkillName(e.target.value)
          }}
          className="bg-[#151313f7] mb-6 p-4 py-3 border border-[var(--color-card-border)] focus:border-[var(--main-color)] rounded-md outline-none w-full placeholder-[var(--color-text-placeholder)] text-[var(--color-text-light)] transition-all duration-300"
        />

        <h2 className="mb-2 font-semibold text-base">Arabic Skill Name</h2>
        <input
          type="text"
          name="skillNameArabic"
          id="skillNameArabic"
          value={skillNameArabic}
          onChange={(e) => {
            setSkillNameArabic(e.target.value)
          }}
          className="bg-[#151313f7] mb-6 p-4 py-3 border border-[var(--color-card-border)] focus:border-[var(--main-color)] rounded-md outline-none w-full placeholder-[var(--color-text-placeholder)] text-[var(--color-text-light)] transition-all duration-300"
        />

        <h2 className="mb-2 font-semibold text-base">Skill Category</h2>
        <input
          type="text"
          name="category"
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          className="bg-[#151313f7] mb-6 p-4 py-3 border border-[var(--color-card-border)] focus:border-[var(--main-color)] rounded-md outline-none w-full placeholder-[var(--color-text-placeholder)] text-[var(--color-text-light)] transition-all duration-300"
        />

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 sm:items-center pt-6">
          <div
            onClick={() => {
              deleteSkill(skill.id)
              setShowModal(false)
            }}
            className="flex justify-center items-center gap-1 border border-[#542b2b] bg-[#2e1c1c] hover:bg-[#3a2424] px-4 py-3 rounded-md font-bold text-[#ff6b6b] text-base transition-all duration-300 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            <p>Delete</p>
          </div>

          <div className="flex gap-4">
            <div
              onClick={() => {
                setShowModal(false)
              }}
              className="flex flex-1 sm:flex-initial justify-center items-center gap-1 border border-[var(--color-card-border)] bg-transparent hover:bg-[#252321] px-4 py-3 rounded-md font-bold text-[var(--color-text-primary)] text-base transition-all duration-300 cursor-pointer"
            >
              <p>Cancel</p>
            </div>
            <div
              onClick={() => {
                updateSkill()
                setShowModal(false)
              }}
              className="flex flex-1 sm:flex-initial justify-center items-center gap-1 border border-[var(--color-card-border)] bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] px-4 py-3 rounded-md font-bold text-[var(--color-text-light)] text-base transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon
                className="hidden sm:inline-block text-lg"
                icon={faCheck}
              ></FontAwesomeIcon>
              <p className="text-center">Save Skill</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
