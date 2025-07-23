import React, { useState } from "react";
import { Skills } from "./Skills/Skills";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ProgressBar from "./ProgressBar";
import Step3 from "./Step3/Step3";
import { hasNullValue } from "../../../utils/helpers";
import ProfileReview from "./Profile Review/ProfileReview";

const sampleUser = {
  uid: "abc123",
  name: "Kareem",
  email: "kareem@email.com",
  createdAt: "July 15, 2025 at 1:31:37 AM UTC+3",
  //step 1
  profilePicture: "https://firebasestorage.com/...",
  bio: "React dev + Music producer, forex trader. Wanna learn video editing.",
  // step 2
  hasSkills: [
    { skillId: "skill1", skillName: "React", skillLevel: "intermediate" },
    { skillId: "skill2", skillName: "Music Production", skillLevel: "advanced" },
  ],
  needSkills: [
    { skillId: "skill3", skillName: "Video Editing", skillLevel: "beginner" },
    { skillId: "skill4", skillName: "Forex Trading", skillLevel: "intermediate" },
  ],
  //step 3
  phone: "+201234567890",
  location: {
    city: "Cairo",
    country: "Egypt",
  },
  availability: ["Mon 6-8pm", "Fri 3-5pm"],
  // step 4 will be set to true at this step and number will be set to 0
  isAvailableForTrade: true,
  isAvailableForPaid: true,
  rating: 4.8,
  totalSessions: 12,
};

export default function CreateProfile({ userData }) {
  const [step, setStep] = useState(getInitialStep(userData));
  const [profileData, setProfileData] = useState(userData);

  const handleStepComplete = (newData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  let stepComponent;

  switch (step) {
    case 1:
      stepComponent = <PersonalInfo userId={userData.uid} updateStep={setStep} initialData={profileData} onComplete={handleStepComplete} />;
      break;

    case 2:
      stepComponent = <Skills userId={userData.uid} updateStep={setStep} initialData={profileData} onComplete={handleStepComplete} />;
      break;

    case 3:
      stepComponent = <Step3 userId={userData.uid} updateStep={setStep} initialData={profileData} onComplete={handleStepComplete} />;
      break;

    case 4:
      stepComponent = <ProfileReview userId={userData.uid} updateStep={setStep} initialData={profileData} onComplete={handleStepComplete} />;
      break;

    default:
      break;
  }

  return (
    <div className="flex flex-col items-center text-start container max-w-3xl mx-auto">
      <div className="w-full px-4 ">
        <div className="container flex flex-col md:flex-row text-center items-center md:text-start justify-start md:items-baseline w-full gap-2 text-2xl font-semibold">
          <p>Welcome {userData.name}! 👋</p>
          <p className="text-xl font-medium md:ms-4">Please complete your profile</p>
        </div>

        <div className="">
          <ProgressBar activeStep={step} />
        </div>
      </div>

      <div className="w-full mb-4 relative z-10 flex items-center justify-center ">
        <div className="backdrop-blur-xl border shadow-2xl rounded-[18px] p-8 w-full border-[var(--color-card-border)]">{stepComponent}</div>
      </div>
    </div>
  );
}

function getInitialStep(userData) {
  console.log("@getInitialStep ---- userData =", userData);
  if (!userData.bio || !userData.profilePicture) {
    console.log(`@getInitialStep ---- Step 1: Personal Info ---- bio = ${userData.bio}, profilePicture = ${userData.profilePicture}`);
    return 1; // Step 1: Personal Info
  }
  if (hasNullValue(userData.hasSkills) || hasNullValue(userData.needSkills)) {
    console.log("@getInitialStep ---- Step 2: Skills ---- will return 2");
    return 2; // Step 2: Skills
  }
  if (hasNullValue(userData.phone) || hasNullValue(userData.location)) {
    console.log("@getInitialStep ---- Step 3: Availability and Location ---- will return 3");
    return 3; // Step 3: Availability and Location
  }
  console.log("@getInitialStep ---- Step 4: Review and Submit ---- will return 4");
  return 4; // Step 4: Review and Submit
}

//   user: {
//     _redirectEventId: undefined,
//     apiKey: "AIzaSyAJ5O4QvWjLEu9HpBmDT90ZnycOcyKAv-E",
//     appName: "[DEFAULT]",
//     createdAt: "1752331499349",
//     displayName: undefined,
//     email: "mo.abdelfatah9292@gmail.com",
//     emailVerified: false,
//     isAnonymous: false,
//     lastLoginAt: "1752331968859",
//     phoneNumber: undefined,
//     photoURL: undefined,
//     providerData: [Array],
//     stsTokenManager: [Object],
//     tenantId: undefined,
//     uid: "mCNownDznKXGYSJruC37LmajlPq1",
//   },
