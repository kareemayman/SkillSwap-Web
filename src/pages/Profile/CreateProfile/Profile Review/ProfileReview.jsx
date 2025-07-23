import React, { useEffect, useState } from "react";
import img from "../../../../assets/images/wave3.svg";
import CustomButton from "../../../../components/Button";
import useFirestoreGet from "../../../../hooks/useFirestoreGet";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../../utils/firestoreUtil";

export default function ProfileReview({ updateStep, userId }) {
  const staticProfileData = {
    profilePicture: "",
    name: "Sophia Carter",
    location: { city: "New York", country: "USA" },
    bio: "I'm a passionate learner and educator with a background in graphic design and a love for languages. I'm excited to connect with others and share my skills while also expanding my own knowledge.",
    needSkills: ["Photography", "Spanish", "Yoga"],
    hasSkills: ["Graphic Design", "English", "Illustration"],
  };

  // const { data: userProfile, loading, error, request } = useFirestoreGet();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(staticProfileData); // For testing purposes, using static data

  // console.log("@ProfileReview ---- userProfile =", userProfile);

  // fetch user data from firebase using userId when component mounts
  // useEffect(() => {
  //   if (userId) {
  //     // request("users", userId);
  //     getUserById(userId)
  //       .then((data) => {
  //         console.log("@ProfileReview ---- fetched user data =", data);
  //         setUserProfile(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   }
  // }, [userId]);

  function handleSubmit() {
    console.log("@ProfileReview ---- Submit clicked");
    // Here you can handle the submission logic, e.g., save the profile data
    navigate("/landing");
  }

  // if (!loading && !error)
  return (
    // <div className="min-h-screen relative overflow-hidden">
    //   <div className="absolute bottom-0 left-0 w-full z-0">
    //     <img src={img} alt="wave" className="w-full h-auto" />
    //   </div>

    // <div className="relative z-10 flex items-center justify-center ">
    //   <div className="backdrop-blur-xl border shadow-2xl rounded-[18px] p-8 w-full border-[var(--color-card-border)]">
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-[var(--color-text-primary)]">Review your profile</h1>

      <div className="flex flex-col items-center mb-8">
        <img
          src={userProfile?.profilePicture}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-[var(--color-card-border)]"
        />
        <h2 className="text-2xl font-semibold text-[var(--color-text-secondary)]">{userProfile?.name}</h2>
        <p className="text-lg text-[var(--color-text-secondary)]">{`${userProfile?.location?.city}, ${userProfile?.location?.country}`}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">About me</h3>
        <div className="leading-relaxed backdrop-blur-sm p-4 rounded-lg border border-[var(--color-card-border)] glass-card text-[var(--color-text-secondary)]">
          {userProfile?.bio}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">Skills I want to learn</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile?.needSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium shadow-sm bg-[var(--color-skill-learn-bg)] text-[var(--color-text-secondary)]"
            >
              {skill}
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
              className="px-4 py-2 rounded-full text-sm font-medium shadow-sm bg-[var(--color-skill-teach-bg)] text-[var(--color-text-secondary)]"
            >
              {skill}
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
    //   </div>
    // </div>
    // </div>
  );
}
