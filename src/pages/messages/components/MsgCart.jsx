import React from "react";

export default function MsgCart({ data }) {
  return (
    <div
      className={`flex justify-between  p-4 rounded-lg shadow-md gap-8 flex-wrap w-full items-center 
        ${data.unread ? "dark:bg-gray-200 bg-[var(--bg-color1)] " : "usercard "} `}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-[var(--color-card-border)]">
          <img src={data.pic} className="w-full h-full rounded-full object-cover" />
        </div>
        <div>
          <h2
            className={`font-bold ${
              data.unread
                ? "text-black "
                : "text-[var(--color-text-primary)]"
            }`}
          >
            {data.name}
          </h2>
          <p
            className={`${
              data.unread ? "text-[#1c1d1d]" : "text-[var(--color-text-secondary)] "
            }`}
          >
            {data.msg}
          </p>
        </div>
      </div>
      <span className={`${data.unread ? "text-[#1c1d1d]" : "text-[var(--color-text-secondary)]"}`}>{data.time}</span>
    </div>
  );
}
