import React, { useState } from "react";
import { Skills } from "./Skills/Skills";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ProgressBar from "./ProgressBar";
import Step3 from "./Step3/Step3";
import { hasNullValue } from "../../../utils/helpers";
import ProfileReview from "./Profile Review/ProfileReview";

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
        <div className=" flex flex-col  text-center items-center md:text-start justify-start md:items-baseline w-full gap-2 text-2xl font-semibold text-[var(--color-text-primary)]">
          <p>
            Welcome <span className="text-[var(--main-color)]">{userData.name}</span>! 👋
          </p>
          <p className="text-xl font-medium md:ms-4 text-[var(--color-text-secondary)]">Please complete your profile</p>
        </div>

        <div className="">
          <ProgressBar activeStep={step} />
        </div>
      </div>

      <div className="w-full mb-4 relative z-10 flex items-center justify-center ">
        <div className="backdrop-blur-xl border shadow-2xl shadow-[rgba(0,0,0,0.1)] rounded-[18px] p-8 w-full  glass-card">{stepComponent}</div>
      </div>
    </div>
  );
}

function getInitialStep(userData) {
  // console.log("@getInitialStep ---- userData =", userData);
  if (!userData.bio || !userData.profilePicture) {
    // console.log(`@getInitialStep ---- Step 1: Personal Info ---- bio = ${userData.bio}, profilePicture = ${userData.profilePicture}`);
    return 1; // Step 1: Personal Info
  }
  if (hasNullValue(userData.hasSkills) || hasNullValue(userData.needSkills)) {
    // console.log("@getInitialStep ---- Step 2: Skills ---- will return 2");
    return 2; // Step 2: Skills
  }
  if (hasNullValue(userData.phone) || hasNullValue(userData.location)) {
    // console.log("@getInitialStep ---- Step 3: Availability and Location ---- will return 3");
    return 3; // Step 3: Availability and Location
  }
  // console.log("@getInitialStep ---- Step 4: Review and Submit ---- will return 4");
  return 4; // Step 4: Review and Submit
}

