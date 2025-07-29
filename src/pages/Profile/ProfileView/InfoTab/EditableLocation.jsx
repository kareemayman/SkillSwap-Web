import React from "react";
import { LuCircleX, LuCircleCheck, LuMapPin } from "react-icons/lu";
import EditButton from "../EditButton";
import CountryCitySelector from "../../CreateProfile/Step3/CountryCitySelector";
import { useTranslation } from "react-i18next";

export default function EditableLocation({
  data,
  updateUserData,
  isOwnProfile,
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [location, setLocation] = React.useState(
    data || { city: "", country: "" }
  );
  const [error, setError] = React.useState(null);
  const { t } = useTranslation();


  const handleSave = () => {
    if (!location.country || !location.city) {
      setError("Country and City are required.");
      return;
    }
    setError(null);
    updateUserData("location", location);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocation(data || { city: "", country: "" });
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[--color-text-primary]">
          {t("Location")}
        </h2>

        <div className="md:w-1/2 flex justify-end">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                aria-label="Save location"
                className="p-1 rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-700 hover:text-green-100"
                onClick={handleSave}
              >
                <LuCircleCheck size={20} />
              </button>

              <button
                aria-label="Cancel editing location"
                className="p-1 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
                onClick={handleCancel}
              >
                <LuCircleX size={20} />
              </button>
            </div>
          ) : (
            isOwnProfile && (
              <EditButton
                title="Edit Location"
                classes=""
                onClickHandler={() => setIsEditing(true)}
              />
            )
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <CountryCitySelector
            initialCountry={location.country}
            initialCity={location.city}
            onSelectionChange={(country, city) => {
              setLocation({ country, city });
              if (error) setError(null);
            }}
          />
          {/* Error Message Display */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[--color-text-secondary]">
          <LuMapPin size={16} />
          <span>
            {location.city && location.country
              ? `${location.city}, ${location.country}`
              : "No location set"}
          </span>
        </div>
      )}
    </div>
  );
}
