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
        bg-white text-black rounded-lg shadow p-4 w-full h-full flex flex-col gap-3
        ${!withoutBorder ? "border border-[#DBDBDB]" : ""}
      `}
    >
      {isIcon ? (
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-[24px] h-[16px] text-[#141414]"
        />
      ) : (
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-[180px] object-cover rounded mb-2"
        />
      )}

      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-700">{desc}</p>
    </div>
  );
}
