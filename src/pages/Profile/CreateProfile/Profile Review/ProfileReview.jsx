import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import img from "../../../../assets/images/avat.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { avatarTheme } from "flowbite-react";

export default function ProfileReview({ updateStep, userId, initialData, onComplete }) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(initialData); // For testing purposes, using static data

  async function handleSubmit() {
    try {
      // Final update object
      const finalUpdateObj = {
        rating: 0,
        totalSessions: 0,
        isAvailableForTrade: true,
        isAvailableForPaid: false,
        reviews: [],
        availability: true,
      };

      // Update the database
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, finalUpdateObj);

      // Call onComplete with the final update
      onComplete(finalUpdateObj);

      // Show success message or handle navigation
      navigate("/");
    } catch (error) {
      console.error("Error finalizing profile:", error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-[var(--main-color)] italic">Review your profile</h1>

      <div className="flex flex-col items-center mb-8">
        <img
          src={userProfile?.profilePicture || img}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-[var(--color-card-border)]"
        />
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">{userProfile?.name}</h2>
        <p className="text-lg text-[var(--color-text-secondary)]">{`${userProfile?.location?.city}, ${userProfile?.location?.country}`}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">About me</h3>
        <div className="leading-relaxed backdrop-blur-sm p-4 rounded-lg border border-black shadow-sm usercard text-[var(--color-text-secondary)]">
          {userProfile?.bio}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">Skills I want to learn</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile?.needSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium shadow-sm bg-[var(--color-skill-learn-bg)] text-white/800"
            >
              {skill?.skillName}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">Skills I can teach</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile?.hasSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium shadow-sm bg-[var(--color-skill-teach-bg)] text-black"
            >
              {skill?.skillName}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            updateStep(3);
          }}
          className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
        >
          Back
        </button>
        {/* <button className="px-6 py-3 font-semibold rounded-lg text-[var(--color-text-light)] shadow-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-2xl hover:backdrop-blur-xl">
              Submit
            </button> */}
        <CustomButton variant="primary" value="Submit" onPress={handleSubmit} />
      </div>
    </>
  );
}
