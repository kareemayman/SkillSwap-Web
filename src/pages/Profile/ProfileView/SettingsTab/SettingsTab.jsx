import React from "react";
import EditablePhone from "./EditablePhone";
import { useTranslation } from "react-i18next";

export default function SettingsTab({
  updatedProfile,
  updateUserData,
  isOwnProfile,
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <EditablePhone
        data={updatedProfile.phone}
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium ">{t("availability")}</h3>
        <div className="flex items-center gap-3">
          <input
            disabled={!isOwnProfile}
            type="checkbox"
            id="availability"
            checked={updatedProfile.availability}
            onChange={(e) => updateUserData("availability", e.target.checked)}
            className="w-4 h-4 text-[--color-btn-submit-bg] rounded hover:cursor-pointer"
          />
          <label
            htmlFor="availability"
            className="text-[--color-text-secondary] hover:cursor-pointer"
          >
            {t("Available for skill trading")}
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium ">{t("Trading Preferences")}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              disabled={!isOwnProfile}
              type="checkbox"
              id="availableForTrade"
              checked={updatedProfile.isAvailableForTrade}
              onChange={(e) =>
                updateUserData("isAvailableForTrade", e.target.checked)
              }
              className="w-4 h-4 text-[--color-btn-submit-bg] rounded hover:cursor-pointer"
            />
            <label
              htmlFor="availableForTrade"
              className="text-[--color-text-secondary] hover:cursor-pointer"
            >
              {t("Available for skill exchange")}
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              disabled={!isOwnProfile}
              type="checkbox"
              id="availableForPaid"
              checked={updatedProfile.isAvailableForPaid}
              onChange={(e) =>
                updateUserData("isAvailableForPaid", e.target.checked)
              }
              className="w-4 h-4 text-[--color-btn-submit-bg] rounded hover:cursor-pointer"
            />
            <label
              htmlFor="availableForPaid"
              className="text-[--color-text-secondary] hover:cursor-pointer"
            >
              {t("Available for paid sessions")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
