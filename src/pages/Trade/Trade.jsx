import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avat from "../../assets/images/avat.png"
import ExpTag from "./Components/ExpTag"
import { faCommentDots, faPlus, faRobot } from "@fortawesome/free-solid-svg-icons"
import Milestone from "./Components/Milestone"
import Progress from "./Components/Progress"

export default function Trade() {
  return (
    <div className="mx-auto px-4 md:px-24 py-6 container">
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
                <ExpTag expLevel={"Advanced"}></ExpTag>
              </h2>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Learning: </span> Python
                Programming
                <ExpTag expLevel={"Beginner"}></ExpTag>
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
                <span className="text-[var(--color-text-primary)]">Teaching: </span> Python
                Programming
                <ExpTag expLevel={"Advanced"}></ExpTag>
              </h2>
              <h2 className="relative my-2 w-fit font-bold text-[var(--color-text-light)] text-base">
                <span className="text-[var(--color-text-primary)]">Learning: </span> UX Design
                <ExpTag expLevel={"Beginner"}></ExpTag>
              </h2>
            </div>
          </div>
        </div>

        <button className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] mt-6 px-6 py-3 rounded-lg text-[var(--color-text-light)] transition-all duration-300">
          <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
          <p className="inline ml-2 font-semibold">Message James</p>
        </button>
      </div>

      <div className="flex lg:flex-row flex-col gap-6">
        <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
          <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
            <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
              Skill I'm Learning: Python Programming
            </h1>
            <h2 className="mt-1 font-bold text-[var(--color-text-secondary)] text-base">
              Milestones created by James Wilson
            </h2>
          </div>

          <div className="p-6 pb-0">
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Python Basics and Syntax",
                isCompleted: true,
                description:
                  "Learn the fundamentals of Python including variables, data types, and basic operations. Complete 3 simple exercises.",
              }}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Control Flow and Loops",
                isCompleted: false,
                description:
                  "Master if/else statements, for and while loops. Build a simple number guessing game application.",
              }}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Functions and Modules",
                isCompleted: false,
                description:
                  "Learn to create reusable code with functions, understand parameters, return values, and importing modules.",
              }}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Data Structures",
                isCompleted: false,
                description:
                  "Work with lists, dictionaries, sets, and tuples. Create a simple contact management system.",
              }}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Final Project",
                isCompleted: false,
                description:
                  "Build a command-line tool that demonstrates all concepts learned throughout the sessions.",
              }}
            ></Milestone>

            <Progress completed={1} outOf={5}></Progress>
          </div>
        </div>

        <div className="flex-1 py-6 border-[var(--color-card-border)] border-2 rounded-lg">
          <div className="px-6 pb-6 border-[var(--color-card-border)] border-b">
            <h1 className="font-bold text-[var(--color-text-light)] text-xl capitalize">
              Skill I'm Teaching: UX Design
            </h1>
            <h2 className="mt-1 font-bold text-[var(--color-text-secondary)] text-base">
              Create and manage milestones for James Wilson
            </h2>
          </div>

          <div className="p-6 pb-0">
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "UX Fundamentals and User Research",
                isCompleted: true,
                description:
                  "Introduction to UX principles, understanding user needs, and basic research methods.",
              }}
              controls={true}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Wireframing and Prototyping",
                isCompleted: false,
                description:
                  "Create low-fidelity wireframes and interactive prototypes using Figma.",
              }}
              controls={true}
              ai={true}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "User Interface Design Principles",
                isCompleted: false,
                description:
                  "Learn color theory, typography, visual hierarchy, and accessibility considerations.",
              }}
              controls={true}
              ai={true}
            ></Milestone>
            <Milestone
              milestone={{
                id: crypto.randomUUID(),
                title: "Usability Testing",
                isCompleted: false,
                description:
                  "Conduct usability tests, analyze results, and implement design improvements based on feedback.",
              }}
              controls={true}
            ></Milestone>

            <Progress completed={1} outOf={4}></Progress>

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
    </div>
  )
}
