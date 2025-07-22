import React, { useState } from "react";
import PhoneInputComponent from "./PhoneInputComponent";
import DatePickerComp from "./Datepicker";
import { Button } from "flowbite-react";
import StatusOverlay from "../../../../components/StatusOverlay";
import CustomButton from "../../../../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

function setForm(text) {
  console.log("setForm called with:", text);
}

const Step3 = ({ updateStep, userId }) => {
  const [status, setStatus] = useState({ loading: false, error: null, data: null });

  function dismissOverlay() {
    setStatus({ loading: false, error: null, data: null });
  }

  async function handleAdditionalInfoSubmit() {
    try {
      setStatus({ loading: true, error: null, data: null });

      const userRef = doc(db, "users", userId);
      console.log(`@handleAdditionalInfoSubmit ---- userId = ${userId} ---- userRef = ${userRef}`);
      await updateDoc(userRef, {
        location: { city: "Alex", country: "Egypt" },
        phone: "+1234567890",
        hasSkills: [{ skillName: "music production", skillId: "L9Brj0D8zYbnPllH3zOp", skillLevel: "Beginner" }],
      });

      setStatus({ loading: false, error: null, data: "Great! Your additional Info are now updated." });

      // Wait for 1 seconds to show success message before moving to next step
      setTimeout(() => {
        updateStep(4);
      }, 1000);
    } catch (error) {
      console.error("Error updating additionalInfo:", error);
      setStatus({ loading: false, error: error.message, data: null });
    }
  }

  return (
    // <div className="flex h-screen flex-col  w-full items-center justify-evenly transition-all relative">
    <>
      <StatusOverlay status={status} onDismiss={dismissOverlay} />

      <div className=" w-[80%]">
        <label className="font-bold" htmlFor="location-id">
          Location(city,country)
        </label>
        <br />
        <input
          onChange={(e) => {
            setForm((prev) => ({ ...prev, location: e.target.value }));
          }}
          required
          className=" w-full sm:w-full md:w-[50%] lg:w-[60%] rounded-lg border-2 border-[#CEDAE8] h-12  rounded-lg border-2 border-[#CEDAE8] h-12  placeholder:text-[rgb(124,158,197)]"
          placeholder="eg,SanFrancisco,USA"
          id="location-id"
          type="text"
        ></input>
      </div>
      <PhoneInputComponent setForm={setForm}></PhoneInputComponent>
      <DatePickerComp setForm={setForm}></DatePickerComp>

      <div className="w-[80%] flex flex-col justify-between h-[20%] ">
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
      </div>
      {/* <div className="w-[70%] flex justify-end ">
        <CustomButton variant="primary" value="Next" onPress={handleAdditionalInfoSubmit} />
      </div> */}

      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            updateStep(2);
          }}
          className="px-6 py-3 font-semibold rounded-lg shadow-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-btn-back-hover)] hover:shadow-2xl"
        >
          Back
        </button>
        {/* <button className="px-6 py-3 font-semibold rounded-lg text-[var(--color-text-light)] shadow-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-2xl hover:backdrop-blur-xl">
                    Submit
                  </button> */}
        <CustomButton variant="primary" value="Submit" onPress={handleAdditionalInfoSubmit} />
      </div>
    </>
    // </div>
  );
};

export default Step3;
