import React, { useState } from "react";
import PhoneInputComponent from "./PhoneInputComponent";
import DatePickerComp from "./Datepicker";
import { Button } from "flowbite-react";
const Step3 = ({ setForm }) => {
  return (
    <div className="flex h-screen flex-col  w-full items-center justify-evenly  ">
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
      <div className="w-[70%] flex justify-end ">
        <Button onClick={(e)=>{

        }} className="rounded-3xl" color={"blue"}>Save Details</Button>
      </div>
    </div>
  );
};

export default Step3;
