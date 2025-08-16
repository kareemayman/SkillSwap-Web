import { useTranslation } from "react-i18next";
import img from "../../../assets/images/profile.png";
import { Link } from "react-router-dom"; 

export default function UserSidebar({ user }) {
    const { t }= useTranslation();

  return (
    <div className="w-80 p-6 bg-[--input-bg] hidden md:block border-l  border-gray-700 ">
      <div className="text-center">
      <Link to={`/profile/${user.uid}`}>
        <img
          src={user?.profilePicture || img}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto object-cover border shadow "
        />
      </Link>
        <h2 className="text-xl font-semibold mt-3 text-[var(--color-btn-submit-bg)] dark:text-[var(--main-color)]">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.title || "Skill User"}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">{t("chat.offer")} :</h4>
        <div className="flex flex-wrap gap-2">
          {user?.hasSkills?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-[--color-skill-teach-bg] text-black"
            >
              {skill.skillName || "No skills"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)]">{t("chat.desire")}:</h4>
        <div className="flex flex-wrap gap-2">
          {user?.needSkills?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-[--color-skill-learn-bg] text-black"
            >
              {skill.skillName || "No skills"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)]">{t("chat.about")}:</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">{user?.bio}</p>
      </div>
    </div>
  );
}
