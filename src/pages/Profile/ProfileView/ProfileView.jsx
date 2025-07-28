import React, { useState } from "react";
import SettingsTab from "./SettingsTab/SettingsTab";
import { LuSquarePen } from "react-icons/lu";
import InfoTab from "./InfoTab/InfoTab";
import EditableName from "./EditableName";
import EditButton from "./EditButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import StatusOverlay from "../../../components/StatusOverlay";

const sampleUserProfile = {
  id: "NLMrdVmgTSaSMDOuY0vGXktYgNm1",
  profilePicture:
    "https://res.cloudinary.com/dplcc4igl/image/upload/v1753203054/profile_pictures/sfey6tcvoq9trywlpisd.jpg",
  isAvailableForTrade: true,
  bio: "I'm a passionate learner and educator with a background in graphic design and a love for languages. I'm excited to connect with others and share my skills while also expanding my knowledge in new areas.",
  name: "Sophia Bennett",
  uid: "NLMrdVmgTSaSMDOuY0vGXktYgNm1",
  isAvailableForPaid: false,
  email: "sophia@gmail.com",
  reviews: [],
  rating: 0,
  location: { city: "Alexandria", country: "Egypt" },
  totalSessions: 0,
  hasSkills: [
    {
      skillId: "L9Brj0D8zYbnPllH3zOp",
      skillName: "Photography",
      skillLevel: "Advanced",
    },
    {
      skillName: "Graphic Design",
      skillId: "skill_2n6bu8962",
      skillLevel: "Intermediate",
    },
    {
      skillName: "Writing",
      skillId: "skill_3n7cu9073",
      skillLevel: "Beginner",
    },
  ],
  needSkills: [
    {
      skillLevel: "Beginner",
      skillId: "skill_29snal0g7",
      skillName: "Spanish",
    },
    {
      skillLevel: "Intermediate",
      skillId: "skill_30tmal1h8",
      skillName: "Cooking",
    },
  ],
  phone: "+20 34567890",
  availability: true,
};

export default function ProfileView({ data, isOwnProfile }) {
  const [updatedProfile, setUpdatedProfile] = useState(
    data || sampleUserProfile
  );
  const [activeTab, setActiveTab] = useState("Profile");
  const [status, setStatus] = useState({ loading: false, error: null });

  const tabs = ["Profile", "Skill Trades", "Reviews", "Settings"];

  const updateUserData = async (field, value) => {
    try {
      setStatus({ loading: true, error: null });

      const updateObj = { [field]: value };

      const userRef = doc(db, "users", updatedProfile.uid);
      await updateDoc(userRef, updateObj);

      setUpdatedProfile((prev) => ({
        ...prev,
        [field]: value,
      }));

      setStatus({ loading: false, error: null });
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus({ loading: false, error: error.message });
    }
  };

  const dismissError = () => {
    setStatus((prev) => ({ ...prev, error: null }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-[var(--color-text-primary)] z-20 backdrop-blur-lg relative">
      <StatusOverlay status={status} onDismiss={dismissError} />

      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <img
            src={updatedProfile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-text-primary)] shadow-lg"
          />
          {isOwnProfile && (
            <EditButton
              title="Edit Profile Picture"
              classes="absolute -bottom-0.5 -right-0.5"
              onClickHandler={() => {
                console.log("edit profile picture button clicked");
              }}
            />
          )}
        </div>

        <EditableName
          data={updatedProfile.name}
          updateUserData={updateUserData}
          isOwnProfile={isOwnProfile}
        />

        <p className="text-[var(--color-text-secondary)] mb-2">Skill Trader</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-[--color-card-border] mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold text-base border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[--color-btn-submit-bg] text-[--color-btn-submit-bg]"
                : "border-transparent text-[--color-text-primary] hover:text-[--color-btn-submit-bg]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Profile" && (
        <InfoTab
          updatedProfile={updatedProfile}
          updateUserData={updateUserData}
          isOwnProfile={isOwnProfile}
        />
      )}

      {activeTab === "Skill Trades" && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Skill Trades content will be implemented here
          </p>
        </div>
      )}

      {activeTab === "Settings" && (
        <SettingsTab
          updatedProfile={updatedProfile}
          updateUserData={updateUserData}
        />
      )}
    </div>
  );
}
