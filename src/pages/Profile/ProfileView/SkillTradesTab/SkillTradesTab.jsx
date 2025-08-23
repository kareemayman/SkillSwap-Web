import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAllTradesByUserId, getUserById } from "../../../../utils/firestoreUtil"
import { useEffect, useState } from "react"
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function SkillTradesTab({ updatedProfile }) {
  const [trades, setTrades] = useState([])
  const [tradesWithImgs, setTradesWithImgs] = useState([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (updatedProfile) {
      getAllTradesByUserId(updatedProfile.uid)
        .then((t) => {
          setTrades(t)
        })
        .catch((err) => console.error("Error fetching trades:", err))
    }
  }, [updatedProfile])

  useEffect(() => {
    if (trades) {
      console.log("Trades state updated:", trades)

      trades.forEach((trade) => {
        if (trade.userA === updatedProfile.uid) {
          getUserById(trade.userB)
            .then((userB) => {
              return userB.data()
            })
            .then((userBData) => {
              const newTrade = {
                ...trade,
                otherUserName: userBData?.name || "Unknown User",
                otherUserImg: userBData?.profilePicture || "",
              }
              setTradesWithImgs((prev) => [...prev, newTrade])
            })
            .catch((err) => console.error("Error fetching userB:", err))
        } else if (trade.userB === updatedProfile.uid) {
          getUserById(trade.userA)
            .then((userA) => {
              return userA.data()
            })
            .then((userAData) => {
              const newTrade = {
                ...trade,
                otherUserName: userAData?.name || "Unknown User",
                otherUserImg: userAData?.profilePicture || "",
              }
              setTradesWithImgs((prev) => [...prev, newTrade])
            })
            .catch((err) => console.error("Error fetching userA:", err))
        }
      })
    }
  }, [trades])

  return (
    tradesWithImgs &&
    tradesWithImgs.length > 0 &&
    tradesWithImgs.map((trade) => {
      return (
        <div
          onClick={() => navigate(`/trade/${trade.id}`)}
          className="flex justify-between rounded-xl p-2 px-4 mb-2 bg-[var(--bg-color1)] items-center cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
          key={trade.id}
        >
          <div className="flex items-center gap-4 flex-1">
            <img
              src={updatedProfile.profilePicture}
              className="rounded-full w-12 h-12 object-cover"
            ></img>
            <div>
              <p className="font-semibold text-lg">{updatedProfile.name}</p>
              <p className="text-base text-[var(--color-text-secondary)] capitalize">
                {updatedProfile.uid == trade.UserA ? trade.skillA : trade.skillB}
              </p>
            </div>
          </div>

          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-2xl flex-1 text-[var(--main-color)]"></FontAwesomeIcon>

          <div className="flex items-center gap-4 flex-0.5">
            <img
              src={trade.otherUserImg}
              className="rounded-full w-12 h-12 object-cover"
            ></img>
            <div>
              <p className="font-semibold text-lg">{trade.otherUserName}</p>
              <p className="text-base text-[var(--color-text-secondary)] capitalize">
                {updatedProfile.uid == trade.UserA ? trade.skillB : trade.skillA}
              </p>
            </div>
          </div>
        </div>
      )
    }) || (<div className="text-[var(--color-text-light)]">{t("No trades available.")}</div>)
  )
}
