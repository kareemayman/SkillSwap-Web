import React from 'react'

export const Tag = ({ children }) => {
  return (
    <p className='flex justify-center items-center bg-[#E8EDF5] p-4 py-2 rounded-lg w-fit text-center cursor-pointer transition-all duration-300 hover:bg-[#6A8FD9]'>{children}</p>
  )
}
