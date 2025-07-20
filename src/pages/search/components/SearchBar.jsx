import React from 'react'

export default function SearchBar({value, onChange}) {
  return (
    <>
      <input type="text" value={value} onChange={onChange} placeholder='Search...' 
      className='w-full border border-[var(--color-card-content-bg)] bg-[var(--color-card-content-bg)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] '
      
      />
    </>
  )
}
