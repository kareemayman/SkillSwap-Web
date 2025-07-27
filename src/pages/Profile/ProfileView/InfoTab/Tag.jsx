import React from "react";
import { LuX } from "react-icons/lu";

// Consistent styling for skill levels across components
const LEVEL_STYLES = {
  beginner: "bg-blue-100 text-blue-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-purple-100 text-purple-800",
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
 */
export const Tag = ({ children, skillLevel, isEditing = false, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent any parent onClick events
    onDelete?.();
  };

  // Determine the style for the level indicator, with a fallback
  const levelStyle = LEVEL_STYLES[skillLevel] || LEVEL_STYLES.default;
  const levelText = skillLevel || "N/A";

  return (
    <div className="flex items-center gap-2 w-fit bg-gray-50 border border-gray-200 text-sm font-medium text-[var(--color-text-secondary)] pl-1 pr-2 py-1 rounded-full transition-all duration-300">
      {/* Skill Level Indicator */}
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${levelStyle}`}>{levelText}</span>

      {/* Skill Name */}
      <span className="capitalize">{children}</span>

      {/* Delete Icon (only in edit mode) */}
      {isEditing && (
        <button
          onClick={handleDelete}
          aria-label={`Remove ${children}`}
          className="flex items-center justify-center p-1 -mr-1 rounded-full text-gray-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <LuX size={14} />
        </button>
      )}
    </div>
  );
};
