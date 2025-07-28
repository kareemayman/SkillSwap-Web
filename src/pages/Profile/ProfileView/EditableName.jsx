import React, { useState } from "react";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import EditButton from "./EditButton";

export default function EditableName({ data, updateUserData, isOwnProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (value.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    setError("");
    updateUserData("name", value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(data || "");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 text-[var(--main-color)]">
      {isEditing ? (
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex justify-center items-center gap-2">
            <div className="w-20"></div>

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-2xl p-0 font-bold bg-slate-50 rounded-lg border border-gray-300 text-center"
              placeholder="Your name"
            />

            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-700 hover:text-green-100"
                onClick={handleSave}
              >
                <LuCircleCheck size={20} />
              </button>

              <button
                className="p-1.5 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
                onClick={handleCancel}
              >
                <LuCircleX size={20} />
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center gap-3 mb-0.5">
          <div className="w-7"></div>

          <h1 className="text-2xl font-bold">{data}</h1>

          {isOwnProfile && (
            <EditButton
              title="Edit Name"
              classes=""
              onClickHandler={() => {
                setIsEditing(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
