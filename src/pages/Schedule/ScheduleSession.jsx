import Avat from "../../assets/images/avat.png"
import { SkillInfo } from "./components/SkillInfo"

export const ScheduleSession = () => {
  return (
    <div className="container mx-auto pt-8 px-16 pb-8">
      <h1 className="text-[var(--color-text-light)] font-medium text-4xl">
        Schedule Session with Olivia
      </h1>

      <div className="flex items-center gap-3 my-8">
        <img src={Avat} alt="avatar image" className="rounded-full w-32 h-32 object-cover" />

        <div className="">
          <h2 className="text-[var(--color-text-light)] font-medium text-2xl">Olivia</h2>
          <p className="text-[var(--color-text-secondary)] font-medium">
            Offering: Yoga (Intermediate), Seeking: Spanish (Beginner)
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-[var(--color-text-light)] font-medium text-xl my-4">Skills</h3>

        <SkillInfo skillName="Yoga" skillLevel="Intermediate" type="Offering" />
        <SkillInfo skillName="Spanish" skillLevel="Beginner" type="Seeking" />
      </div>

      <h3 className="text-[var(--color-text-light)] font-medium text-xl mt-10 mb-2">Bio</h3>
      <p className="text-[var(--color-text-light)]">
        Olivia has been teaching yoga for 3 years and is a beginner in Spanish.
      </p>

      <h3 className="text-[var(--color-text-light)] font-medium text-xl mt-10 mb-4">Actions</h3>
      <div className="flex gap-4">
        <button className="bg-[#382f29] text-[var(--color-text-light)] px-5 font-medium text-sm transition-all duration-300 py-2 rounded-full shadow-sm hover:bg-[var(--color-btn-submit-hover)]">
          Message
        </button>
        <button className="bg-[#e79259] text-black px-5 font-medium text-sm transition-all duration-300 py-2 rounded-full shadow-sm hover:bg-[var(--color-btn-submit-hover)]">
          Propose Skill Trade
        </button>
      </div>

      <h3 className="text-[var(--color-text-light)] font-medium text-xl mt-10 mb-4">
        Choose Your Option
      </h3>
      <div className="flex gap-4 mb-4">
        <button className="bg-[#e79259] text-black px-5 font-medium text-sm transition-all duration-300 py-2 rounded-lg shadow-sm hover:bg-[var(--color-btn-submit-hover)] border border-solid border-[var(--color-btn-submit-hover)]">
          Trade a Skill
        </button>
        <button className="bg-transparent text-[var(--color-text-light)] px-5 font-medium text-sm transition-all duration-300 py-2 rounded-lg shadow-sm hover:bg-[var(--color-btn-submit-hover)] border border-solid border-[var(--color-btn-submit-hover)]">
          Pay for a Session
        </button>
      </div>

      <select
        name="offeringSkill"
        id="offeringSkill"
        className="bg-[#382f29] text-[var(--color-text-light)] px-4 py-2 rounded-lg shadow-sm border border-solid border-[var(--color-btn-submit-hover)] outline-none w-[220px] transition-all duration-300 cursor-pointer focus:border-[var(--color-btn-submit-hover)] hover:bg-[#]"
      >
        <option value="" disabled selected>
          Select Offering Skill
        </option>
        <option value="yoga">Yoga</option>
        <option value="spanish">Spanish</option>
      </select>

      <select
        name="seekingSkill"
        id="seekingSkill"
        className="ml-4 bg-[#382f29] text-[var(--color-text-light)] px-4 py-2 rounded-lg shadow-sm border border-solid border-[var(--color-btn-submit-hover)] outline-none w-[220px] transition-all duration-300 cursor-pointer focus:border-[var(--color-btn-submit-hover)] hover:bg-[#]"
      >
        <option value="" disabled selected>
          Select Seeking Skill
        </option>
        <option value="yoga">Yoga</option>
        <option value="spanish">Spanish</option>
      </select>

      <h3 className="text-[var(--color-text-light)] font-medium text-xl mt-10 mb-4">Payment</h3>
      <p className="text-[var(--color-text-light)]">
        Olivia charges $30 per session. Select a payment method:
      </p>

      <div className="flex gap-4 my-4">
        <button className="bg-transparent text-[var(--color-text-light)] px-5 font-medium text-sm transition-all duration-300 py-2 rounded-lg shadow-sm hover:bg-[var(--color-btn-submit-hover)] border border-solid border-[var(--color-btn-submit-hover)]">
          Credit Card
        </button>
        <button className="bg-transparent text-[var(--color-text-light)] px-5 font-medium text-sm transition-all duration-300 py-2 rounded-lg shadow-sm hover:bg-[var(--color-btn-submit-hover)] border border-solid border-[var(--color-btn-submit-hover)]">
          PayPal
        </button>
      </div>

      <button className="bg-[#e79259] text-black px-5 font-medium w-[400px] transition-all duration-300 py-2 rounded-full shadow-sm hover:bg-[var(--color-btn-submit-hover)] border border-solid border-[var(--color-btn-submit-hover)] mt-4">Schedule Session</button>
    </div>
  )
}
