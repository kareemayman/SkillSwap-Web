import { useEffect, useState } from "react"
import Avat from "../../assets/images/avat.png"
import {
  deleteDocById,
  deleteReview,
  deleteSkillFromUsers,
  fetchSkillsList,
  getAllUsers,
} from "../../utils/firestoreUtil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { generateFromGemini } from "../../api/gemini"
import {
  filterReviewsPrompt,
  filterSkillObjectsPrompt,
  filterUsersPrompt,
} from "../../utils/geminiPrompts"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/Auth/context"
import toast from "react-hot-toast"

export default function Dashboard() {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState("users")
  const [allUsers, setAllUsers] = useState([])
  const [allSkills, setAllSkills] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [searchInputTimeout, setSearchInputTimeout] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users)
    })
    fetchSkillsList().then((skills) => setAllSkills(skills))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setSearchInputTimeout(searchInput)
    }, 1000)
  }, [searchInput])

  useEffect(() => {
    if (searchInputTimeout.trim() === "" && searchInputTimeout.trim() === searchInput.trim()) {
      setSearchResults([])
    } else if (
      searchInputTimeout.trim() !== "" &&
      searchInputTimeout.trim() === searchInput.trim()
    ) {
      let results = []
      if (selectedTab === "users") {
        async function filterUsers() {
          let filteredUsers = await generateFromGemini(
            filterUsersPrompt(searchInputTimeout, allUsers)
          )
          filteredUsers = filteredUsers.replace("```json", "").replace("```", "")
          results = JSON.parse(filteredUsers)
          setSearchResults(results)
        }
        filterUsers()
      } else if (selectedTab === "skills") {
        async function filterSkills() {
          let filteredSkills = await generateFromGemini(
            filterSkillObjectsPrompt(searchInputTimeout, allSkills)
          )
          filteredSkills = filteredSkills.replace("```json", "").replace("```", "")
          results = JSON.parse(filteredSkills)
          setSearchResults(results)
        }
        filterSkills()
      } else if (selectedTab === "reviews") {
        async function filterReviews() {
          let filteredReviews = await generateFromGemini(
            filterReviewsPrompt(searchInputTimeout, allUsers)
          )
          filteredReviews = filteredReviews.replace("```json", "").replace("```", "")
          results = JSON.parse(filteredReviews)
          setSearchResults(results)
        }
        filterReviews()
      }
    }
  }, [searchInputTimeout])

  useEffect(() => {
    setSearchInput("")
    setSearchResults([])
    setSearchInputTimeout("")
  }, [selectedTab])

  function handleDeleteUser(uid) {
    deleteDocById("users", uid)
      .then(() => {
        getAllUsers().then((users) => {
          setAllUsers(users)
        })
      })
      .then(() => {
        toast.success("User deleted successfully!")
      })
      .catch(() => {
        toast.error("Error deleting user")
      })
  }

  function handleDeleteSkill(skillId) {
    deleteDocById("skills", skillId)
      .then(() => {
        deleteSkillFromUsers(skillId)
        setAllSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
        getAllUsers().then((users) => {
          setAllUsers(users)
        })
      })
      .then(() => {
        toast.success("skill deleted successfully!")
      })
      .catch(() => {
        toast.error("Error deleting skill")
      })
  }

  function handleDeleteReview(userId, reviewId) {
    deleteReview(userId, reviewId)
      .then(() => {
        getAllUsers().then((users) => {
          setAllUsers(users)
        })
      })
      .then(() => {
        toast.success("Review deleted successfully!")
      })
      .catch(() => {
        toast.error("Error deleting review")
      })
  }

  return (
    <div className="container mx-auto px-16 pt-8 pb-8">
      {user.email == "skills.swap.app@gmail.com" ? (
        <>
          <div className="flex gap-12 items-center border-b-2 border-[var(--color-card-border)] mb-8">
            {["users", "skills", "reviews"].map((tab) => (
              <p
                key={tab}
                className={`pb-4 relative ${
                  selectedTab === tab
                    ? "text-[var(--main-color)]"
                    : "text-[var(--color-text-primary)]"
                } cursor-pointer font-bold hover:text-[var(--color-text-light)] transition-all duration-300 text-lg before:absolute before:content-[''] ${
                  selectedTab === tab && "before:w-full"
                } before:h-[3px] before:rounded-xl before:bg-[var(--main-color)] before:top-[calc(100%-2px)] before:left-0 before:transition-all before:duration-300`}
                onClick={() => setSelectedTab(tab)}
              >
                {t(`Dashboard.${tab.charAt(0).toUpperCase() + tab.slice(1)}`)}
              </p>
            ))}
          </div>

          <div className="w-full rounded-3xl bg-[#382E29] p-3 px-4 flex items-center gap-2 mb-8">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[var(--color-text-primary)] text-2xl"
            />
            <input
              type="text"
              name="search"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-primary)] focus:outline-none border-none"
              placeholder={
                selectedTab === "users"
                  ? t("Dashboard.SearchUsers")
                  : selectedTab === "skills"
                  ? t("Dashboard.SearchSkills")
                  : t("Dashboard.SearchReviews")
              }
            />
          </div>

          <div className="w-full min-h-20 rounded-lg shadow-[#382E29] shadow-md">
            {selectedTab === "users" && (
              <>
                <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
                  <p className="flex-1">{t("Dashboard.User")}</p>
                  <p className="flex-1">{t("Dashboard.Name")}</p>
                  <p className="flex-1">{t("Dashboard.Skills")}</p>
                  <p className="flex-1">{t("Dashboard.Reviews")}</p>
                  <p className="flex-1">{t("Dashboard.Actions")}</p>
                </div>
                {(searchResults.length > 0 ? searchResults : allUsers).map((user) => (
                  <div
                    key={user.uid}
                    className="flex items-center p-4 text-[var(--color-text-primary)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]"
                  >
                    <div className="flex-1">
                      <img
                        src={user.profilePicture || Avat}
                        alt="avatar"
                        className="block rounded-full w-12 h-12 object-cover"
                      />
                    </div>
                    <p className="flex-1 capitalize">{user.name}</p>
                    <p className="flex-1 text-[var(--color-text-primary)] capitalize">
                      {user.hasSkills?.map(
                        (s, i) => `${s.skillName}${i < user.hasSkills.length - 1 ? ", " : ""}`
                      )}
                    </p>
                    <p className="flex-1 text-[var(--color-text-primary)]">{user.rating || 0}</p>
                    <div className="flex-1 text-[var(--color-text-primary)]">
                      <span
                        onClick={() => handleDeleteUser(user.uid)}
                        className="cursor-pointer hover:text-[var(--color-text-light)]"
                      >
                        {t("Dashboard.Delete")}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {selectedTab === "skills" && (
              <>
                <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
                  <p className="flex-1">{t("Dashboard.SkillName")}</p>
                  <p className="flex-1">{t("Dashboard.Category")}</p>
                  <p className="flex-1">{t("Dashboard.ArabicSkillName")}</p>
                  <p className="flex-1">{t("Dashboard.Actions")}</p>
                </div>
                {(searchResults.length > 0 ? searchResults : allSkills).map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center p-4 text-[var(--color-text-primary)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]"
                  >
                    <p className="flex-1">{skill.skillName}</p>
                    <p className="flex-1">{skill.category}</p>
                    <p className="flex-1">{skill.skillNameArabic}</p>
                    <div className="flex-1 text-[var(--color-text-primary)]">
                      <span className="cursor-pointer hover:text-[var(--color-text-light)]">
                        {t("Dashboard.Edit")}
                      </span>{" "}
                      |{" "}
                      <span
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="cursor-pointer hover:text-[var(--color-text-light)]"
                      >
                        {t("Dashboard.Delete")}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {selectedTab === "reviews" && (
              <>
                <div className="flex items-center p-4 text-[var(--color-text-light)] font-bold bg-[#26211c] rounded-lg border-b border-solid border-b-[var(--color-card-border)]">
                  <p className="flex-1">{t("Dashboard.Reviewer")}</p>
                  <p className="flex-1">{t("Dashboard.ReviewedUser")}</p>
                  <p className="flex-1 pr-6">{t("Dashboard.ReviewText")}</p>
                  <p className="flex-1">{t("Dashboard.Rating")}</p>
                  <p className="flex-1">{t("Dashboard.Actions")}</p>
                </div>
                {(searchResults.length > 0 ? searchResults : allUsers).flatMap((user) =>
                  user.reviews?.map((review) => (
                    <div
                      key={review.reviewId}
                      className="flex items-center p-4 text-[var(--color-text-primary)] font-bold rounded-lg border-b border-solid border-b-[var(--color-card-border)]"
                    >
                      <p className="flex-1">{review.authorName}</p>
                      <p className="flex-1">{user.name}</p>
                      <p className="flex-1 pr-6">{review.text}</p>
                      <p className="flex-1">{review.rating}</p>
                      <div className="flex-1">
                        <span
                          onClick={() => handleDeleteReview(user.uid, review.reviewId)}
                          className="cursor-pointer hover:text-[var(--color-text-light)]"
                        >
                          {t("Dashboard.Delete")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            You are not authorized to view this page, please login with an admin account
          </h1>
        </>
      )}
    </div>
  )
}
