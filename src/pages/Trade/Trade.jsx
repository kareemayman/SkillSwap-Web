import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avat from "../../assets/images/avat.png"
import ExpTag from "./Components/ExpTag"
import { faCommentDots, faPlus, faRobot } from "@fortawesome/free-solid-svg-icons"
import Milestone from "./Components/Milestone"
import Progress from "./Components/Progress"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTradeById, getUserById } from "../../utils/firestoreUtil"
import { useAuth } from "../../contexts/Auth/context"

export default function Trade() {
  const { id } = useParams()
  const [trade, setTrade] = useState([])
  const [userA, setUserA] = useState([])
  const [userB, setUserB] = useState([])
  const [milestonesACompleted, setMilestonesACompleted] = useState(0)
  const [milestonesBCompleted, setMilestonesBCompleted] = useState(0)
  const [totalMilestonesA, setTotalMilestonesA] = useState(0)
  const [totalMilestonesB, setTotalMilestonesB] = useState(0)
  const { user } = useAuth()
  const [isUserA, setIsUserA] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllData() {
      if (!id) return
      const tradeData = await getTradeById(id)
      setTrade(tradeData)
      if(user.uid == tradeData.userA) setIsUserA(true)

      if (tradeData) {
        const userADataSnap = await getUserById(tradeData.userA)
        const userAData = userADataSnap.data()
        setUserA(userAData)

        const userBDataSnap = await getUserById(tradeData.userB)
        const userBData = userBDataSnap.data()
        setUserB(userBData)
      }
    }
    fetchAllData()
  }, [id])

  useEffect(() => {
    if (!trade) return
    calculateMilestoneProgress()
  }, [trade])

  function calculateMilestoneProgress() {
    if (trade.milestonesA && trade.milestonesB) {
      setTotalMilestonesA(trade.milestonesA.length)
      setTotalMilestonesB(trade.milestonesB.length)

      let milestonesACompleted = 0
      let milestonesBCompleted = 0
      trade.milestonesA.forEach((milestone) => {
        if (milestone.isCompleted) milestonesACompleted++
      })
      trade.milestonesB.forEach((milestone) => {
        if (milestone.isCompleted) milestonesBCompleted++
      })
      setMilestonesACompleted(milestonesACompleted)
      setMilestonesBCompleted(milestonesBCompleted)
    }
  }

  return (
    <div className="mx-auto px-4 md:px-24 py-6 container">
      {trade && userA && userB && (user.uid == trade.userA || user.uid == trade.userB) ? (
        <>
          <div className="mb-8 p-6 border-[var(--color-card-border)] border-2 rounded-lg">
            <div className="flex lg:flex-row flex-col lg:justify-between items-start lg:items-center gap-6 lg:gap-0 pb-6 border-[var(--color-card-border)] border-b">
              <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                <img
                  src={isUserA ? (userA.profilePicture ? userA.profilePicture : Avat) : (userB.profilePicture ? userB.profilePicture : Avat)}
                  alt="userAvatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h1 className="capitalize before:top-[50%] before:left-[calc(100%+10px)] before:absolute relative before:flex before:justify-center before:items-center before:bg-[var(--main-color)] before:px-2 before:rounded-xl w-fit before:h-5 font-bold text-[var(--color-text-light)] before:text-[10px] text-xl before:text-center before:content-['You'] before:-translate-y-1/2">
                    {isUserA ? userA.name : userB.name}
                  </h1>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Teaching: </span>{" "}
                    {isUserA ? trade.skillA : trade.skillB}
                    <ExpTag expLevel={isUserA ? trade.skillALevel : trade.skillBLevel}></ExpTag>
                  </h2>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Learning: </span>{" "}
                    {isUserA ? trade.skillB : trade.skillA}
                    <ExpTag expLevel={isUserA ? trade.skillBLevel : trade.skillALevel}></ExpTag>
                  </h2>
                </div>
              </div>
              <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                <img
                  src={isUserA ? (userB.profilePicture ? userB.profilePicture : Avat) : (userA.profilePicture ? userA.profilePicture : Avat)}
                  alt="userAvatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h1 className="capitalize w-fit font-bold text-[var(--color-text-light)] text-xl">
                    {isUserA ? userB.name : userA.name}
                  </h1>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Teaching: </span>{" "}
                    {isUserA ? trade.skillB : trade.skillA}
                    <ExpTag expLevel={isUserA ? trade.skillBLevel : trade.skillALevel}></ExpTag>
                  </h2>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Learning: </span>{" "}
                    {isUserA ? trade.skillA : trade.skillB}
                    <ExpTag expLevel={isUserA ? trade.skillALevel : trade.skillBLevel}></ExpTag>
                  </h2>
                </div>
              </div>
            </div>

            <button
              onClick={() => {isUserA ? navigate(`/chat/${userB.uid}`) : navigate(`/chat/${userA.uid}`)}}
              className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg text-[var(--color-text-light)] transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
              <p className="capitalize inline ml-2 font-semibold">Message {isUserA ? userB.name : userA.name}</p>
            </button>
          </div>

          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
              <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                  Skill I'm Learning: {isUserA ? trade.skillB : trade.skillA}
                </h1>
                <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                  Milestones created by {isUserA ? userB.name : userA.name}
                </h2>
              </div>

              <div className="p-6 pb-0">
                {isUserA ? (trade.milestonesB?.map((m) => {
                  return <Milestone key={m.id} milestone={m} tradeId={id} isUserA={isUserA}></Milestone>
                })) : (trade.milestonesA?.map((m) => {
                  return <Milestone key={m.id} milestone={m} tradeId={id} isUserA={isUserA}></Milestone>
                }))}

                <Progress completed={isUserA ? milestonesBCompleted : milestonesACompleted} outOf={isUserA ? totalMilestonesB : totalMilestonesA}></Progress>
              </div>
            </div>

            <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
              <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                  Skill I'm Teaching: {isUserA ? trade.skillA : trade.skillB}
                </h1>
                <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                  Create and manage milestones for {isUserA ? userB.name : userA.name}
                </h2>
              </div>

              <div className="p-6 pb-0">
                {isUserA ?(trade.milestonesA?.map((m) => {
                  return <Milestone key={m.id} milestone={m} controls={true} tradeId={id} setTrade={setTrade} trade={trade} isUserA={isUserA}></Milestone>
                })) : (trade.milestonesB?.map((m) => {
                  return <Milestone key={m.id} milestone={m} controls={true} tradeId={id} setTrade={setTrade} trade={trade} isUserA={isUserA}></Milestone>
                }))}

                <Progress completed={isUserA ? milestonesACompleted : milestonesBCompleted} outOf={isUserA ? totalMilestonesA : totalMilestonesB}></Progress>

                <div className="flex justify-center items-center mb-6 py-3 border border-[var(--color-card-border)] hover:border-[var(--main-color)] border-dashed rounded-lg w-full font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-light)] transition-all duration-300 cursor-pointer">
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  <p className="ml-2">Add New Milestone</p>
                </div>

                <div className="bg-[#31292a] flex justify-center items-center mb-6 py-3 border border-transparent hover:border-[var(--main-color)] rounded-lg w-full font-bold text-[var(--main-color)] transition-all duration-300 cursor-pointer">
                  <FontAwesomeIcon icon={faRobot}></FontAwesomeIcon>
                  <p className="ml-2">Generate With AI</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">You're not part of this trade</h1>}
    </div>
  )
}
