import React, { useState } from "react";
import SettingsTab from "./SettingsTab/SettingsTab";
import { LuSquarePen } from "react-icons/lu";
import InfoTab from "./InfoTab/InfoTab";
import EditableName from "./EditableName";
import EditButton from "./EditButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import StatusOverlay from "../../../components/StatusOverlay";
import { useTranslation } from "react-i18next";
import ReviewsTab from "./ReviewsTab/ReviewsTab";
import { Rating, RatingStar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function ProfileView({ data, isOwnProfile }) {
  const { t } = useTranslation();

  const [updatedProfile, setUpdatedProfile] = useState(data || sampleUserProfile);
  const [activeTab, setActiveTab] = useState("Profile");
  const [status, setStatus] = useState({ loading: false, error: null });

  const navigate = useNavigate();

  const total = {
    rating: 0,
    teachingSkill: 0,
    communication: 0,
    punctuality: 0,
  };

  const count = data?.reviews?.length;

  data?.reviews.forEach((review) => {
    total.rating += review.rating ?? 0;
    total.teachingSkill += review.teachingSkill ?? 0;
    total.communication += review.communication ?? 0;
    total.punctuality += review.punctuality ?? 0;
  });

  const avgRatings = {
    overAllAvg: count ? Number((total.rating / count).toFixed(1)) : 0,
    teachingSkillAvg: count ? Number((total.teachingSkill / count).toFixed(1)) : 0,
    communicationAvg: count ? Number((total.communication / count).toFixed(1)) : 0,
    punctualityAvg: count ? Number((total.punctuality / count).toFixed(1)) : 0,
  };

  const publicTabs = ["Profile", "Reviews"];
  const privateTabs = ["Skill Trades", "Settings"];

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
    <div className="max-w-4xl mx-auto text-[var(--color-text-primary)] z-20 backdrop-blur-lg relative">
      <StatusOverlay status={status} onDismiss={dismissError} />
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative inline-block mb-4">
          <img
            src={updatedProfile.profilePicture}
            alt={t("ProfileView.ProfilePictureAlt")}
            className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-text-primary)] shadow-lg transition-transform duration-200 hover:scale-110"
          />
          {isOwnProfile && (
            <EditButton
              title={t("ProfileView.EditProfilePicture")}
              classes="absolute -bottom-0.5 -right-0.5"
              onClickHandler={() => {
                console.log("edit profile picture button clicked");
              }}
            />
          )}
        </div>

        <EditableName data={updatedProfile.name} updateUserData={updateUserData} isOwnProfile={isOwnProfile} pro={data.subscribtion.plan == 'pro'} />

        <div className="flex justify-center items-center gap-1 text-[var(--color-text-secondary)] mb-2">
          <p className="">{data.subscribtion.plan == 'free' ? t('SkillTrader') : t('proSkillTrader')}</p>

          <Rating size="sm" className="gap-0.5">
            <RatingStar />
          </Rating>
          <p className="text-sm font-bold">{avgRatings.overAllAvg}</p>
        </div>
      </div>

      {/* action buttons for the visitors */}
      {!isOwnProfile && (
        <div className="flex gap-4 justify-center text-sm mb-8">
          <button
            className="relative overflow-hidden px-5 py-2 font-semibold rounded-full shadow-lg group dark:text-[--color-text-light] text-white bg-[--color-btn-submit-bg]"
            onClick={() => navigate(`/chat/${data.uid}`)}
          >
            <span className="relative z-10 transition duration-1000 group-hover:text-[var(--color-text-dark)]">{t("Message")}</span>
            <span
              className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
              style={{ backgroundColor: "var(--color-btn-submit-hover)" }}
            ></span>
          </button>

          <button
            className="relative overflow-hidden px-5 py-2 font-semibold rounded-full shadow-lg group dark:text-[--color-text-light] text-white bg-[--color-btn-submit-bg]"
            onClick={() => navigate("/trade")}
          >
            <span className="relative z-10 transition duration-1000 group-hover:text-[var(--color-text-dark)]">{t("Start Trading")}</span>
            <span
              className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
              style={{ backgroundColor: "var(--color-btn-submit-hover)" }}
            ></span>
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-[--color-card-border] mb-8">
        {publicTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 md:px-6 py-3 font-semibold text-base border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[--color-btn-submit-bg] text-[--color-btn-submit-bg]"
                : "border-transparent text-[--color-text-primary] hover:text-[--color-btn-submit-bg]"
            }`}
          >
            {t(`ProfileView.Tabs.${tab}`)}
          </button>
        ))}

        {isOwnProfile &&
          privateTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-6 py-3 font-semibold text-base border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[--color-btn-submit-bg] text-[--color-btn-submit-bg]"
                  : "border-transparent text-[--color-text-primary] hover:text-[--color-btn-submit-bg]"
              }`}
            >
              {t(`ProfileView.Tabs.${tab}`)}
            </button>
          ))}
      </div>
      {/* Tab Content */}
      {activeTab === "Profile" && <InfoTab updatedProfile={updatedProfile} updateUserData={updateUserData} isOwnProfile={isOwnProfile} />}

      {activeTab === "Skill Trades" && isOwnProfile && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("ProfileView.SkillTradesComingSoon")}</p>
        </div>
      )}
      {activeTab === "Reviews" && <ReviewsTab reviews={data?.reviews} userAvgRating={avgRatings} />}
      {activeTab === "Settings" && isOwnProfile && (
        <SettingsTab updatedProfile={updatedProfile} updateUserData={updateUserData} isOwnProfile={isOwnProfile} />
      )}
    </div>
  );
}

const sampleUserProfile = {
  id: "NLMrdVmgTSaSMDOuY0vGXktYgNm1",
  profilePicture: "https://res.cloudinary.com/dplcc4igl/image/upload/v1753203054/profile_pictures/sfey6tcvoq9trywlpisd.jpg",
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
