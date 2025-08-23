import React from "react";
import { LuSquarePen } from "react-icons/lu";

export default function EditButton({ title, onClickHandler, classes = "" }) {
  return (
    <button
      title={title}
      className={
        classes +
        " p-1.5 rounded-full shadow-lg bg-[--main-color] text-[--color-text-light] hover:bg-[--color-text-light] hover:text-[--color-btn-submit-bg] transition-colors"
      }
      onClick={onClickHandler}
    >
      <LuSquarePen size={16} />
    </button>
  );
}
