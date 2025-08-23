import { useEffect, useState } from "react";
import Avat from "../../assets/images/avat.png";
import { SkillInfo } from "./components/SkillInfo";
import { useNavigate, useParams } from "react-router-dom";
import { createFirestoreTrade, getUserById, updateUserById } from "../../utils/firestoreUtil";
import { useAuth } from "../../contexts/Auth/context";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { generateFromGemini } from "../../api/gemini";
import { generateMilestonesPrompt } from "../../utils/geminiPrompts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { createRequest } from "../../utils/requestsUtils";
import { createNotification } from "../../utils/notificationService";

export const ScheduleSession = () => {
  const { t } = useTranslation();

  const [proposeTradeToggle, setProposeTradeToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [seekingSkill, setSeekingSkill] = useState("");
  const [offeringSkill, setOfferingSkill] = useState("");
  const [seekingSkillLevel, setSeekingSkillLevel] = useState("");
  const [offeringSkillLevel, setOfferingSkillLevel] = useState("");
  const [user, setUser] = useState(null);
  const { user: currentUserFromAuth } = useAuth();
  const [currentUser, setCurrentUser] = useState();
  const [disabledButton, setDisabledButton] = useState(false);
  const [offer, setOffer] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => {
          setUser(res.data());
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (currentUserFromAuth) {
      getUserById(currentUserFromAuth.uid)
        .then((res) => {
          setCurrentUser(res.data());
        })
        .catch((err) => {
          console.error("Error fetching current user data:", err);
        });
    }
  }, [currentUserFromAuth]);

  async function createTrade() {
    const toastId = toast.loading("Processing...");

    if (paymentToggle === false && (seekingSkill.trim() === "" || offeringSkill.trim() === "")) {
      toast.error(t("Please select both seeking and offering skills."), { id: toastId });
      return;
    }
    if (paymentToggle === true && seekingSkill.trim() === "") {
      toast.error(t("Please select a seeking skill."), { id: toastId });
      return;
    }
    if (paymentToggle === true && (!offer || offer < 5)) {
      toast.error(t("Offer a valid price"), { id: toastId });
      return;
    }
    if (currentUser.subscribtion.plan === "free" && currentUser.subscribtion.activeTradeCount > 0) {
      toast.error(t("free_trade_limit_reached"), { id: toastId });
      return;
    }

    // create trade request
    try {
      setDisabledButton(true);
      toast.loading("Creating trade request...", { id: toastId });

      const newRequest = await createRequest(
        {
          requestedSkill: seekingSkill,
          requestedSkillLevel: seekingSkillLevel,
          offeredSkill: paymentToggle ? null : offeringSkill,
          offeredSkillLevel: paymentToggle ? null : offeringSkillLevel,
          payment: paymentToggle ? offer : null,
          notes: "",
        },
        currentUser,
        user
      );

      toast.loading("Sending notification...", { id: toastId });

      // create notification for other user
      await createNotification("TRADE_REQUEST", {
        recipientId: user.uid,
        senderId: currentUser.uid,
        senderName: currentUser.name,
        senderProfilePicture: currentUser.profilePicture,
        requestId: newRequest.requestId,
        requestedSkill: newRequest.requestedSkill,
        offeredSkill: newRequest.offeredSkill,
        payment: newRequest.payment,
        notes: newRequest.notes,
      });

      toast.success(t("tradeRequestCreated", { name: user.name }), { id: toastId, duration: 4000 });
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
      console.error("Error creating trade request or notification:", error);
    } finally {
      setDisabledButton(false);
      // toast.dismiss(toastId);
    }
  }

  return (
    user &&
    currentUser && (
      <div className="mx-auto px-16 pt-8 pb-8 container">
        <h1 className="font-semibold text-[var(--color-text-primary)] text-3xl sm:text-left text-center">
          {t("Schedule Session with")} <span className="capitalize">{user?.name || "User"}</span>🗓️
        </h1>

        <div className="flex sm:flex-row flex-col items-center gap-3 my-8">
          <img src={user.profilePicture || Avat} alt="avatar" className="rounded-full w-32 h-32 object-cover" />
          <div className="sm:text-left text-center">
            <h2 className="font-medium text-[var(--color-text-primary)] text-2xl capitalize">
              {user.name} {user.subscribtion.plan === "pro" && <FontAwesomeIcon icon={faCertificate}></FontAwesomeIcon>}
            </h2>
            <p className="font-medium text-[var(--color-text-secondary)]">
              <span className="font-semibold text-[var(--color-text-primary)]">{t("Offering")}: </span>
              {user?.hasSkills?.map((s, i) => (
                <span key={s.skillId} className="capitalize">
                  {`${s.skillName} (${s.skillLevel})${i === user.hasSkills.length - 1 ? "" : ", "}`}
                </span>
              ))}
              <br />
              <span className="font-semibold text-[var(--color-text-primary)]">{t("Seeking")}: </span>
              {user?.needSkills?.map((s, i) => (
                <span key={s.skillId} className="capitalize">
                  {`${s.skillName} (${s.skillLevel})${i === user.needSkills.length - 1 ? "" : ", "}`}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="my-4 font-medium text-[var(--main-color)] text-xl">{t("Skills.Skills")}</h3>
          {user.hasSkills.map((skill) => (
            <SkillInfo key={skill.skillId} skillName={skill.skillName} skillLevel={skill.skillLevel} type={t("Offering")} />
          ))}
          {user.needSkills.map((skill) => (
            <SkillInfo key={skill.skillId} skillName={skill.skillName} skillLevel={skill.skillLevel} type={t("Seeking")} />
          ))}
        </div>

        <h3 className="mt-10 mb-2 font-medium text-[var(--main-color)] text-xl">{t("Bio")}</h3>
        <p className="text-[var(--color-text-secondary)] usercard p-3 rounded-lg">{user.bio}</p>

        <h3 className="mt-10 mb-4 font-medium text-[var(--main-color)] text-xl">{t("Actions")}</h3>
        <div className="flex flex-wrap-reverse gap-4">
          <button
            onClick={() => navigate(`/chat/${userId}`)}
            className="dark:bg-[#382f29] bg-[#f8e0b1] hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 rounded-full font-medium text-[var(--color-text-light)] text-sm transition-all duration-300"
          >
            {t("Message")}
          </button>
          <button
            onClick={() => setProposeTradeToggle(!proposeTradeToggle)}
            className={`dark:bg-[var(--color-btn-submit-bg)] bg-[var(--color-skill-learn-bg)] hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 rounded-full font-medium text-sm text-[var(--color-text-light)] transition-all duration-300 ${
              !proposeTradeToggle && "opacity-50"
            }`}
          >
            {t("Propose Skill Trade")}
          </button>
        </div>

        <div className={`${!proposeTradeToggle && "opacity-50"} relative`}>
          {!proposeTradeToggle && <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>}

          <h3 className="mt-10 mb-4 font-medium text-[var(--main-color)] text-xl">{t("Choose Your Option")}</h3>

          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setPaymentToggle(false)}
              className={`shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] rounded-lg font-medium text-sm transition-all duration-300 ${
                paymentToggle
                  ? "bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]"
                  : "dark:bg-[var(--color-btn-submit-bg)] bg-[var(--color-skill-learn-bg)] text-[var(--color-text-light)] hover:bg-[var(--color-btn-submit-hover)]"
              }`}
            >
              {t("Trade a Skill")}
            </button>
            <button
              onClick={() => setPaymentToggle(true)}
              className={`shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] rounded-lg font-medium text-sm transition-all duration-300 ${
                paymentToggle ? "bg-[#e79259] text-black" : "bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]"
              }`}
            >
              {t("Pay for a Session")}
            </button>
          </div>

          <select
            name="seekingSkill"
            id="seekingSkill"
            className="inline-block dark:bg-[#382f29] bg-[var(--color-btn-submit-bg)] shadow-sm mb-2 sm:mb-0 px-4 py-2 border border-[var(--color-btn-submit-hover)] rounded-lg outline-none sm:w-[300px] font-medium dark:text-[var(--color-text-light)] text-white/80 transition-all duration-300 cursor-pointer"
            value={seekingSkill}
            onChange={(e) => {
              setSeekingSkill(e.target.value);
              const selectedOption = e.target.options[e.target.selectedIndex];
              setSeekingSkillLevel(selectedOption.dataset.level);
            }}
          >
            <option value="" disabled selected>
              {t("Select Seeking Skill")}
            </option>
            {user.hasSkills.map((skill) => (
              <option key={skill.skillId} value={skill.skillName} data-level={skill.skillLevel} className="capitalize font-medium">
                {`${skill.skillName} (${skill.skillLevel})`}
              </option>
            ))}
          </select>

          <select
            name="offeringSkill"
            id="offeringSkill"
            className={`dark:bg-[#382f29] bg-[var(--color-btn-submit-bg)] shadow-sm sm:ml-4 px-4 py-2 border border-[var(--color-btn-submit-hover)] rounded-lg outline-none sm:w-[300px] font-medium dark:text-[var(--color-text-light)] text-white/80 transition-all duration-300 ${
              paymentToggle ? "opacity-20 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={paymentToggle}
            value={offeringSkill}
            onChange={(e) => {
              setOfferingSkill(e.target.value);
              const selectedOption = e.target.options[e.target.selectedIndex];
              setOfferingSkillLevel(selectedOption.dataset.level);
            }}
          >
            <option value="" disabled selected>
              {t("Select Offering Skill")}
            </option>
            {currentUser?.hasSkills?.map((skill) => (
              <option key={skill.skillId} value={skill.skillName} data-level={skill.skillLevel} className="capitalize font-medium">
                {`${skill.skillName} (${skill.skillLevel})`}
              </option>
            ))}
          </select>

          <div className={`${!paymentToggle && "opacity-50"} relative`}>
            {!paymentToggle && <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>}
            <h3 className="mt-10 mb-4 font-medium text-[var(--main-color)] text-xl">{t("Payment")}</h3>
            <p className="text-[var(--color-text-primary)]">{t("Propose offer for") + " " + user.name}</p>
            <input
              type="number"
              name="offer"
              id="offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder={t("Offer a price")}
              className="bg-[var(--color-card-bg)] rounded-lg mt-4 border border-[var(--color-card-border)] outline-none focus:border-[var(--color-card-border)] no-spinner placeholder:text-[var(--color-text-primary)]"
            />
          </div>

          <button
            disabled={disabledButton}
            onClick={createTrade}
            className={`bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] shadow-sm mt-4 px-5 py-2 border border-[var(--color-btn-submit-hover)] rounded-full sm:w-[400px] font-medium text-white transition-all duration-300${
              disabledButton ? "opacity-50 cursor-not-allowed hover:bg-[var(--color-btn-submit-bg)]" : ""
            }`}
          >
            {t("Schedule Session")}
          </button>
        </div>
      </div>
    )
  );
};
