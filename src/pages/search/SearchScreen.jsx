import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { getAllUsers } from "../../utils/firestoreUtil";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import UserCard from "./components/UserCard";
import Header from "../../components/Header";
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
      <Header />
      <div className="container mx-auto py-6 px-4 md:px-16 ">
        <SearchBar value={searchText} onChange={handleSearchChange} />
        <FilterBar
          selected={selectedFilter}
          onFilterClick={handleFilterClick}
        />
        {loading ? (
          <div className="text-center mt-10 text-bkack text-lg">
            Loading users...
          </div>
        ) : paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => <UserCard key={user.uid} user={user} />)
        ) : (
          <div className="flex flex-col items-center mt-10 text-gray-600">
            <div className="w-64 h-64">
              <Lottie animationData={noUsersAnim} loop={true} />
            </div>
            <p className="text-xl font-semibold mt-4">No users found 😔</p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showIcons
            />
          </div>
        )}
      </div>
    </>
  );
}
