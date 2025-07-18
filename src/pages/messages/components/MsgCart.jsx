import React from "react";

export default function MsgCart({ data }) {
  return (
    <div className="flex justify-between bg-[var(--color-card-content-bg)] border-[var(--color-card-border)] p-4 rounded-lg shadow-md gap-8 flex-wrap w-full items-center">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-[var(--color-card-border)] ">
          <img src={data.pic} />
        </div>
        <div>
          <h2 className="text-[var(--color-text-primary)] font-bold">{data.name}</h2>
          <p className="whitespace-normal text-[var(--color-text-secondary)]">{data.msg}</p>
        </div>
      </div>
      <span>{data.time}</span>
    </div>
  );
}
