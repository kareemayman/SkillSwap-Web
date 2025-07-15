import React from "react";

export default function Cart({
  imgSrc = "",
  imgAlt = "",
  title = "",
  desc = "",
  isIcon = false,
  withoutBorder = false,
}) {
  return (
    <div
      className={`
        rounded-[18px] p-6 w-full h-full flex flex-col gap-4
        ${!withoutBorder ? "border border-[var(--color-card-border)]" : ""}
        bg-[var(--color-card-bg)]
        backdrop-blur-md
        shadow-lg
      `}
      // style={{ backgroundColor: 'var(--color-card-content-bg)' }}
    >
      {isIcon ? (
        <div className="p-3 bg-[var(--color-skill-teach-bg)] rounded-full w-12 h-12 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-6 h-6"
          />
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-48 object-cover rounded-lg mb-2 border border-[var(--color-card-content-border)]"
        />
      )}

      <h3 className="text-xl font-bold text-black]">{title}</h3>
      <p className="text-[var(--color-text-secondary)] leading-relaxed">
        {desc}
      </p>

      <div className="mt-auto pt-4">
        <button className="px-4 py-2 bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] font-medium rounded-lg hover:shadow transition duration-200 text-sm">
          Learn More
        </button>
      </div>
    </div>
  );
}