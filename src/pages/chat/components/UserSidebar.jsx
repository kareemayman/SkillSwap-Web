import img from "../../../assets/images/profile.png";

export default function UserSidebar({ user }) {
  return (
    <div className="w-80 p-6 usercard hidden md:block border-l  border-gray-700 ">
      <div className="text-center">
        <img
          src={user?.profilePicture || img}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto object-cover border shadow "
        />
        <h2 className="text-xl font-semibold mt-3 text-[--color-btn-submit-bg]">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.title || "Skill User"}</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Offering:</h4>
        <div className="flex flex-wrap gap-2">
          {user?.hasSkills?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {skill.skillName || "No skills"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)]">Desiring:</h4>
        <div className="flex flex-wrap gap-2">
          {user?.needSkills?.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {skill.skillName || "No skills"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-[var(--color-text-primary)]">About:</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">{user?.bio}</p>
      </div>
    </div>
  );
}
