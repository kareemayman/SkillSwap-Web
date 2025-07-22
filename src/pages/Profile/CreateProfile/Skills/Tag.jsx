import React from "react"

export const Tag = ({ children, onClick }) => {
  return (
    <p
      onClick={onClick}
      className="flex justify-center items-center bg-[#E8EDF5] hover:bg-red-600 p-4 py-2 rounded-lg w-fit hover:text-white text-center capitalize transition-all duration-300 cursor-pointer"
    >
      {children}
    </p>
  )
}
