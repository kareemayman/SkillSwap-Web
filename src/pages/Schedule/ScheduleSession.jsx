import { useState } from "react"
import Avat from "../../assets/images/avat.png"
import { SkillInfo } from "./components/SkillInfo"

export const ScheduleSession = () => {
  const [proposeTradeToggle, setProposeTradeToggle] = useState(true)
  const [paymentToggle, setPaymentToggle] = useState(false)
  const [seekingSkill, setSeekingSkill] = useState("")
  const [offeringSkill, setOfferingSkill] = useState("")

  return (
    <div className="mx-auto px-16 pt-8 pb-8 container">
      <h1 className="font-medium text-[var(--color-text-light)] text-4xl sm:text-left text-center">
        Schedule Session with Olivia
      </h1>

      <div className="flex sm:flex-row flex-col items-center gap-3 my-8">
        <img src={Avat} alt="avatar image" className="rounded-full w-32 h-32 object-cover" />

        <div className="sm:text-left text-center">
          <h2 className="font-medium text-[var(--color-text-light)] text-2xl">Olivia</h2>
          <p className="font-medium text-[var(--color-text-secondary)]">
            Offering: Yoga (Intermediate), Seeking: Spanish (Beginner)
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="my-4 font-medium text-[var(--color-text-light)] text-xl">Skills</h3>

        <SkillInfo skillName="Yoga" skillLevel="Intermediate" type="Offering" />
        <SkillInfo skillName="Spanish" skillLevel="Beginner" type="Seeking" />
      </div>

      <h3 className="mt-10 mb-2 font-medium text-[var(--color-text-light)] text-xl">Bio</h3>
      <p className="text-[var(--color-text-light)]">
        Olivia has been teaching yoga for 3 years and is a beginner in Spanish.
      </p>

      <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">Actions</h3>
      <div className="flex flex-wrap-reverse gap-4">
        <button className="bg-[#382f29] hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-5 py-2 rounded-full font-medium text-[var(--color-text-light)] text-sm transition-all duration-300">
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

      <div className={`${!proposeTradeToggle && 'opacity-50'} relative`}>
        {!proposeTradeToggle && <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>}
        <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">
          Choose Your Option
        </h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => setPaymentToggle(false)}
            className={`${paymentToggle ? 'bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]' : 'bg-[#e79259] text-black'} shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-sm transition-all duration-300`}>
            Trade a Skill
          </button>
          <button 
            onClick={() => setPaymentToggle(true)}
            className={`${paymentToggle ? 'bg-[#e79259] text-black' : 'bg-transparent hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)]'} shadow-sm px-5 py-2 border border-[var(--color-btn-submit-hover)] border-solid rounded-lg font-medium text-sm transition-all duration-300`}>
            Pay for a Session
          </button>
        </div>
        <select
          name="seekingSkill"
          id="seekingSkill"
          className="inline-block bg-[#382f29] shadow-sm mb-2 sm:mb-0 px-4 py-2 border border-[var(--color-btn-submit-hover)] focus:border-[var(--color-btn-submit-hover)] border-solid rounded-lg outline-none sm:w-[220px] text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
          value={seekingSkill}
          onChange={(e) => setSeekingSkill(e.target.value)}
        >
          <option value="" disabled selected>
            Select Seeking Skill
          </option>
          <option value="yoga">Yoga</option>
          <option value="spanish">Spanish</option>
        </select>
        <select
          name="offeringSkill"
          id="offeringSkill"
          className={`bg-[#382f29] shadow-sm sm:ml-4 px-4 py-2 border border-[var(--color-btn-submit-hover)] focus:border-[var(--color-btn-submit-hover)] border-solid rounded-lg outline-none sm:w-[220px] text-[var(--color-text-light)] transition-all duration-300 ${paymentToggle ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={paymentToggle}
          value={offeringSkill}
          onChange={(e) => setOfferingSkill(e.target.value)}
        >
          <option value="" disabled selected>
            Select Offering Skill
          </option>
          <option value="yoga">Yoga</option>
          <option value="spanish">Spanish</option>
        </select>

        <div className={`${!paymentToggle && 'opacity-50'} relative`}>
          {!paymentToggle && <div className="absolute inset-0 bg-[var(--color-card-bg)] opacity-50 rounded-lg"></div>}
          <h3 className="mt-10 mb-4 font-medium text-[var(--color-text-light)] text-xl">Payment</h3>
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
  )
}
