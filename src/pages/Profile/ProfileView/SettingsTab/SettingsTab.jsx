import React from "react"
import EditablePhone from "./EditablePhone"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export default function SettingsTab({ updatedProfile, updateUserData, isOwnProfile }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  function formatDate(timestamp) {
    const date = new Date(timestamp)

    const formatted = date.toLocaleDateString("en-US", {
      month: "short", // "Aug"
      day: "numeric", // "24"
      year: "numeric", // "2025"
    })

    return formatted
  }

  return (
    <div className="space-y-8">
      <EditablePhone
        data={updatedProfile.phone}
        updateUserData={updateUserData}
        isOwnProfile={isOwnProfile}
      />

      <div className="space-y-4">
        <h2 className="font-semibold text-[--color-text-primary] sm:text-xl">
          {t("availability")}
        </h2>
        <div className="flex items-center gap-3">
          <input
            disabled={!isOwnProfile}
            type="checkbox"
            id="availability"
            checked={updatedProfile.availability}
            onChange={(e) => updateUserData("availability", e.target.checked)}
            className="rounded w-4 h-4 text-[--color-btn-submit-bg] hover:cursor-pointer"
          />
          <label
            htmlFor="availability"
            className="text-[--color-text-secondary] text-sm sm:text-base hover:cursor-pointer"
          >
            {t("Available for skill trading")}
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-[--color-text-primary] sm:text-xl">
          {t("Trading Preferences")}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              disabled={!isOwnProfile}
              type="checkbox"
              id="availableForTrade"
              checked={updatedProfile.isAvailableForTrade}
              onChange={(e) => updateUserData("isAvailableForTrade", e.target.checked)}
              className="rounded w-4 h-4 text-[--color-btn-submit-bg] hover:cursor-pointer"
            />
            <label
              htmlFor="availableForTrade"
              className="text-[--color-text-secondary] text-sm sm:text-base hover:cursor-pointer"
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
              onChange={(e) => updateUserData("isAvailableForPaid", e.target.checked)}
              className="rounded w-4 h-4 text-[--color-btn-submit-bg] hover:cursor-pointer"
            />
            <label
              htmlFor="availableForPaid"
              className="text-[--color-text-secondary] text-sm sm:text-base hover:cursor-pointer"
            >
              {t("Available for paid sessions")}
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-[--color-text-primary] sm:text-xl">
          {t("Subscription")}
        </h2>
        <div className="flex justify-between items-center p-6 border border-[var(--color-card-border)] rounded-lg">
          <div className="flex flex-col justify-between">
            <h3 className="font-semibold text-[--main-color] sm:text-xl">
              {updatedProfile.subscribtion?.plan === "pro" ? t("Pro Plan") : t("Free Plan")}
            </h3>
            <p className="font-semibold text-[--color-text-secondary] text-sm sm:text-base">
              {updatedProfile.subscribtion?.plan === "pro" &&
                `${t("Renew on")} ${formatDate(updatedProfile.subscribtion?.currentPeriodEnd)}`}
            </p>
          </div>

          <div 
            onClick={() => navigate('/plans')}
            className="text-sm sm:text-base flex justify-center items-center bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] px-4 py-2 rounded-lg font-bold text-[var(--color-text-light)] transition-all duration-300 cursor-pointer">
            {t("Manage Subscription")}
          </div>
        </div>
      </div>
    </div>
  )
}
