import {
  faAward,
  faCheck,
  faClose,
  faListCheck,
  faRocket,
  faStar,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Feature from "./Components/Feature"
import FAQ from "./Components/FAQ"
import { useTranslation } from "react-i18next"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth/context"
import { getUserById, updateUserById } from "../../utils/firestoreUtil"
import toast from "react-hot-toast"

export default function Plans() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === "ar"
  const { user } = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (user) {
      fetchUser(user.uid)
    }
  }, [user])

  async function fetchUser(id) {
    const userData = await getUserById(id)
    setCurrentUser(userData.data())
  }

  async function upgradeToPro() {
    if (currentUser && currentUser.subscribtion?.plan === "pro") {
      toast.error(t("plans.stay_pro"))
    } else {
      const newUserData = {
        ...currentUser,
        subscribtion: { ...currentUser.subscribtion, plan: "pro" },
      }
      try {
        await updateUserById(currentUser.uid, newUserData)
        setCurrentUser(newUserData)
        toast.success(t("plans.upgrade_success"))
      } catch (error) {
        console.error("Error upgrading to Pro:", error)
        toast.error(t("plans.upgrade_error"))
      }
    }
  }

  async function downgradeToFree() {
    if (currentUser && currentUser.subscribtion?.plan === "free") {
      toast.error(t("plans.already_free"))
    } else {
      const newUserData = {
        ...currentUser,
        subscribtion: { ...currentUser.subscribtion, plan: "free" },
      }
      try {
        await updateUserById(currentUser.uid, newUserData)
        setCurrentUser(newUserData)
        toast.success(t("plans.downgrade_success"))
      } catch (error) {
        console.error("Error downgrading to Free:", error)
        toast.error(t("plans.downgrade_error"))
      }
    }
  }

  return (
    currentUser && (
      <>
        <div className="mx-auto container py-8 px-4 xl:px-64">
          <h1 className="text-[var(--color-text-light)] text-4xl font-bold text-center my-2">
            {t("plans.title")}
          </h1>
          <p className="text-[var(--color-text-primary)] text-lg text-center font-semibold">
            {t("plans.subtitle")}
          </p>
          <div className="flex gap-8 my-10 flex-col md:flex-row">
            <div className="border border-[var(--color-card-border)] rounded-lg  flex-1">
              <div className="flex justify-between items-center p-5">
                <h2 className="text-[var(--color-text-light)] text-2xl font-bold">
                  {t("plans.free")}
                </h2>
                <p className="py-1 px-5 text-sm font-semibold rounded-full bg-[#2a2724] text-[var(--color-text-primary)]">
                  {t("plans.default")}
                </p>
              </div>
              <h2
                className={`text-[var(--color-text-light)] text-4xl font-bold pb-5 ${
                  isArabic ? "pr-5" : "pl-5"
                }`}
              >
                {t("plans.free_price")}
                <span className="text-base font-medium text-[var(--color-text-primary)]">
                  {t("plans.per_month")}
                </span>
              </h2>
              <p
                className={`text-[var(--color-text-primary)] font-semibold pb-5 mb-5 ${
                  isArabic ? "pr-5" : "pl-5"
                } border-b border-[var(--color-card-border)]`}
              >
                {t("plans.free_desc")}
              </p>
              <div className="flex gap-2 items-center px-5 mb-5 pt-0">
                <FontAwesomeIcon
                  icon={faListCheck}
                  className="text-[var(--main-color)]"
                ></FontAwesomeIcon>
                <p className="font-bold text-[var(--color-text-light)] text-base">
                  {t("plans.features")}
                </p>
              </div>
              <Feature>{t("plans.free_learn")}</Feature>
              <Feature>{t("plans.free_teach")}</Feature>
              <Feature>{t("plans.free_commission")}</Feature>
              <Feature>{t("plans.free_active")}</Feature>
              <Feature notIncluded={true}>{t("plans.free_badge")}</Feature>
              <div className="mt-12 border-t border-t-[var(--color-card-border)] p-5 flex justify-center items-center">
                <div 
                  onClick={downgradeToFree}
                  className={`w-full py-4 text-center rounded-lg ${currentUser.subscribtion.plan === 'free' ? 'bg-[#2b2825] text-[var(--color-text-secondary)] cursor-not-allowed' : 'bg-[var(--color-btn-submit-bg)] cursor-pointer hover:bg-[var(--color-btn-submit-hover)]'}  font-bold transition-all duration-300`}>
                  {currentUser.subscribtion?.plan === "free"
                    ? t("plans.stay_free")
                    : t("plans.downgrade_free")}
                </div>
              </div>
            </div>
            <div className="border-2 border-[var(--main-color)] rounded-lg  flex-1">
              <div className="flex justify-between items-center p-5">
                <div className="text-[var(--color-text-light)] text-2xl font-bold flex items-center gap-1">
                  {t("plans.pro")}
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[#ffc107] text-base mt-1"
                  ></FontAwesomeIcon>
                </div>
                <div className="flex gap-1 items-center py-1 px-5 text-sm font-bold rounded-full bg-[#ffc107] text-[var(--color-text-dark)]">
                  <FontAwesomeIcon icon={faAward} className="text-sm"></FontAwesomeIcon>
                  {t("plans.best_value")}
                </div>
              </div>
              <h2
                className={`text-[var(--color-text-light)] text-4xl font-bold pb-5 ${
                  isArabic ? "pr-5" : "pl-5"
                }`}
              >
                {t("plans.pro_price")}
                <span className="text-base font-medium text-[var(--color-text-primary)]">
                  {t("plans.per_month")}
                </span>
              </h2>
              <p
                className={`text-[var(--color-text-primary)] font-semibold pb-5 mb-5 ${
                  isArabic ? "pr-5" : "pl-5"
                } border-b border-[var(--color-card-border)] `}
              >
                {t("plans.pro_desc")}
              </p>
              <div className="flex gap-2 items-center px-5 mb-5 pt-0">
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-[var(--main-color)]"
                ></FontAwesomeIcon>
                <p className="font-bold text-[var(--color-text-light)] text-base">
                  {t("plans.pro_features")}
                </p>
              </div>
              <Feature bold={t("plans.bold_unlimited")}>{t("plans.pro_learn")}</Feature>
              <Feature bold={t("plans.bold_unlimited")}>{t("plans.pro_teach")}</Feature>
              <Feature bold={t("plans.bold_no_commission")}>{t("plans.pro_commission")}</Feature>
              <Feature bold={t("plans.bold_unlimited")}>{t("plans.pro_active")}</Feature>
              <Feature bold={t("plans.bold_pro_badge")} verification={true}>
                {t("plans.pro_badge_desc")}
              </Feature>
              <div className="mt-12 border-t border-t-[var(--color-card-border)] p-5 flex justify-center items-center">
                <div
                  onClick={upgradeToPro}
                  className={`w-full py-4 text-center rounded-lg ${
                    currentUser.subscribtion.plan == "free"
                      ? "bg-[var(--color-btn-submit-bg)] cursor-pointer hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]"
                      : "bg-[#2b2825] text-[var(--color-text-secondary)] cursor-not-allowed"
                  } font-bold transition-all duration-300 `}
                >
                  {currentUser.subscribtion?.plan === "pro"
                    ? t("plans.stay_pro")
                    : t("plans.upgrade_pro")}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-light)] mt-16 mb-6 text-center">
            {t("plans.comparison")}
          </h2>
          <div className={`rounded-lg border border-[var(--color-card-border)] sm:border-0`}>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold">
              <p className={`${isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"} basis-[50%]`}>
                {t("plans.feature")}
              </p>
              <p className="basis-[25%] text-center">{t("plans.free")}</p>
              <p className="basis-[25%] text-center">{t("plans.pro")}</p>
            </div>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
              <p
                className={`${
                  isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"
                } basis-[50%] text-[var(--color-text-light)]`}
              >
                {t("plans.skills_learn")}
              </p>
              <p className="basis-[25%] text-center">{t("plans.free_learn_num")}</p>
              <p className="basis-[25%] text-center text-[var(--main-color)]">
                {t("plans.pro_learn_num")}
              </p>
            </div>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
              <p
                className={`${
                  isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"
                } basis-[50%] text-[var(--color-text-light)]`}
              >
                {t("plans.skills_teach")}
              </p>
              <p className="basis-[25%] text-center">{t("plans.free_teach_num")}</p>
              <p className="basis-[25%] text-center text-[var(--main-color)]">
                {t("plans.pro_teach_num")}
              </p>
            </div>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
              <p
                className={`${
                  isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"
                } basis-[50%] text-[var(--color-text-light)]`}
              >
                {t("plans.commission_rate")}
              </p>
              <p className="basis-[25%] text-center">{t("plans.free_commission_num")}</p>
              <p className="basis-[25%] text-center text-[var(--main-color)]">
                {t("plans.pro_commission_num")}
              </p>
            </div>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
              <p
                className={`${
                  isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"
                } basis-[50%] text-[var(--color-text-light)]`}
              >
                {t("plans.active_trades")}
              </p>
              <p className="basis-[25%] text-center">{t("plans.free_active_num")}</p>
              <p className="basis-[25%] text-center text-[var(--main-color)]">
                {t("plans.pro_active_num")}
              </p>
            </div>
            <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
              <p
                className={`${
                  isArabic ? "pr-4 sm:pr-0" : "pl-4 sm:pl-0"
                } basis-[50%] text-[var(--color-text-light)]`}
              >
                {t("plans.pro_badge")}
              </p>
              <FontAwesomeIcon icon={faClose} className="basis-[25%] text-center"></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faCheck}
                className="basis-[25%] text-center text-[var(--main-color)]"
              >
                Unlimited%
              </FontAwesomeIcon>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-light)] mt-16 mb-8 text-center">
            {t("plans.faq_title")}
          </h2>
          <FAQ question={t("plans.faq1_q")} answer={t("plans.faq1_a")}></FAQ>
          <FAQ question={t("plans.faq2_q")} answer={t("plans.faq2_a")}></FAQ>
          <FAQ question={t("plans.faq3_q")} answer={t("plans.faq3_a")}></FAQ>
        </div>
      </>
    )
  )
}
