import React from "react";
import EditableBio from "./EditableBio";
import EditableSkillsSection from "./EditableSkillsSection";
import EditableLocation from "./EditableLocation";

export default function InfoTab({ updatedProfile, updateUserData }) {
  return (
    <div className="space-y-8">
      {/* About Me Section */}
      <EditableBio data={updatedProfile.bio} updateUserData={updateUserData} />

      {/* Location Section */}
      <EditableLocation data={updatedProfile.location} updateUserData={updateUserData} />

      {/* Skills I can teach */}
      <EditableSkillsSection
        title="Skills I can teach"
        data={updatedProfile.hasSkills}
        skillType="hasSkills" // Prop to identify which field to update
        updateUserData={updateUserData}
      />

      {/* Skills I want to learn */}
      <EditableSkillsSection
        title="Skills I want to learn"
        data={updatedProfile.needSkills}
        skillType="needSkills" // Prop to identify which field to update
        updateUserData={updateUserData}
      />
    </div>
  );
}
