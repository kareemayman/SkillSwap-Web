import React from "react"

export const SkillInfo = ({ skillName, skillLevel, type }) => {
  return (
    <div>
      <hr className="border border-solid border-[var(--color-btn-submit-hover)]" />

      <div className="flex items-center my-4 flex-col sm:flex-row">
        <p className="text-[var(--color-text-secondary)] sm:min-w-56 font-medium capitalize">
          {skillName} ({skillLevel})
        </p>
        <p className="text-[var(--color-text-primary)] font-medium capitalize">{type}</p>
      </div>
    </div>
  )
}
