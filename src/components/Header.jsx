import logo from "../assets/images/skill.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

export default function Header() {
  const { user, logOut } = useAuth();
  const { i18n } = useTranslation();

  return (
    // <header className="border-[var(--color-card-border)] border-b-2 border-solid shadow-md">
    <header className="shadow-md">
      <div className="py-4 mx-auto container px-0 md:px-4 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-end gap-1">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl">SkillSwap</h1>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <NavLink to={"/profile"}>Profile</NavLink>
              <NavLink to={"/explore"}>Explore</NavLink>
              <NavLink to={"/messages"}>Messages</NavLink>
              <NavLink to={"/search"}>Search</NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          )}
          <Button
            value={
              <>
                <FaGlobe className="inline mr-2" />
                {i18n.language === "en" ? "Arabic" : "الانجليزيه"}
              </>
            }
            onPress={() =>
              i18n.language === "en"
                ? i18n.changeLanguage("ar")
                : i18n.changeLanguage("en")
            }
            customColors={{
              textColor: "var(--color-text-dark)",
              bgColor: "var(--color-skill-teach-bg)",
              hoverFillColor: "var(--color-btn-submit-bg)",
              hoverTextColor: "var(--color-text-light)",
            }}
          />
          {user && <button onClick={logOut}>Logout</button>}
        </div>
      </div>
    </header>
  );
}
