import { useEffect, useState } from "react"
import Avat from "../../assets/images/avat.png"
import { SkillInfo } from "./components/SkillInfo"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../utils/firestoreUtil"
import { useAuth } from "../../contexts/Auth/context"

export const ScheduleSession = () => {
  const [proposeTradeToggle, setProposeTradeToggle] = useState(true)
  const [paymentToggle, setPaymentToggle] = useState(false)
  const [seekingSkill, setSeekingSkill] = useState("")
  const [offeringSkill, setOfferingSkill] = useState("")
  const [user, setUser] = useState(null)
  const { user: currentUserFromAuth } = useAuth()
  const [currentUser, setCurrentUser] = useState()

  const { userId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => {
          setUser(res.data())
        })
        .catch((err) => {
          console.error("Error fetching user data:", err)
        })
    }
  }, [userId])

  useEffect(() => {
    if (currentUserFromAuth) {
      getUserById(currentUserFromAuth.uid)
        .then((res) => {
          setCurrentUser(res.data())
        })
        .catch((err) => {
          console.error("Error fetching current user data:", err)
        })
    }
  }, [currentUserFromAuth])

  return (
    user &&
    currentUser && (
      <>
        <div className="mx-auto px-16 pt-8 pb-8 container">
          <h1 className="font-medium text-[var(--color-text-light)] text-4xl sm:text-left text-center">
            Schedule Session with <span className="capitalize">{user ? user.name : "User"}</span>
          </h1>
          <div className="flex sm:flex-row flex-col items-center gap-3 my-8">
            <img
              src={user.profilePicture ? user.profilePicture : Avat}
              alt="avatar image"
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="sm:text-left text-center">
              <h2 className="font-medium text-[var(--color-text-light)] text-2xl capitalize">
                {user.name}
              </h2>
              <p className="font-medium text-[var(--color-text-secondary)]">
                Offering:{" "}
                {user.hasSkills.map((s, i) => {
                  return (
                    <span className="capitalize" key={s.skillId}>{`${s.skillName} (${
                      s.skillLevel
                    })${i === user.hasSkills.length - 1 ? "" : ", "}`}</span>
                  )
                })}
                <br />
                Seeking:{" "}
                {user.needSkills.map((s, i) => {
                  return (
                    <span className="capitalize" key={s.skillId}>{`${s.skillName} (${
                      s.skillLevel
                    })${i === user.needSkills.length - 1 ? "" : ", "}`}</span>
                  )
                })}
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="my-4 font-medium text-[var(--color-text-light)] text-xl">Skills</h3>
            {user.hasSkills &&
              user.hasSkills.map((skill, index) => (
                <SkillInfo
                  skillName={skill.skillName}
                  skillLevel={skill.skillLevel}
                  type={"offering"}
                  key={skill.skillId}
                ></SkillInfo>
              ))}
            {user.needSkills &&
              user.needSkills.map((skill, index) => (
                <SkillInfo
                  skillName={skill.skillName}
                  skillLevel={skill.skillLevel}
                  type={"seeking"}
                  key={skill.skillId}
                ></SkillInfo>
              ))}
          </div>
          <h3 className="mt-10 mb-2 font-medium text-[var(--color-text-light)] text-xl">Bio</h3>
          <p className="text-[var(--color-text-light)]">{user.bio}</p>
          <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">Actions</h3>
          <div className="flex flex-wrap-reverse gap-4">
            <button
              onClick={() => navigate(`/chat/${userId}`)}
              className="bg-[#382f29] hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 rounded-full font-medium text-[var(--color-text-light)] text-sm transition-all duration-300"
            >
              Message
            </button>
            <button
              onClick={() => setProposeTradeToggle(!proposeTradeToggle)}
              className={`${
                !proposeTradeToggle && "opacity-50"
              } bg-[#e79259]  shadow-sm px-5 py-2 rounded-full font-medium text-black text-sm transition-all duration-300`}
            >
              Propose Skill Trade
            </button>
          </div>
          <div className={`${!proposeTradeToggle && "opacity-50"} relative`}>
            {!proposeTradeToggle && (
              <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>
            )}
            <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">
              Choose Your Option
            </h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={() => setPaymentToggle(false)}
                className={`${
                  paymentToggle
                    ? "bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]"
                    : "bg-[#e79259] text-black"
                } shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-sm transition-all duration-300`}
              >
                Trade a Skill
              </button>
              <button
                onClick={() => setPaymentToggle(true)}
                className={`${
                  paymentToggle
                    ? "bg-[#e79259] text-black"
                    : "bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]"
                } shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-sm transition-all duration-300`}
              >
                Pay for a Session
              </button>
            </div>
            <select
              name="seekingSkill"
              id="seekingSkill"
              className="inline-block bg-[#382f29] shadow-sm mb-2 sm:mb-0 px-4 py-2 border border-[var(--color-btn-submit-hover)] focus:border-[var(--color-btn-submit-hover)] border-solid rounded-lg outline-none sm:w-[300px] font-medium text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
              value={seekingSkill}
              onChange={(e) => setSeekingSkill(e.target.value)}
            >
              <option value="" disabled selected>
                Select Seeking Skill
              </option>
              {user.hasSkills &&
                user.hasSkills.map((skill) => (
                  <option
                    key={skill.skillId}
                    value={skill.skillName}
                    className="capitalize font-medium"
                  >
                    {skill.skillName} ({skill.skillLevel})
                  </option>
                ))}
            </select>
            <select
              name="offeringSkill"
              id="offeringSkill"
              className={`bg-[#382f29] shadow-sm sm:ml-4 px-4 py-2 border border-[var(--color-btn-submit-hover)] focus:border-[var(--color-btn-submit-hover)] border-solid rounded-lg outline-none sm:w-[300px] font-medium text-[var(--color-text-light)] transition-all duration-300 ${
                paymentToggle ? "opacity-20 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={paymentToggle}
              value={offeringSkill}
              onChange={(e) => setOfferingSkill(e.target.value)}
            >
              <option value="" disabled selected>
                Select Offering Skill
              </option>
              {currentUser.hasSkills &&
                currentUser.hasSkills.map((skill) => (
                  <option
                    key={skill.skillId}
                    value={skill.skillName}
                    className="capitalize font-medium"
                  >
                    {skill.skillName} ({skill.skillLevel})
                  </option>
                ))}
            </select>
            <div className={`${!paymentToggle && "opacity-50"} relative`}>
              {!paymentToggle && (
                <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>
              )}
              <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">
                Payment
              </h3>
              <p className="text-[var(--color-text-light)]">
                Olivia charges $30 per session. Select a payment method:
              </p>
              <div className="flex flex-wrap gap-4 my-4">
                <button className="bg-transparent hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-[var(--color-text-light)] text-sm transition-all duration-300">
                  Credit Card
                </button>
                <button className="bg-transparent hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-[var(--color-text-light)] text-sm transition-all duration-300">
                  PayPal
                </button>
              </div>
            </div>
            <button className="bg-[#e79259] hover:bg-[var(--color-btn-submit-hover)] shadow-sm mt-4 px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-full sm:w-[400px] font-medium text-black transition-all duration-300">
              Schedule Session
            </button>
          </div>
        </div>
      </>
    )
  )
}
