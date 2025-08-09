import React, { useState, useCallback } from "react";
import { LuCircleX, LuCircleCheck, LuPhone } from "react-icons/lu";
import EditButton from "../EditButton";
import PhoneNumberInput from "../../CreateProfile/Step3/PhoneNumberInput";
import { useTranslation } from "react-i18next";

export default function EditablePhone({ data, updateUserData, isOwnProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(() => parsePhoneNumber(data));
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    if (!value.phoneNumber || value.phoneNumber.trim() === "") {
      setError("Phone number cannot be empty.");
      return;
    }
    setError("");

    const fullPhoneNumber = `${value.countryCode} ${value.phoneNumber}`;
    updateUserData("phone", fullPhoneNumber);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(parsePhoneNumber(data));
    setError("");
    setIsEditing(false);
  };

  const handlePhoneInputChange = useCallback(
    (countryCode, phoneNumber) => {
      setValue({ countryCode, phoneNumber });
      if (error) {
        setError("");
      }
    },
    [error]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl font-semibold text-[--color-text-primary]">{t("Phone")}</h2>

        <div className="md:w-1/2 flex justify-end">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                aria-label="Save phone number"
                className="p-1 rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-700 hover:text-green-100"
                title="Save Changes"
                onClick={handleSave}
              >
                <LuCircleCheck size={20} />
              </button>

              <button
                aria-label="Cancel editing phone number"
                className="p-1 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
                title="Cancel"
                onClick={handleCancel}
              >
                <LuCircleX size={20} />
              </button>
            </div>
          ) : (
            isOwnProfile && <EditButton title="Edit Phone Number" classes="" onClickHandler={() => setIsEditing(true)} />
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <PhoneNumberInput initialCountryCode={value.countryCode} initialPhoneNumber={value.phoneNumber} onPhoneChange={handlePhoneInputChange} />
          {/* Error Message Display */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[--color-text-secondary] text-sm sm:text-base">
          <LuPhone size={16} />
          <span>{data || "No phone number set"}</span>
        </div>
      )}
    </div>
  );
}

/**
 * A utility function to parse a phone number string (e.g., "+1 1234567890")
 * into an object with countryCode and phoneNumber.
 * @param {string} phoneStr - The phone number string from props/data.
 * @returns {{countryCode: string, phoneNumber: string}}
 */
function parsePhoneNumber(phoneStr) {
  // number should be in the format "+CountryCode PhoneNumber"
  if (typeof phoneStr === "string" && phoneStr.includes(" ")) {
    const [countryCode, ...rest] = phoneStr.split(" ");
    const phoneNumber = rest.join(" ");
    return { countryCode, phoneNumber };
  }

  return { countryCode: "", phoneNumber: "" };
}
