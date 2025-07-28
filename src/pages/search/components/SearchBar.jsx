import React from 'react'

export default function SearchBar({value, onChange}) {
  return (
    <>
      <input type="text" value={value} onChange={onChange} placeholder='Search by user name or skills...' 
      className='w-full border-neutral-950 focus:border-[var(--color-card-content-border)] bg-[var(--input-bg)] text-[var(--color-text-primary)] rounded-md shadow-sm   '
      
      />
    </>
  )
}
