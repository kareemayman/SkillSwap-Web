import logo from "../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaComments, FaSearch, FaSignOutAlt, FaBell } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { Children, use, useEffect, useState } from "react";
import { subscribeToUserChats } from "../utils/chatUtil";
import useFirestoreGet from "../hooks/useFirestoreGet";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { createTheme, Dropdown, DropdownItem } from "flowbite-react";
import { TbArrowsExchange } from "react-icons/tb";
import { RiExchangeBoxFill, RiExchangeBoxLine, RiExchangeLine, RiExchangeFill } from "react-icons/ri";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const { user, logOut } = useAuth();
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: userProfile, loading, error, request } = useFirestoreGet();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (!user?.uid) return;

    request("users", user.uid);

    // subscribe to notifications

    const unsub = subscribeToUserChats(user.uid, (chats) => {
      const count = chats.filter((chat) => {
        const msg = chat.lastMessage;
        return msg && msg.senderId !== user.uid && (!msg.readBy || !msg.readBy.includes(user.uid));
      }).length;
      setUnreadCount(count);
    });

    return () => {
      unsub();
    };
  }, [user?.uid]);

  return (
    <header className="shadow-md dark:shadow-[var(--color-card-border)] shadow-[#68482f91]">
      <div className="py-4 mx-auto container px-2 md:px-4 flex items-center justify-between relative">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-end gap-1">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl text-[var(--main-color)] ">Swapoo</h1>
          </div>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-3 pl-4 ml-4">
          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-3 items-center text-[var(--color-text-primary)]">
            {user ? (
              <>
                <NavLink to="/explore" className="hover:text-[var(--main-color)] transition-transform duration-200 hover:scale-110 font-medium">
                  Explore
                </NavLink>

                {user?.email === "skills.swap.app@gmail.com" && (
                  <NavLink to="/dashboard" className="hover:text-[var(--main-color)] transition-transform duration-200 hover:scale-110 font-medium">
                    Dashboard
                  </NavLink>
                )}

                <NavLink to="/messages" className="relative text-xl transition-transform duration-200 hover:scale-110" title="Messages">
                  <FaComments />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>

                {/* <button className="text-xl transition-transform duration-200 hover:scale-110" title="Search">
                  <FaBell />
                </button> */}

                {/* <Notifications>
                  <div className="relative text-xl transition-transform duration-200 hover:scale-110" title="Notifications">
                    <FaBell size={20} />

                    <span class="sr-only">Notifications</span>
                    <div class="absolute inline-flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-red-500 rounded-full -top-2 -end-2 z-40">
                      20
                    </div>
                  </div>
                </Notifications> */}

                <NotificationDropdown />

                <NavLink to="/search" className="text-xl transition-transform duration-200 hover:scale-110" title="Search">
                  <FaSearch />
                </NavLink>

                <NavLink to={`/profile/${user?.uid}`} title="Profile" className="transition-transform duration-200 hover:scale-110">
                  {userProfile?.profilePicture ? (
                    <img src={userProfile.profilePicture} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                  ) : (
                    <HiUserCircle className="text-2xl" />
                  )}
                </NavLink>

                <button onClick={logOut} title="Logout" className="text-xl transition-transform duration-200 hover:rotate-12 hover:text-red-500">
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="transition-all duration-200 hover:text-[var(--color-accent)]">
                  Login
                </NavLink>
                <NavLink to="/register" className="transition-all duration-200 hover:text-[var(--color-accent)]">
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Language Switch Button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-10 h-10 btn-gradient flex items-center justify-center rounded-full bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] hover:bg-[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 text-lg"
            title="Toggle Theme"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          <button
            onClick={toggleLanguage}
            className="w-10 h-10 flex btn-gradient items-center justify-center rounded-full bg-[var(--color-btn-submit-bg)] dark:text-[var(--color-text-light)] text-white hover:bg-[var(--color-btn-submit-hover)] transition-transform duration-200 hover:scale-110 font-bold"
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
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black  text-[var(--color-text-primary)] shadow-md p-4 flex flex-col gap-4 sm:hidden z-30">
            {user ? (
              <>
                <NavLink to="/explore" onClick={() => setMenuOpen(false)}>
                  Explore
                </NavLink>
                <NavLink to="/messages" onClick={() => setMenuOpen(false)}>
                  Messages {unreadCount > 0 && <span className="ml-1 text-red-400">({unreadCount})</span>}
                </NavLink>

                {/* <Notifications>
                  <button>
                    Notifications
                    <span class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-white bg-red-500 rounded-full ">
                      2
                    </span>
                  </button>
                </Notifications> */}

                <NotificationDropdown iconOrText="text" />

                <NavLink to="/search" onClick={() => setMenuOpen(false)}>
                  Search
                </NavLink>
                <NavLink to={`/profile/${user?.uid}`} onClick={() => setMenuOpen(false)}>
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

// function Notifications({ children }) {
//   const t = createTheme({
//     arrowIcon: "ml-2 h-4 w-4",
//     content: "py-1 focus:outline-none",
//     floating: {
//       animation: "transition-opacity",
//       arrow: {
//         base: "absolute z-10 h-2 w-2 rotate-45",
//         style: {
//           dark: "bg-gray-900",
//           light: "bg-white",
//           auto: "bg-white",
//         },
//         placement: "-4px",
//       },
//       base: "z-30 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
//       content: "py-1 text-sm ",
//       divider: "my-1 w-full h-0.5 bg-[--color-text-primary]",
//       header: "block px-4 py-2 text-sm ",
//       hidden: "invisible opacity-0",
//       item: {
//         container: "",
//         base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm md:text-base hover:bg-[#c9ae93] hover:text-[--dropdown-bg] focus:bg-[--color-text-primary] focus:outline-none",
//         icon: "mr-2 h-4 w-4",
//       },
//       style: {
//         dark: "bg-[--dropdown-bg] text-[--color-text-primary]",
//         light: "bg-[--dropdown-bg] text-[--color-text-primary]",
//         auto: "bg-[--dropdown-bg] text-[--color-text-primary] ",
//       },
//       target: "w-fit",
//     },
//     inlineWrapper: "flex items-center",
//   });

//   return (
//     <Dropdown
//       label={<>{children}</>}
//       dismissOnClick={false}
//       inline={true}
//       placement="bottom-end"
//       // className="z-30 w-60"
//       theme={t}
//       applyTheme={{ arrowIcon: "replace", content: "replace", floating: "replace", inlineWrapper: "replace" }}
//       // style={{ minWidth: "200px", backgroundColor: "cyan" }}
//       arrowIcon={false}
//       // trigger="hover"
//     >
//       <DropdownItem>
//         <div className="w-full flex flex-col gap-2">
//           <div className="flex items-center justify-between">
//             <div className="flex gap-2">
//               <p>notification title</p>
//               <p>time</p>
//             </div>

//             <button>mark as read</button>
//           </div>

//           <p className="text-start">someone sent you a request to start trading skills with you</p>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <p>your skill</p>
//               <TbArrowsExchange size={26} />
//               <p>their skill</p>
//             </div>

//             <div>
//               <button>Accept</button>
//               <button>Decline</button>
//             </div>
//           </div>
//         </div>
//       </DropdownItem>
//       <DropdownItem
//       // icon={() => (
//       //   <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//       //     <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
//       //   </svg>
//       // )}
//       >
//         Settings
//       </DropdownItem>
//       <DropdownItem>Earnings</DropdownItem>
//       <DropdownItem>Sign out</DropdownItem>
//     </Dropdown>
//   );
// }
