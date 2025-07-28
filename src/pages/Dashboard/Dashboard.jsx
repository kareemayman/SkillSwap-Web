import { useEffect, useState } from "react"
import Avat from "../../assets/images/avat.png"
import { fetchSkillsList, getAllUsers } from "../../utils/firestoreUtil"

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("users")
  const [allUsers, setAllUsers] = useState([])
  const [allSkills, setAllSkills] = useState([])

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users)
    })

    fetchSkillsList().then((skills) => {
      setAllSkills(skills)
    })
  }, [])

  return (
    <div className="container mx-auto px-16 pt-8 pb-8">
      <div className="flex gap-12 items-center border-b-2 border-[var(--color-card-border)] mb-8">
        <p
          className={`pb-4 relative ${
            selectedTab == "users"
              ? "text-[var(--color-text-light)]"
              : "text-[var(--color-text-primary)]"
          } cursor-pointer font-bold hover:text-[var(--color-text-light)] transition-all duration-300 text-lg before:absolute before:content-[""] ${
            selectedTab == "users" && "before:w-full"
          } before:h-[3px] before:rounded-xl before:bg-[var(--color-text-light)] before:top-[calc(100%-2px)] before:left-0 before:transition-all before:duration-300`}
          onClick={() => setSelectedTab("users")}
        >
          Users
        </p>
        <p
          className={`pb-4 relative ${
            selectedTab == "skills"
              ? "text-[var(--color-text-light)]"
              : "text-[var(--color-text-primary)]"
          } cursor-pointer font-bold hover:text-[var(--color-text-light)] text-lg before:absolute before:content-[""] ${
            selectedTab == "skills" && "before:w-full"
          } before:h-[3px] before:rounded-xl before:bg-[var(--color-text-light)] before:top-[calc(100%-2px)] before:left-0 before:transition-all before:duration-300`}
          onClick={() => setSelectedTab("skills")}
        >
          Skills
        </p>
        <p
          className={`pb-4 relative ${
            selectedTab == "reviews"
              ? "text-[var(--color-text-light)]"
              : "text-[var(--color-text-primary)]"
          } cursor-pointer font-bold hover:text-[var(--color-text-light)] text-lg before:absolute before:content-[""] ${
            selectedTab == "reviews" && "before:w-full"
          } before:h-[3px] before:rounded-xl before:bg-[var(--color-text-light)] before:top-[calc(100%-2px)] before:left-0 before:transition-all before:duration-300`}
          onClick={() => setSelectedTab("reviews")}
        >
          Reviews
        </p>
      </div>

      <div className="w-full min-h-20 rounded-lg border border-solid border-[var(--color-card-border)]">
        {selectedTab === "users" && (
          <>
            <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
              <p className="flex-1">User</p>
              <p className="flex-1">Name</p>
              <p className="flex-1">Skills</p>
              <p className="flex-1">Reviews</p>
              <p className="flex-1">Actions</p>
            </div>
            {allUsers &&
              allUsers.map((user) => (
                <div
                  key={user.uid}
                  className="flex items-center p-4 text-[var(--color-text-light)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]"
                >
                  <div className="flex-1">
                    <img
                      src={user.profilePicture ? user.profilePicture : Avat}
                      alt="image"
                      className="block rounded-full w-12 h-12 object-cover"
                    />
                  </div>
                  <p className="flex-1 capitalize">{user.name}</p>
                  <p className="flex-1 text-[var(--color-text-primary)] capitalize">
                    {user.hasSkills &&
                      user.hasSkills.map((s, i) => {
                        return `${s.skillName}${i < user.hasSkills.length - 1 ? ", " : ""}`
                      })}
                  </p>
                  <p className="flex-1 text-[var(--color-text-primary)]">{user.rating || 0}</p>
                  <div className="flex-1 text-[var(--color-text-primary)]">
                    <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                      Edit
                    </span>{" "}
                    |{" "}
                    <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                      Delete
                    </span>
                  </div>
                </div>
              ))}
          </>
        )}
        {selectedTab === "skills" && (
          <>
            <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
              <p className="flex-1">Skill Name</p>
              <p className="flex-1">Category</p>
              <p className="flex-1">Arabic Skill Name</p>
              <p className="flex-1">Actions</p>
            </div>
            {allSkills &&
              allSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center p-4 text-[var(--color-text-light)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]"
                >
                  <p className="flex-1">{skill.skillName}</p>
                  <p className="flex-1">{skill.category}</p>
                  <p className="flex-1">{skill.skillNameArabic}</p>
                  <div className="flex-1 text-[var(--color-text-primary)]">
                    <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                      Edit
                    </span>{" "}
                    |{" "}
                    <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                      Delete
                    </span>
                  </div>
                </div>
              ))}
          </>
        )}
        {selectedTab === "reviews" && (
          <>
            <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
              <p className="flex-1">Reviewer</p>
              <p className="flex-1">Reviewd User</p>
              <p className="flex-1 pr-6">Review Text</p>
              <p className="flex-1">Rating</p>
              <p className="flex-1">Actions</p>
            </div>
            {allUsers &&
              allUsers.map(
                (user) =>
                  user.reviews &&
                  user.reviews.map((review, index) => (
                    <div key={review.reviewId} className="flex items-center p-4 text-[var(--color-text-light)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
                      <p className="flex-1">{review.authorName}</p>
                      <p className="flex-1">{user.name}</p>
                      <p className="flex-1 text-[var(--color-text-primary)] pr-6">
                        {review.text}
                      </p>
                      <p className="flex-1 text-[var(--color-text-primary)]">{review.rating}</p>
                      <div className="flex-1 text-[var(--color-text-primary)]">
                        <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                          Edit
                        </span>{" "}
                        |{" "}
                        <span className="cursor-pointer transition-all duration-300 hover:text-[var(--color-text-light)]">
                          Delete
                        </span>
                      </div>
                    </div>
                  ))
              )}
          </>
        )}
      </div>
    </div>
  )
}
