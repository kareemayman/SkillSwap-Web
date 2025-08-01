import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avat from "../../assets/images/avat.png"
import ExpTag from "./Components/ExpTag"
import { faCommentDots } from "@fortawesome/free-solid-svg-icons"

export default function Trade() {
  return (
    <div className="mx-auto px-4 md:px-16 py-6 container">
      <div className="mb-8 p-6 border-[var(--color-card-border)] border-2 rounded-lg">
        <div className="flex lg:flex-row flex-col lg:justify-between items-start lg:items-center gap-6 lg:gap-0 pb-6 border-[var(--color-card-border)] border-b">
          <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
            <img src={Avat} alt="userAvatar" className="rounded-full w-16 h-16 object-cover" />
            <div>
              <h1 className="before:top-[50%] before:left-[calc(100%+10px)] before:absolute relative before:flex before:justify-center before:items-center before:bg-[var(--main-color)] before:px-2 before:rounded-xl w-fit before:h-5 font-bold text-[var(--color-text-light)] before:text-[10px] text-xl before:text-center before:content-['You'] before:-translate-y-1/2">
                Alex Morgan
              </h1>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Teaching: </span> UX Design
                <ExpTag expLevel={'Advanced'}></ExpTag>
              </h2>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Learning: </span> Python Programming
                <ExpTag expLevel={'Beginner'}></ExpTag>
              </h2>
            </div>
          </div>
          <div className="flex md:flex-row flex-col flex-1 justify-center md:justify-start items-start md:gap-3">
            <img src={Avat} alt="userAvatar" className="rounded-full w-16 h-16 object-cover" />
            <div>
              <h1 className="w-fit font-bold text-[var(--color-text-light)] text-xl">
                James Wilson
              </h1>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Teaching: </span> Python Programming
                <ExpTag expLevel={'Advanced'}></ExpTag>
              </h2>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Learning: </span> UX Design
                <ExpTag expLevel={'Beginner'}></ExpTag>
              </h2>
            </div>
          </div>
        </div>

        <button className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg text-[var(--color-text-light)] transition-all duration-300">
          <FontAwesomeIcon icon={faCommentDots} ></FontAwesomeIcon>
          <p className="inline ml-2 font-semibold">Message James</p>
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
          <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
            <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">Skill I'm Learning: Python Programming</h1>
            <h2 className="mt-1 font-bold text-[var(--color-text-secondary)] text-base">Milestones created by James Wilson</h2>
          </div>

          <div className="p-6"></div>
        </div>

        <div className="flex-1 p-6 border-[var(--color-card-border)] border-2 rounded-lg"></div>
      </div>
    </div>
  )
}
