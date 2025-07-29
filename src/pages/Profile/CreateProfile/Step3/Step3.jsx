import React, { useState } from "react";
import PhoneInputComponent from "./PhoneInputComponent";
import DatePickerComp from "./Datepicker";
import { Button } from "flowbite-react";
import StatusOverlay from "../../../../components/StatusOverlay";
import CustomButton from "../../../../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import CountryCitySelector from "./CountryCitySelector";
import PhoneNumberInput from "./PhoneNumberInput";
import SkillLevelSelector from "./SkillLevelSelector";
import { useTranslation } from "react-i18next";

export default function Step3({ updateStep, userId, initialData, onComplete }) {
  const [status, setStatus] = useState({ loading: false, error: null, data: null });
  const [location, setLocation] = useState(initialData?.location || { country: "", city: "" });
  const [phoneData, setPhoneData] = useState(() => {
    if (initialData?.phone) {
      // Assuming phone is stored as "+CountryCode PhoneNumber"
      const [countryCode, ...rest] = initialData.phone.split(" ");
      return {
        countryCode,
        phoneNumber: rest.join(" "),
      };
    }
    return { countryCode: "", phoneNumber: "" };
  });
  const { t } = useTranslation();

  const [skillsData, setSkillsData] = useState(() => {
    const hasSkills = initialData?.hasSkills || [];
    return hasSkills.map((skill) => ({
      skillId: skill?.skillId,
      skillName: skill?.skillName,
      skillLevel: skill?.skillLevel || null,
    }));
  });

  const handleLocationChange = (country, city) => {
    setLocation({ country, city });
    console.log("Location changed:", { country, city });
  };

  const handlePhoneChange = (countryCode, phoneNumber) => {
    setPhoneData({ countryCode, phoneNumber });
    console.log("Phone changed:", { countryCode, phoneNumber });
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    setSkillsData((prevSkills) => prevSkills.map((skill) => (skill.skillId === skillId ? { ...skill, skillLevel: newLevel } : skill)));
    console.log("Skill level updated:", { skillId, newLevel });
  };

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  async function handleAdditionalInfoSubmit() {
    try {
      setStatus({ loading: true, error: null, data: null });

      const updateObj = {
        location: location,
        phone: `${phoneData.countryCode} ${phoneData.phoneNumber}`.trim(),
        // Update hasSkills and needSkills with new skill levels
        hasSkills: skillsData,
      };

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updateObj);

      // Call onComplete with the updated data
      onComplete(updateObj);

      setStatus({ loading: false, error: null, data: "Great! Your additional info is now updated." });

      setTimeout(() => {
        updateStep(4);
      }, 1000);
    } catch (error) {
      console.error("Error updating additional info:", error);
      setStatus({ loading: false, error: error.message, data: null });
    }
  }

  return (
    // <div className="flex h-screen flex-col  w-full items-center justify-evenly transition-all relative">
    <>
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className="flex flex-col justify-center w-full gap-6">
        {/* new location selector */}
        <CountryCitySelector onSelectionChange={handleLocationChange} initialCountry={location.country} initialCity={location.city} />

        {/* <PhoneInputComponent setForm={setForm}></PhoneInputComponent> */}

        {/* new pone number input */}
        <PhoneNumberInput onPhoneChange={handlePhoneChange} initialCountryCode={phoneData.countryCode} initialPhoneNumber={phoneData.phoneNumber} />

        {/* <DatePickerComp setForm={setForm}></DatePickerComp> */}

        <SkillLevelSelector skills={skillsData} onSkillLevelChange={handleSkillLevelChange} />

        {/* <div className="flex flex-col justify-between h-[20%] ">
          <h3 className="font-bold ">Experience level for offered skill</h3>
          <div>
            <label className="font-bold " htmlFor="skill-id">
              Skill
            </label>
            <br />
            <input
              onChange={(e) => {
                setForm((prev) => ({ ...prev, skill: e.target.value }));
              }}
              className="w-full sm:w-full md:w-[50%] lg:w-[20%] h-7 rounded-lg border-2 border-[#CEDAE8]"
              id="skill-id"
            ></input>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-2/5 gap-2 mt-3">
            <Button
              onClick={(e) => {
                setForm((prev) => ({ ...prev, skillLevel: "Beginner" }));
              }}
              className="  border border-gray-300   "
              color="white"
            >
              Beginner
            </Button>
            <Button
              onClick={(e) => {
                setForm((prev) => ({ ...prev, skillLevel: "Intermediate" }));
              }}
              className="  border border-gray-300 "
              color="white"
            >
              Intermediate
            </Button>
            <Button
              onClick={(e) => {
                setForm((prev) => ({ ...prev, skillLevel: "Advanced" }));
              }}
              className="  border border-gray-300   "
              color="white"
            >
              Advanced
            </Button>
          </div>
        </div> */}
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={() => {
            updateStep(2);
          }}
          className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
        >
          {t("Common.Back")}
        </button>

        <CustomButton
          variant="primary"
          value="Next"
          disabled={location.country === "" || location.city === "" || phoneData.countryCode === "" || phoneData.phoneNumber === ""}
          onPress={handleAdditionalInfoSubmit}
        />
      </div>
    </>
    // </div>
  );
}
