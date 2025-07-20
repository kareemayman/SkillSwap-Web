import React from "react";
import logo from "../assets/images/skill.png";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <header className="border-[var(--color-card-border)] border-b-2 border-solid shadow-md" >
      <div className="py-4 mx-auto container px-4 sm:px-0 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-end gap-1">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl">SkillSwap</h1>
          </div>
        </Link>
        <div className="flex gap-1">{children}</div>
      </div>
    </header>
  );
}
