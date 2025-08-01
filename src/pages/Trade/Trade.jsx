import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avat from "../../assets/images/avat.png"
import ExpTag from "./ExpTag"
import { faCommentDots } from "@fortawesome/free-solid-svg-icons"

export default function Trade() {
  return (
    <div className="mx-auto container py-6 px-4 md:px-16">
      <div className="p-6 border-2 border-[var(--color-card-border)] mb-8 rounded-lg">
        <div className="flex justify-between items-center border-b-2 border-[var(--color-card-border)] pb-6">
          <div className="flex gap-3 items-start flex-1">
            <img src={Avat} alt="userAvatar" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h1 className="font-bold text-xl text-[var(--color-text-light)] relative w-fit before:content-['You'] before:bg-[var(--main-color)] before:text-[10px] before:h-5 before:rounded-xl before:text-center before:px-2 before:left-[calc(100%+10px)] before:absolute before:top-[50%] before:-translate-y-1/2 before:flex before:justify-center before:items-center">
                Alex Morgan
              </h1>
              <h2 className="font-bold text-base my-2 text-[var(--color-text-light)] relative w-fit">
                <span className="text-[var(--color-text-primary)]">Teaching: </span> UX Design
                <ExpTag expLevel={'Advanced'}></ExpTag>
              </h2>
              <h2 className="font-bold text-base my-2 text-[var(--color-text-light)] relative w-fit">
                <span className="text-[var(--color-text-primary)]">Learning: </span> Python Programming
                <ExpTag expLevel={'Beginner'}></ExpTag>
              </h2>
            </div>
          </div>
          <div className="flex gap-3 items-start flex-1">
            <img src={Avat} alt="userAvatar" className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h1 className="font-bold text-xl text-[var(--color-text-light)] w-fit">
                James Wilson
              </h1>
              <h2 className="font-bold text-base my-2 text-[var(--color-text-light)] relative w-fit">
                <span className="text-[var(--color-text-primary)]">Teaching: </span> Python Programming
                <ExpTag expLevel={'Advanced'}></ExpTag>
              </h2>
              <h2 className="font-bold text-base my-2 text-[var(--color-text-light)] relative w-fit">
                <span className="text-[var(--color-text-primary)]">Learning: </span> UX Design
                <ExpTag expLevel={'Beginner'}></ExpTag>
              </h2>
            </div>
          </div>
        </div>

        <button className="mt-6 rounded-lg bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] text-[var(--color-text-light)] px-6 py-3 transition-all duration-300">
          <FontAwesomeIcon icon={faCommentDots} ></FontAwesomeIcon>
          <p className="inline ml-2 font-semibold">Message James</p>
        </button>
      </div>
    </div>
  )
}
