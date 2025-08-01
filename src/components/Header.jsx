import logo from "../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaTimes,
  FaComments,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { use, useEffect, useState } from "react";
import { subscribeToUserChats } from "../utils/chatUtil";
import useFirestoreGet from "../hooks/useFirestoreGet";

export default function Header() {
  const { user, logOut } = useAuth();
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: userProfile, loading, error, request } = useFirestoreGet();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (!user?.uid) return;

    const unsub = subscribeToUserChats(user.uid, (chats) => {
      const count = chats.filter((chat) => {
        const msg = chat.lastMessage;
        return (
          msg &&
          msg.senderId !== user.uid &&
          (!msg.readBy || !msg.readBy.includes(user.uid))
        );
      }).length;
      setUnreadCount(count);
    });

    return () => unsub();
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      request("users", user.uid); // Assumes user data is stored in a "users" collection
    }
  }, [user?.uid]);

  return (
    <header className="shadow-sm shadow-[var(--color-card-border)]">
      <div className="py-4 mx-auto container px-2 md:px-4 flex items-center justify-between relative">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-end gap-1">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl text-[#FE7743] ">Swapoo</h1>
          </div>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-3   pl-4 ml-4">
          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-3 items-center text-[var(--color-text-primary)]">
            {user ? (
              <>
                <NavLink
                  to="/explore"
                  className="hover:text-[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 font-medium"
                >
                  Explore
                </NavLink>
                <NavLink
                  to="/messages"
                  className="relative text-xl transition-transform duration-200 hover:scale-110"
                  title="Messages"
                >
                  <FaComments />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/search"
                  className="text-xl transition-transform duration-200 hover:scale-110"
                  title="Search"
                >
                  <FaSearch />
                </NavLink>

                <NavLink
                  to="/profile"
                  title="Profile"
                  className="transition-transform duration-200 hover:scale-110"
                >
                  {userProfile?.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <HiUserCircle className="text-2xl" />
                  )}
                </NavLink>

                <button
                  onClick={logOut}
                  title="Logout"
                  className="text-xl transition-transform duration-200 hover:rotate-12 hover:text-red-500"
                >
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="transition-all duration-200 hover:text-[var(--color-accent)]"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="transition-all duration-200 hover:text-[var(--color-accent)]"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] hover:bg-[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 font-bold"
            title="Change Language"
            style={{ fontFamily: "'Amiri', serif", fontWeight: "bold" }}
          >
            {i18n.language === "en" ? "ع" : "EN"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden text-xl z-20 ml-2 text-[var(--color-text-primary)] hover:text-[var(--color-btn-submit-hover)] transition-transform duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
            title="Toggle Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-[var(--color-text-primary)] shadow-md p-4 flex flex-col gap-4 sm:hidden z-30">
            {user ? (
              <>
                <NavLink to="/explore" onClick={() => setMenuOpen(false)}>
                  Explore
                </NavLink>
                <NavLink to="/messages" onClick={() => setMenuOpen(false)}>
                  Messages{" "}
                  {unreadCount > 0 && (
                    <span className="ml-1 text-red-400">({unreadCount})</span>
                  )}
                </NavLink>
                <NavLink to="/search" onClick={() => setMenuOpen(false)}>
                  Search
                </NavLink>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    logOut();
                    setMenuOpen(false);
                  }}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
