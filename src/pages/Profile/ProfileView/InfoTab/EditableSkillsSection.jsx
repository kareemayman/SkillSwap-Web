// import React, { useState } from "react";
// import { LuSquarePen } from "react-icons/lu";

// export default function EditableSkillsSection({ title, data, updateUserData }) {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-start">
//         <h2 className="text-xl font-semibold text-[--color-text-primary]">{title}</h2>
//         <button onClick={() => setIsEditing(!isEditing)} title="Edit" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//           <LuSquarePen size={16} />
//         </button>
//       </div>

//       {isEditing ? (
//         <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
//           <p className="text-sm text-gray-600">Custom skill editing components will be placed here</p>
//           <div className="flex gap-2">
//             <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//               Done
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-2">
//           {data &&
//             data.map((skill, index) => (
//               <span key={skill.skillId || index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                 {skill.skillName} ({skill.skillLevel})
//               </span>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

// components/Profile/Info/EditableSkillsSection.js

import React, { useState } from "react";
import { Tag } from "./Tag"; // Adjust path if needed
import EditButton from "../EditButton"; // This is a generic "Add" button now
import SkillSelector from "./SkillSelector";
import { LuCirclePlus } from "react-icons/lu";

export default function EditableSkillsSection({
  title,
  data = [],
  skillType,
  updateUserData,
  isOwnProfile,
}) {
  const [isAdding, setIsAdding] = useState(false);

  // This function receives the new skills from the SkillSelector
  const handleAddNewSkills = (newSkills) => {
    if (newSkills.length === 0) {
      setIsAdding(false);
      return;
    }

    // Add skillLevel based on the type of section
    const skillsWithLevel = newSkills.map((skill) => ({
      ...skill,
      skillLevel: skillType === "hasSkills" ? "intermediate" : "beginner",
    }));

    const updatedSkills = [...data, ...skillsWithLevel];

    // Call the main update function passed from the profile page
    updateUserData(skillType, updatedSkills);

    setIsAdding(false);
  };

  // A function to remove a skill (optional but good for UX)
  const handleRemoveSkill = (skillIdToRemove) => {
    const updatedSkills = data.filter(
      (skill) => skill.skillId !== skillIdToRemove
    );
    updateUserData(skillType, updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[--color-text-primary]">
          {title}
        </h2>

        {/* We don't show the add button while the selector is already open */}
        {!isAdding && isOwnProfile && (
          <EditButton
            title="Add Skills"
            classes="!p-2" // override default padding to be smaller
            onClickHandler={() => setIsAdding(true)}
          >
            <LuCirclePlus size={20} />
          </EditButton>
        )}
      </div>

      {/* Display existing skills as tags */}
      <div className="flex flex-wrap gap-2">
        {data && data.length > 0 ? (
          data.map((skill) => (
            <Tag
              key={skill.skillId}
              isDeletable={true}
              onClick={() => handleRemoveSkill(skill.skillId)}
            >
              {skill.skillName}
            </Tag>
          ))
        ) : (
          <p className="text-sm text-gray-500">No skills added yet.</p>
        )}
      </div>

      {/* Conditionally render the SkillSelector component */}
      {isAdding && (
        <SkillSelector
          onSave={handleAddNewSkills}
          onCancel={() => setIsAdding(false)}
          existingSkills={data}
          placeholder={`Add skills for "${title}"...`}
        />
      )}
    </div>
  );
}
