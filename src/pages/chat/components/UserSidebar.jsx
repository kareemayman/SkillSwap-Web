import img from "../../../assets/images/profile.png";

export default function UserSidebar({ user }) {
  return (
    <div className="w-80 p-6  hidden md:block" style={{borderLeft: "3px solid var(--color-card-border)"}}>
      <div className="text-center">
        <img
          src={user?.photoURL || img}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold mt-2">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.title || "Skill User"}</p>
        <p className="text-xs text-gray-400 mt-1">Joined {user?.joinedYear || "2025"}</p>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Skills</h4>
        {user?.skills?.map((skill, i) => (
          <div key={i} className="mb-1 px-3 py-1 border rounded bg-white text-sm">
            {skill}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-1">About</h4>
        <p className="text-sm text-gray-700">{user?.about}</p>
      </div>
    </div>
  );
}
