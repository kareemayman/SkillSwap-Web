import logo from "../assets/images/skill.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaComments, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { useState } from "react";

export default function Header() {
  const { user, logOut } = useAuth();
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-sm shadow-[var(--color-card-border)]">
      <div className="py-4 mx-auto container px-2 md:px-4 flex items-center relative">
        {/* Logo on the left */}
        <Link to="/">
          <div className="flex items-end gap-1">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl text-[#FE7743]">Swapoo</h1>
          </div>
        </Link>

        {/* Right side: Nav + Language */}
        <div className="ml-auto flex items-center gap-3">
          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-3 items-center text-[var(--color-text-primary)]">
            {user ? (
              <>
                <NavLink
                  to="/explore"
                  className="hover:text[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 font-medium"
                >
                  Explore
                </NavLink>
                <NavLink
                  to="/messages"
                  className="text-xl transition-transform duration-200 hover:scale-110"
                  title="Messages"
                >
                  <FaComments />
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
                  <HiUserCircle className="text-2xl" />
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

          {/* Language Button - Always Visible */}
          <button
            onClick={() =>
              i18n.language === "en"
                ? i18n.changeLanguage("ar")
                : i18n.changeLanguage("en")
            }
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] hover:bg-[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 font-bold"
            title="Change Language"
            style={{ fontFamily: "'Amiri', serif", fontWeight: "bold" }}
          >
            {i18n.language === "en" ? "ع" : "EN"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden text-xl z-20"
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
                <NavLink to="/explore" onClick={() => setMenuOpen(false)}>Explore</NavLink>
                <NavLink to="/messages" onClick={() => setMenuOpen(false)}>Messages</NavLink>
                <NavLink to="/search" onClick={() => setMenuOpen(false)}>Search</NavLink>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
                <button onClick={() => { logOut(); setMenuOpen(false); }} className="text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
