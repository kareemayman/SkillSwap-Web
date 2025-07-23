import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { getAllUsers } from "../../utils/firestoreUtil";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import UserCard from "./components/UserCard";
import Lottie from "lottie-react";
import noUsersAnim from "../../assets/animations/NoDatafound.json";

export default function SearchScreen() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
      setLoading(false); // Finish loading
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleFilterClick = (label) => {
    setSelectedFilter((prev) => (prev === label ? null : label));
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const lowerSearch = searchText.toLowerCase();

    const nameMatch = user.name?.toLowerCase().includes(lowerSearch);
    const offeredMatch = user.hasSkills?.some((skill) =>
      skill.skillName.toLowerCase().includes(lowerSearch)
    );
    const desiredMatch = user.needSkills?.some((skill) =>
      skill.skillName.toLowerCase().includes(lowerSearch)
    );

    if (selectedFilter === "Skills Offered") {
      return offeredMatch;
    }

    if (selectedFilter === "Skills Desired") {
      return desiredMatch;
    }

    return nameMatch || offeredMatch || desiredMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className=" container container-[700px] mx-auto py-9 px-4 md:px-16 ">
        <SearchBar value={searchText} onChange={handleSearchChange} />
        <FilterBar
          selected={selectedFilter}
          onFilterClick={handleFilterClick}
        />
        {loading ? (
          <div className="text-center mt-10 text-black text-lg">
            Loading users...
          </div>
        ) : paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => <UserCard key={user.uid} user={user} />)
        ) : (
          <div className="flex flex-col items-center mt-10 text-gray-600">
            <div className="w-64 h-64">
              <Lottie animationData={noUsersAnim} loop={true} />
            </div>
            <p className="text-xl text-[var(--color-text-secondary)] font-semibold mt-4">No users found 😔</p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 ">

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showIcons
  theme={{
    base: "flex items-center -space-x-px h-10 text-sm",
    layout: {
      table: {
        base: "text-gray-500 dark:text-gray-400 bg-black",
        span: "text-sm font-normal text-gray-500 dark:text-gray-400",
      },
    },
    pages: {
      base: "flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "bg-gray-black-800  text-white hover:bg-gray-black-900 border border-gray-600 rounded-l-lg px-3 py-2",
        icon: "h-5 w-5",
      },
      next: {
        base: "bg-gray-black-800 text-white hover:bg-gray-black-900 border border-gray-600 rounded-r-lg px-3 py-2",
        icon: "h-5 w-5",
      },
      selector: {
        base: "bg-black border border-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-orange-500 font-medium px-3 py-2",
        active:
          "bg-orange-600 text-white hover:bg-orange-700 border-orange-600 z-10",
      },
    },
  }}
/>
          </div>
        )}
      </div>
    </>
  );
}
