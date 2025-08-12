import { faAward, faCheck, faClose, faListCheck, faRocket, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Feature from "./Components/Feature"

export default function Plans() {
  return (
    <div className="mx-auto container py-6 px-4 xl:px-64">
      <h1 className="text-[var(--color-text-light)] text-4xl font-bold text-center my-2">
        Choose Your Plan
      </h1>
      <p className="text-[var(--color-text-primary)] text-lg text-center font-semibold">
        Start free or go Pro for the ultimate Skill Trade experience.
      </p>

      <div className="flex gap-8 my-10 flex-col md:flex-row">
        <div className="border border-[var(--color-card-border)] rounded-lg  flex-1">
          <div className="flex justify-between items-center p-5">
            <h2 className="text-[var(--color-text-light)] text-2xl font-bold">Free</h2>
            <p className="py-1 px-5 text-sm font-semibold rounded-full bg-[#2a2724] text-[var(--color-text-primary)]">
              Default
            </p>
          </div>

          <h2 className="text-[var(--color-text-light)] text-4xl font-bold pb-5 pl-5">
            $0{" "}
            <span className="text-base font-medium text-[var(--color-text-primary)]">/month</span>
          </h2>

          <p className="text-[var(--color-text-primary)] font-semibold pb-5 mb-5 pl-5 border-b border-[var(--color-card-border)] ">
            Perfect for getting started with skill trading
          </p>

          <div className="flex gap-2 items-center px-5 mb-5 pt-0">
            <FontAwesomeIcon
              icon={faListCheck}
              className="text-[var(--main-color)]"
            ></FontAwesomeIcon>
            <p className="font-bold text-[var(--color-text-light)] text-base">Features</p>
          </div>

          <Feature>Select up to 2 skills to learn</Feature>
          <Feature>Select up to 2 skills to teach</Feature>
          <Feature>20% Commission rate on all paid skill trades</Feature>
          <Feature>1 active skill trade at a time</Feature>
          <Feature notIncluded={true}>No Pro badge</Feature>

          <div className="mt-12 border-t border-t-[var(--color-card-border)] p-5 flex justify-center items-center">
            <div className="w-full py-4 text-center rounded-lg bg-[#2b2825] text-[var(--color-text-secondary)] cursor-not-allowed font-bold">
              Stay On Free Plan
            </div>
          </div>
        </div>

        <div className="border-2 border-[var(--main-color)] rounded-lg  flex-1">
          <div className="flex justify-between items-center p-5">
            <div className="text-[var(--color-text-light)] text-2xl font-bold flex items-center gap-1">
              Pro
              <FontAwesomeIcon
                icon={faStar}
                className="text-[#ffc107] text-base mt-1"
              ></FontAwesomeIcon>
            </div>
            <div className="flex gap-1 items-center py-1 px-5 text-sm font-bold rounded-full bg-[#ffc107] text-[var(--color-text-dark)]">
              <FontAwesomeIcon icon={faAward} className="text-sm"></FontAwesomeIcon>
              Best Value
            </div>
          </div>

          <h2 className="text-[var(--color-text-light)] text-4xl font-bold pb-5 pl-5">
            $9.99{" "}
            <span className="text-base font-medium text-[var(--color-text-primary)]">/month</span>
          </h2>

          <p className="text-[var(--color-text-primary)] font-semibold pb-5 mb-5 pl-5 border-b border-[var(--color-card-border)] ">
            Unlock unlimited potential with Pro features
          </p>

          <div className="flex gap-2 items-center px-5 mb-5 pt-0">
            <FontAwesomeIcon icon={faRocket} className="text-[var(--main-color)]"></FontAwesomeIcon>
            <p className="font-bold text-[var(--color-text-light)] text-base">Pro Features</p>
          </div>

          <Feature bold={"Unlimited "}>skills to learn</Feature>
          <Feature bold={"Unlimited "}>skills to teach</Feature>
          <Feature bold={"No Commissions "}>on paid skill trades</Feature>
          <Feature bold={"Unlimited "}>active skill trades</Feature>
          <Feature bold={"Pro verification badge "} verification={true}>
            next to profile name{" "}
          </Feature>

          <div className="mt-12 border-t border-t-[var(--color-card-border)] p-5 flex justify-center items-center">
            <div className="w-full py-4 text-center rounded-lg bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] cursor-pointer font-bold transition-all duration-300 hover:bg-[var(--color-btn-submit-hover)]">
              Upgrade to Pro
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-[var(--color-text-light)] mt-16 mb-6 text-center">Plan Comparison</h2>

      <div className={`rounded-lg border border-[var(--color-card-border)] sm:border-0`}>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold">
          <p className="pl-4 sm:pl-0 basis-[50%]">Feature</p>
          <p className="basis-[25%] text-center">Free</p>
          <p className="basis-[25%] text-center">Pro</p>
        </div>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
          <p className="pl-4 sm:pl-0 basis-[50%] text-[var(--color-text-light)]">Skills to Learn</p>
          <p className="basis-[25%] text-center">2</p>
          <p className="basis-[25%] text-center text-[var(--main-color)]">Unlimited</p>
        </div>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
          <p className="pl-4 sm:pl-0 basis-[50%] text-[var(--color-text-light)]">Skills to Teach</p>
          <p className="basis-[25%] text-center">2</p>
          <p className="basis-[25%] text-center text-[var(--main-color)]">Unlimited</p>
        </div>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
          <p className="pl-4 sm:pl-0 basis-[50%] text-[var(--color-text-light)]">Comission Rate</p>
          <p className="basis-[25%] text-center">20%</p>
          <p className="basis-[25%] text-center text-[var(--main-color)]">0%</p>
        </div>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
          <p className="pl-4 sm:pl-0 basis-[50%] text-[var(--color-text-light)]">Active Trades</p>
          <p className="basis-[25%] text-center">1</p>
          <p className="basis-[25%] text-center text-[var(--main-color)]">Unlimited</p>
        </div>
        <div className="flex py-4 text-[var(--color-text-primary)] font-semibold border-t border-t-[var(--color-card-border)]">
          <p className="pl-4 sm:pl-0 basis-[50%] text-[var(--color-text-light)]">Pro Badge</p>
          <FontAwesomeIcon icon={faClose} className="basis-[25%] text-center"></FontAwesomeIcon>
          <FontAwesomeIcon icon={faCheck} className="basis-[25%] text-center text-[var(--main-color)]">Unlimited%</FontAwesomeIcon>
        </div>
      </div>
    </div>
  )
}
