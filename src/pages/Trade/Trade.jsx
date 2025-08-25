import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avat from "../../assets/images/avat.png";
import ExpTag from "./Components/ExpTag";
import { faClipboardList, faCommentDots, faPenToSquare, faPlus, faRobot } from "@fortawesome/free-solid-svg-icons";
import Milestone from "./Components/Milestone";
import Progress from "./Components/Progress";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTradeById, getUserById, updateTrade, updateUserById } from "../../utils/firestoreUtil";
import { useAuth } from "../../contexts/Auth/context";
import { generateFromGemini } from "../../api/gemini";
import { generateNewMilestonePrompt } from "../../utils/geminiPrompts";
import MilestoneModal from "./Components/MilestoneModal";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaCreditCard } from "react-icons/fa";

export default function Trade() {
  const { id } = useParams();
  const [trade, setTrade] = useState([]);
  const [userA, setUserA] = useState([]);
  const [userB, setUserB] = useState([]);
  const [milestonesACompleted, setMilestonesACompleted] = useState(0);
  const [milestonesBCompleted, setMilestonesBCompleted] = useState(0);
  const [totalMilestonesA, setTotalMilestonesA] = useState(0);
  const [totalMilestonesB, setTotalMilestonesB] = useState(0);
  const { user } = useAuth();
  const [isUserA, setIsUserA] = useState(false);
  const navigate = useNavigate();
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [myMilestone, setMyMilestone] = useState(null); // for generating new milestones
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (myMilestone) {
      generateMilestoneFromScratch();
    }
  }, [myMilestone]);

  useEffect(() => {
    async function fetchAllData() {
      if (!id) return;
      const tradeData = await getTradeById(id);
      setTrade(tradeData);
      if (user.uid == tradeData.userA) setIsUserA(true);

      if (tradeData) {
        const userADataSnap = await getUserById(tradeData.userA);
        const userAData = userADataSnap.data();
        setUserA(userAData);

        const userBDataSnap = await getUserById(tradeData.userB);
        const userBData = userBDataSnap.data();
        setUserB(userBData);
      }
    }
    fetchAllData();
  }, [id]);

  useEffect(() => {
    if (!trade) return;
    calculateMilestoneProgress();
  }, [trade]);

  // Check if trade is completed
  useEffect(() => {
    if (totalMilestonesA == 0 && totalMilestonesB == 0) return;
    if (milestonesACompleted == totalMilestonesA && milestonesBCompleted == totalMilestonesB && trade.status !== "completed") {
      const newTrade = { ...trade, status: "completed" };
      setTrade(newTrade);
      updateTrade(id, newTrade);
      const newUserA = { ...userA, subscription: { ...userA.subscription, activeTradeCount: userA.subscription.activeTradeCount - 1 } };
      const newUserB = { ...userB, subscription: { ...userB.subscription, activeTradeCount: userB.subscription.activeTradeCount - 1 } };
      updateUserById(userA.uid, newUserA);
      updateUserById(userB.uid, newUserB);
    }
  }, [milestonesACompleted, milestonesBCompleted, totalMilestonesA, totalMilestonesB]);

  function calculateMilestoneProgress() {
    if (trade.milestonesA && trade.milestonesB) {
      setTotalMilestonesA(trade.milestonesA.length);
      setTotalMilestonesB(trade.milestonesB.length);

      let milestonesACompleted = 0;
      let milestonesBCompleted = 0;
      trade.milestonesA.forEach((milestone) => {
        if (milestone.isCompleted) milestonesACompleted++;
      });
      trade.milestonesB.forEach((milestone) => {
        if (milestone.isCompleted) milestonesBCompleted++;
      });
      setMilestonesACompleted(milestonesACompleted);
      setMilestonesBCompleted(milestonesBCompleted);
    }
  }

  // Generate a new milestone with AI
  async function generateMilestone() {
    if (isUserA) {
      let milestone = await generateFromGemini(generateNewMilestonePrompt(trade.skillA, trade.skillALevel, trade.milestonesA));
      milestone = milestone.replace("```json", "").replace("```", "");
      milestone = JSON.parse(milestone);

      const newMilestonesA = [...trade.milestonesA, milestone];
      const newTrade = { ...trade, milestonesA: newMilestonesA };
      setTrade(newTrade);
      updateTrade(id, newTrade);
    } else {
      let milestone = await generateFromGemini(generateNewMilestonePrompt(trade.skillB, trade.skillBLevel, trade.milestonesB));
      milestone = milestone.replace("```json", "").replace("```", "");
      milestone = JSON.parse(milestone);

      const newMilestonesB = [...trade.milestonesB, milestone];
      const newTrade = { ...trade, milestonesB: newMilestonesB };
      setTrade(newTrade);
      updateTrade(id, newTrade);
    }
  }

  // Generate a new milestones without AI
  function generateMilestoneFromScratch() {
    let m = { ...myMilestone, AI: false, id: crypto.randomUUID(), price: 0 };
    if (isUserA && trade && trade.milestonesA) {
      const newMilestonesA = [...trade.milestonesA, m];
      const newTrade = { ...trade, milestonesA: newMilestonesA };
      setTrade(newTrade);
      updateTrade(id, newTrade);
    } else if (!isUserA && trade && trade.milestonesB) {
      const newMilestonesB = [...trade.milestonesB, m];
      const newTrade = { ...trade, milestonesB: newMilestonesB };
      setTrade(newTrade);
      updateTrade(id, newTrade);
    }
    setMyMilestone(null);
  }

  console.log("trade info:", trade);
  console.log("userA info:", userA);
  console.log("userB info:", userB);
  console.log("isUserA:", isUserA);
  console.log("!trade?.milestonesB[0]:", !trade);

  const showPaymentControls = trade.skillB === "PAYMENT" && !isUserA && !trade?.milestonesB[0]?.isCompleted;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tradeId,
          milestoneId: milestone.id,
          amount: milestone.price,
          payerId: trade.userB, // UserB is always the payer
          recipientId: trade.userA, // UserA is always the recipient
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Update milestone status
      const updatedTrade = {
        ...trade,
        milestonesB: trade.milestonesB.map((m) => (m.id === milestone.id ? { ...m, isCompleted: true } : m)),
      };

      setTrade(updatedTrade);
      await updateTrade(tradeId, updatedTrade);
      toast.success(t("Payment.success"));
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(t("Payment.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showMilestoneModal && (
        <MilestoneModal setShowModal={setShowMilestoneModal} newMilestone={true} setMyMilestone={setMyMilestone}></MilestoneModal>
      )}
      <div className="mx-auto px-4 md:px-24 py-6 container">
        {trade && userA && userB && (user.uid == trade.userA || user.uid == trade.userB) ? (
          <>
            <div className="mb-8 p-6 border-[var(--color-card-border)] border-2 rounded-lg">
              <div className="flex lg:flex-row flex-col lg:justify-between items-start lg:items-center gap-6 lg:gap-0 pb-6 border-[var(--color-card-border)] border-b">
                <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                  <img
                    src={isUserA ? userA.profilePicture || Avat : userB.profilePicture || Avat}
                    alt="userAvatar"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <h1 className="capitalize before:top-[50%] before:left-[calc(100%+10px)] before:absolute relative before:flex before:justify-center before:items-center before:bg-[var(--main-color)] before:px-2 before:rounded-xl w-fit before:h-5 font-bold text-[var(--color-text-light)] before:text-[10px] text-xl before:text-center before:content-['You'] before:-translate-y-1/2">
                      {isUserA ? userA.name : userB.name}
                    </h1>
                    <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                      <span className="capitalize text-[var(--color-text-primary)]">{t("teaching")}:</span> {isUserA ? trade.skillA : trade.skillB}
                      <ExpTag expLevel={isUserA ? trade.skillALevel : trade.skillBLevel}></ExpTag>
                    </h2>
                    <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                      <span className="capitalize text-[var(--color-text-primary)]">{t("learning")}: </span> {isUserA ? trade.skillB : trade.skillA}
                      <ExpTag expLevel={isUserA ? trade.skillBLevel : trade.skillALevel}></ExpTag>
                    </h2>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                  <img
                    src={isUserA ? userB.profilePicture || Avat : userA.profilePicture || Avat}
                    alt="userAvatar"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    <h1 className="capitalize w-fit font-bold text-[var(--color-text-light)] text-xl">{isUserA ? userB.name : userA.name}</h1>
                    <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                      <span className="capitalize text-[var(--color-text-primary)]">{t("teaching")}:</span> {isUserA ? trade.skillB : trade.skillA}
                      <ExpTag expLevel={isUserA ? trade.skillBLevel : trade.skillALevel}></ExpTag>
                    </h2>
                    <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                      <span className="capitalize text-[var(--color-text-primary)]">{t("learning")}:</span> {isUserA ? trade.skillA : trade.skillB}
                      <ExpTag expLevel={isUserA ? trade.skillALevel : trade.skillBLevel}></ExpTag>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center flex-wrap">
                <button
                  onClick={() => {
                    isUserA ? navigate(`/chat/${userB.uid}`) : navigate(`/chat/${userA.uid}`);
                  }}
                  className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg dark:text-[var(--color-text-light)] text-white/80 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
                  <p className="capitalize inline ml-2 font-semibold">{t("message_user", { name: isUserA ? userB.name : userA.name })}</p>
                </button>

                <div
                  onClick={() => navigate(`/rate/${isUserA ? userB.uid : userA.uid}`)}
                  className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg dark:text-[var(--color-text-light)] text-white/80 transition-all duration-300 flex justify-center items-center cursor-pointer text-xl"
                >
                  <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-6 relative">
              {trade.status === "completed" && (
                <div className="cursor-not-allowed z-50 absolute top-0 left-0 w-full h-full bg-black opacity-70 rounded-lg flex justify-center items-center">
                  <h1 className="text-4xl font-bold dark:text-[var(--color-text-light)] text-white/80">{t("trade_completed")}</h1>
                </div>
              )}
              <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
                <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                  <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                    {t("skill_im_learning")}: {isUserA ? trade.skillB : trade.skillA}
                  </h1>
                  <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                    {t("milestones_created_by", { name: isUserA ? userB.name : userA.name })}
                  </h2>
                </div>

                <div className="p-6 pb-0">
                  {(isUserA ? trade.milestonesB : trade.milestonesA)?.map((m) => (
                    <Milestone key={m.id} milestone={m} tradeId={id} isUserA={isUserA} />
                  ))}

                  <Progress completed={isUserA ? milestonesBCompleted : milestonesACompleted} outOf={isUserA ? totalMilestonesB : totalMilestonesA} />
                </div>
              </div>

              <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
                <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                  <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                    {t("skill_im_teaching")}: {isUserA ? trade.skillA : trade.skillB}
                  </h1>
                  <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                    {t("create_and_manage_milestones", { name: isUserA ? userB.name : userA.name })}
                  </h2>
                </div>

                {trade.skillB == "PAYMENT" ? (
                  <div className="mb-6 p-4 border border-[var(--color-card-border)] rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-[var(--color-text-light)]">{trade?.milestonesB[0]?.title}</h3>
                        <p className="text-[var(--color-text-secondary)] mt-2">{trade?.milestonesB[0]?.description}</p>
                      </div>
                      <span className="text-[var(--main-color)] font-bold text-xl">${trade?.milestonesB[0]?.price}</span>
                    </div>

                    {showPaymentControls && (
                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full mt-4 bg-[var(--main-color)] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <>
                            {/* <FontAwesomeIcon icon={FaCreditCard} /> */}
                            {t("Pay Now")}
                          </>
                        )}
                      </button>
                    )}

                    {trade?.milestonesB[0]?.isCompleted && (
                      <div className="mt-4 text-green-500 text-center font-medium">{t("Payment.completed")}</div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    {(isUserA ? trade.milestonesA : trade.milestonesB)?.map((m) => (
                      <Milestone key={m.id} milestone={m} controls={true} tradeId={id} setTrade={setTrade} trade={trade} isUserA={isUserA} />
                    ))}

                    <Progress
                      completed={isUserA ? milestonesACompleted : milestonesBCompleted}
                      outOf={isUserA ? totalMilestonesA : totalMilestonesB}
                    />

                    <div
                      onClick={() => setShowMilestoneModal(true)}
                      className="flex justify-center items-center mb-6 py-3 border border-[var(--color-card-border)] hover:border-[var(--main-color)] border-dashed rounded-lg w-full font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <p className="ml-2">{t("add_new_milestone")}</p>
                    </div>

                    <div
                      onClick={generateMilestone}
                      className="bg-[#31292a] flex justify-center items-center mb-6 py-3 border border-transparent hover:border-[var(--main-color)] rounded-lg w-full font-bold text-[var(--main-color)] transition-all duration-300 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faRobot} />
                      <p className="ml-2">{t("generate_with_ai")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t("not_part_of_trade")}</h1>
        )}
      </div>
    </>
  );
}
