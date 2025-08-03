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

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllData() {
      if (!id) return
      const tradeData = await getTradeById(id)
      setTrade(tradeData)

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
      {trade && userA && userB && (
        <>
          <div className="mb-8 p-6 border-[var(--color-card-border)] border-2 rounded-lg">
            <div className="flex lg:flex-row flex-col lg:justify-between items-start lg:items-center gap-6 lg:gap-0 pb-6 border-[var(--color-card-border)] border-b">
              <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                <img
                  src={userA.profilePicture ? userA.profilePicture : Avat}
                  alt="userAvatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h1 className="capitalize before:top-[50%] before:left-[calc(100%+10px)] before:absolute relative before:flex before:justify-center before:items-center before:bg-[var(--main-color)] before:px-2 before:rounded-xl w-fit before:h-5 font-bold text-[var(--color-text-light)] before:text-[10px] text-xl before:text-center before:content-['You'] before:-translate-y-1/2">
                    {userA.name}
                  </h1>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Teaching: </span>{" "}
                    {trade.skillA}
                    <ExpTag expLevel={trade.skillALevel}></ExpTag>
                  </h2>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Learning: </span>{" "}
                    {trade.skillB}
                    <ExpTag expLevel={trade.skillBLevel}></ExpTag>
                  </h2>
                </div>
              </div>
              <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
                <img
                  src={userB.profilePicture ? userB.profilePicture : Avat}
                  alt="userAvatar"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h1 className="capitalize w-fit font-bold text-[var(--color-text-light)] text-xl">
                    {userB.name}
                  </h1>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Teaching: </span>{" "}
                    {trade.skillB}
                    <ExpTag expLevel={trade.skillBLevel}></ExpTag>
                  </h2>
                  <h2 className="capitalize relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                    <span className="capitalize text-[var(--color-text-primary)]">Learning: </span>{" "}
                    {trade.skillA}
                    <ExpTag expLevel={trade.skillALevel}></ExpTag>
                  </h2>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/chat/${userB.uid}`)}
              className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg text-[var(--color-text-light)] transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
              <p className="capitalize inline ml-2 font-semibold">Message {userB.name}</p>
            </button>
          </div>

          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
              <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                  Skill I'm Learning: {trade.skillB}
                </h1>
                <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                  Milestones created by {userB.name}
                </h2>
              </div>

              <div className="p-6 pb-0">
                {trade.milestonesB?.map((m) => {
                  return <Milestone key={m.id} milestone={m} tradeId={id}></Milestone>
                })}

                <Progress completed={milestonesBCompleted} outOf={totalMilestonesB}></Progress>
              </div>
            </div>

            <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
              <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
                <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
                  Skill I'm Teaching: {trade.skillA}
                </h1>
                <h2 className="capitalize mt-1 font-bold text-[var(--color-text-secondary)] text-base">
                  Create and manage milestones for {userB.name}
                </h2>
              </div>

              <div className="p-6 pb-0">
                {trade.milestonesA?.map((m) => {
                  return <Milestone key={m.id} milestone={m} controls={true} tradeId={id} setTrade={setTrade} trade={trade}></Milestone>
                })}

                <Progress completed={milestonesACompleted} outOf={totalMilestonesA}></Progress>

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
      )}
    </div>
  )
}
