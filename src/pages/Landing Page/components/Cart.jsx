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
        rounded-[18px] p-6 w-full h-full flex flex-col gap-6  glass-card
        ${!withoutBorder ? "" : ""}
        backdrop-blur-md
       shadow-[0_0_10px_0_rgba(0,0,0,0.2)]
       hover:scale-95 transition-transform duration-300 border border-[var(--color-card-border)]
       
       
      `}
    >
      {isIcon ? (
        <div className="p-3  rounded-full w-12 h-12 flex items-center justify-center dark:bg-[var(--color-btn-submit-bg)] bg-transparent ">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-6 h-6 text-red-500"
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
      <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
        {desc}
      </p>

      <div className="mt-auto pt-4">
        <button className="px-4 py-2 bg-[var(--color-btn-submit-bg)]  text-white font-medium rounded-lg hover:shadow hover:bg-[var(--color-btn-submit-hover)] transition duration-200 text-sm p-2">
          Learn More
        </button>
      </div>
    </div>
  );
}