import React from "react";
import EditableBio from "./EditableBio";
import EditableSkillsSection from "./EditableSkillsSection";
import EditableLocation from "./EditableLocation";
import { useTranslation } from "react-i18next";


export default function InfoTab({
  updatedProfile,
  updateUserData,
  isOwnProfile,
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* About Me Section */}
      <EditableBio
        data={updatedProfile.bio}
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />

      {/* Location Section */}
      <EditableLocation
        data={updatedProfile.location}
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />

      {/* Skills I can teach */}
      <EditableSkillsSection
        title={t("Skills I can teach")}
        data={updatedProfile.hasSkills}
        skillType="hasSkills" // Prop to identify which field to update
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />

      {/* Skills I want to learn */}
      <EditableSkillsSection
        title={t("Skills I want to learn")}
        data={updatedProfile.needSkills}
        skillType="needSkills" // Prop to identify which field to update
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
