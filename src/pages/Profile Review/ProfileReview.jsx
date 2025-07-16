import React from "react";
import img from "../../assets/images/wave3.svg";

export default function ProfileReview() {
  const staticProfileData = {
    profilePicture: "",
    name: "Sophia Carter",
    location: "San Francisco, CA",
    aboutMe:
      "I'm a passionate learner and educator with a background in graphic design and a love for languages. I'm excited to connect with others and share my skills while also expanding my own knowledge.",
    skillsToLearn: ["Photography", "Spanish", "Yoga"],
    skillsToTeach: ["Graphic Design", "English", "Illustration"],
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full z-0">
        <img src={img} alt="wave" className="w-full h-auto" />
      </div>

      <div className="relative z-10 flex items-center justify-center p-6">
        <div className="backdrop-blur-xl border shadow-2xl rounded-[18px] p-8 w-full max-w-2xl border-[var(--color-card-border)]">
          <h1 className="text-3xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
            Review your profile
          </h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={staticProfileData.profilePicture}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-[var(--color-card-border)]"
            />
            <h2 className="text-2xl font-semibold text-[var(--color-text-secondary)]">
              {staticProfileData.name}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {staticProfileData.location}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">
              About me
            </h3>
            <div className="leading-relaxed backdrop-blur-sm p-4 rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-content-bg)] text-[var(--color-text-secondary)]">
              {staticProfileData.aboutMe}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">
              Skills I want to learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {staticProfileData.skillsToLearn.map((skill, index) => (
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
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">
              Skills I can teach
            </h3>
            <div className="flex flex-wrap gap-2">
              {staticProfileData.skillsToTeach.map((skill, index) => (
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
            <button className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl">
              Back
            </button>
            <button className="px-6 py-3 font-semibold rounded-lg text-[var(--color-text-light)] shadow-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-2xl hover:backdrop-blur-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
