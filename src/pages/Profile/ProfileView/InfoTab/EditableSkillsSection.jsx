import React, { useState } from "react";
import { Tag } from "./Tag"; // Adjust path if needed
import EditButton from "../EditButton"; // This is a generic "Add" button now
import SkillSelector from "./SkillSelector";
import { LuCirclePlus, LuCircleCheck, LuCircleX } from "react-icons/lu";
import SkillLevelSelector from "../../CreateProfile/Step3/SkillLevelSelector";
import { useTranslation } from "react-i18next";

export default function EditableSkillsSection({ title, data = [], skillType, updateUserData, isOwnProfile }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [skillsData, setSkillsData] = useState(data);
  const { t, i18n } = useTranslation();
  // console.log("@EditableSkillsSection ---- i18n =", i18n);

  // This function receives the new skills from the SkillSelector
  const handleAddNewSkills = (newSkills) => {
    setError(null);

    if (newSkills.length === 0) {
      setIsAdding(false);
      return;
    }

    // Add skillLevel based on the type of section
    const skillsWithLevel = newSkills.map((skill) => ({
      ...skill,
      // skillLevel: skillType === "hasSkills" ? "intermediate" : "beginner",
    }));

    const updatedSkills = [...skillsData, ...skillsWithLevel];

    // Call the main update function passed from the profile page
    updateUserData(skillType, updatedSkills);

    setIsAdding(false);
  };

  const handleRemoveSkill = (skillIdToRemove) => {
    const updatedSkills = data.filter((skill) => skill.skillId !== skillIdToRemove);
    updateUserData(skillType, updatedSkills);
  };

  const handleCancelEditing = () => {
    setError(null);
    setIsEditing(false);
    setSkillsData(data);
  };

  const handleSaveEditing = () => {
    updateUserData(skillType, skillsData);
    setIsEditing(false);
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    setSkillsData((prevSkills) => prevSkills.map((skill) => (skill.skillId === skillId ? { ...skill, skillLevel: newLevel } : skill)));
    // console.log("Skill level updated:", { skillId, newLevel });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl font-semibold text-[--color-text-primary]">{title}</h2>

        {/* We don't show the add button while the selector is already open */}
        {isOwnProfile && !isAdding && !isEditing && (
          <div className="flex items-center gap-2">
            <button
              title="Add Skills"
              className="p-1 rounded-full shadow-lg bg-[--main-color] text-[--color-text-light] hover:bg-white hover:text-[--color-btn-submit-bg] transition-colors"
              onClick={() => setIsAdding(true)}
            >
              <LuCirclePlus size={20} />
            </button>

            <EditButton title="Edit Skills" classes="" onClickHandler={() => setIsEditing(true)} />
          </div>
        )}
      </div>

      {/* Display existing skills as tags */}
      <div className="flex flex-wrap gap-2">
        {data && data.length > 0 ? (
          data.map((skill) => (
            <Tag
              key={skill.skillId}
              isEditing={isAdding || isEditing}
              onDelete={() => handleRemoveSkill(skill.skillId)}
              teaching={skillType === "hasSkills"}
              skillLevel={skill.skillLevel}
            >
              {i18n.language === "ar" ? (skill?.skillNameArabic ? skill?.skillNameArabic : skill?.skillName) : skill?.skillName}
            </Tag>
          ))
        ) : (
          <p className="text-[--color-text-secondary]">No skills added yet.</p>
        )}
      </div>

      {/* Show error if any */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Conditionally render the SkillSelector component */}
      {isAdding && (
        <SkillSelector
          onSave={handleAddNewSkills}
          onCancel={() => {
            setIsAdding(false);
            setError(null);
          }}
          existingSkills={skillsData}
          placeholder={`${t("Add skills for")} "${title}"...`}
          skillType={skillType}
        />
      )}

      {isEditing && (
        <div className="p-4 mt-4 border rounded-lg bg-gray-50/50 dark:bg-[#1a1a17] border-gray-300 dark:border-[--color-btn-submit-bg] space-y-4">
          <SkillLevelSelector skills={skillsData} onSkillLevelChange={handleSkillLevelChange} />

          <div className="flex items-center gap-2">
            <button
              aria-label="Save edited Skills"
              className="p-1 rounded-full bg-green-100 text-green-700  transition-colors hover:bg-green-700 hover:text-green-100"
              title="Save Changes"
              onClick={handleSaveEditing}
            >
              <LuCircleCheck size={20} />
            </button>

            <button
              aria-label="Cancel editing Skills"
              className="p-1 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
              title="Cancel"
              onClick={handleCancelEditing}
            >
              <LuCircleX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
