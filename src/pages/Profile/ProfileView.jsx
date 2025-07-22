import React from "react";

export default function ProfileView({ data }) {
  return (
    <div>
      <p>ProfileView</p>

      {Object.entries(data ?? {}).map(([key, value], index) => (
        <div key={index} className="mb-2 flex">
          <p className="font-semibold capitalize">{key}:&nbsp;</p>
          <p>{JSON.stringify(value)}</p>
        </div>
      ))}
    </div>
  );
}
