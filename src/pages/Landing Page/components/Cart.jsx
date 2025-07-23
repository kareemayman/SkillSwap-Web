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
        rounded-[18px] p-6 w-full h-full flex flex-col gap-6
        ${!withoutBorder ? "border border-[var(--color-card-border)]" : ""}
        backdrop-blur-md
        shadow-lg
        glass-card
      `}
      style={{ backgroundColor: 'var(--color-card-content-bg)' }}
    >
      {isIcon ? (
        <div className="p-3  rounded-full w-12 h-12 flex items-center justify-center bg-[var(--color-btn-submit-bg)]">
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
          className="w-full h-48 object-cover rounded-lg mb-2 "
        />
      )}

      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
      <p className="text-[var(--color-text-secondary)] leading-relaxed">
        {desc}
      </p>

      <div className="mt-auto pt-4">
        <button className="px-4 py-2 bg-[var(--color-btn-submit-bg)] text-[var(--color-text-light)] font-medium rounded-lg hover:shadow hover:bg-[var(--color-btn-submit-hover)] transition duration-200 text-sm p-2">
          Learn More
        </button>
      </div>
    </div>
  );
}