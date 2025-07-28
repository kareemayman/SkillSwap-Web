import { Link } from "react-router-dom"; 

export default function UserCard({ user }) {
  const hasSkillsText =
    user.hasSkills?.map((skill) => `${skill.skillName} (${skill.skillLevel})`).join(", ") || "—";

  const needSkillsText =
    user.needSkills?.map((skill) => `${skill.skillName} (${skill.skillLevel})`).join(", ") || "—";

  return (
    <div className="flex justify-between usercard border-[var(--color-card-border)] rounded-lg shadow-lg gap-8 flex-wrap w-full items-center p-4 mb-4">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-[var(--color-card-border)]"
        />
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            {user.name}
          </h3>

          {user.location && (
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              📍 {user.location.city}, {user.location.country}
            </p>
          )}

          {user.rating && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Rating:{" "}
              <span className="text-yellow-600">
                {user.rating ? `⭐ ${user.rating.toFixed(1)}` : "—"}
              </span>
            </p>
          )}

          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            <strong>Offering:</strong> {hasSkillsText}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            <strong>Desiring:</strong> {needSkillsText}
          </p>
        </div>
      </div>

      {/* ✅ View Profile Button with Link */}
      <Link to={`/profile/${user.uid}`}>
        <button className="text-[var(--color-text-light)] bg-[var(--color-btn-submit-bg)] rounded-md shadow-sm hover:bg-[var(--color-btn-submit-hover)] px-4 py-2">
          View Profile
        </button>
      </Link>
    </div>
  );
}
