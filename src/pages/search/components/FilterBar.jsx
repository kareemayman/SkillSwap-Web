import React from "react";

const filters = [
  { label: "Skills Offered" },
  { label: "Skills Desired" },
];

export default function FilterBar({ selected, onFilterClick }) {
  return (
    <div className="flex gap-4 my-4 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => onFilterClick(filter.label)}
          className={`  text-white rounded-md shadow-sm px-4 py-1 btn-gradient ${
            selected === filter.label
              ? "bg-[var(--color-btn-submit-hover)]"
              : "bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
