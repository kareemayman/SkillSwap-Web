import React, { useState } from "react";
import { Datepicker } from "flowbite-react";
import { Toast, ToastToggle } from "flowbite-react";
const DatePickerComp = ({setForm}) => {
  const [isDateChanged, setIsDateChanged] = useState(false);
  const[dates,setDate]=useState([])
  return (
    <div className="w-[80%]">
      {isDateChanged && (
        <Toast className="absolute top-0 right-0">
          <div className="ml-3 text-sm font-normal ">
            Added to your available teaching items
          </div>
          <ToastToggle onClick={()=>{
            setIsDateChanged(false)
          }} />
        </Toast>
      )}
      <label className="font-bold" htmlFor="date-picker">Choose your available sessions</label>
      <Datepicker id="date-picker" className="w-full sm:w-full md:w-[50%] lg:w-[60%] rounded-lg border-2 border-[#CEDAE8] h-12"
        onChange={(e) => { 
          const newDates=[...dates,e]
          setDate(newDates)  
          setIsDateChanged(true);
          setForm(prev=>({...prev,avalSessions:newDates}))
        
        }}
      />
    </div>
  );
};

export default DatePickerComp;
