import React from "react";
import { LuX, LuTrash2 } from "react-icons/lu";

// Consistent styling for skill levels across components
const LEVEL_STYLES = {
  beginner: "bg-blue-50 text-blue-700 border-blue-200 border",
  intermediate: "bg-green-50 text-green-700 border-green-200 border",
  advanced: "bg-purple-50 text-purple-700 border-purple-200 border",
  default: "bg-gray-100 text-gray-800",
};

/**
 * A display tag for skills, now with skill level and an edit mode.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The skill name.
 * @param {string} [props.skillLevel] - The skill's proficiency level (e.g., 'beginner').
 * @param {boolean} [props.isEditing=false] - If true, the tag is in edit mode and shows the delete icon.
 * @param {function} [props.onDelete] - Callback to run when the delete icon is clicked.
 * @param {boolean} [props.teaching] - If true, styles the tag for teaching skills.
 */
export const Tag = ({ children, skillLevel, isEditing = false, onDelete, teaching }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent any parent onClick events
    onDelete?.();
  };

  // Determine the style for the level indicator, with a fallback
  const levelStyle = LEVEL_STYLES[skillLevel] || LEVEL_STYLES.default;
  const levelText = skillLevel || "N/A";

  return (
    <div
      className={`flex items-center gap-2 w-fit ${
        teaching ? "bg-[var(--color-skill-teach-bg)] text-black" : "bg-[var(--color-skill-learn-bg)] text-white"
      } text-sm font-medium text-[var(--color-text-secondary)] pl-2.5 pr-2 py-1.5 rounded-full transition-all duration-300`}
    >
      {/* Skill Name */}
      <span className="capitalize font-semibold text-sm sm:text-base">{children}</span>

      {/* Skill Level Indicator */}
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${levelStyle}`}>{levelText}</span>

      {/* Delete Icon (only in edit mode) */}
      {isEditing && (
        <button
          onClick={handleDelete}
          title={`Remove ${children}`}
          aria-label={`Remove ${children}`}
          className={`flex items-center justify-center p-1 -m-1 rounded-full ${
            teaching ? "text-black hover:text-red-600" : "text-white hover:text-red-400"
          } transition-colors duration-200`}
        >
          <LuTrash2 size={18} />
        </button>
      )}
    </div>
  );
};
