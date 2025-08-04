import React, { useState } from "react";
import { LuCircleX, LuCircleCheck } from "react-icons/lu";
import EditButton from "../EditButton";
import { useTranslation } from "react-i18next";

export default function EditableBio({ data, updateUserData, isOwnProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data || "");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    if (value.trim() === "") {
      setError("Bio cannot be empty");
      return;
    }
    setError("");
    updateUserData("bio", value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(data || "");
    setError("");
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[--color-text-primary]">{t("About me")}</h2>

        <div className="md:w-1/2 flex justify-end">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-700 hover:text-green-100"
                title="Save Changes"
                onClick={handleSave}
              >
                <LuCircleCheck size={20} />
              </button>

              <button
                className="p-1 rounded-full bg-red-100 text-red-700 transition-colors hover:bg-red-700 hover:text-red-100"
                title="Cancel"
                onClick={handleCancel}
              >
                <LuCircleX size={20} />
              </button>
            </div>
          ) : (
            isOwnProfile && <EditButton title="Edit Bio" classes="" onClickHandler={() => setIsEditing(true)} />
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full min-h-16 px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder={t("Tell others about yourself...")}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="min-h-16 leading-relaxed backdrop-blur-sm p-4 rounded-lg border-[var(--color-card-border)] usercard text-[var(--color-text-secondary)]">
          {data}
        </div>
      )}
    </div>
  );
}
