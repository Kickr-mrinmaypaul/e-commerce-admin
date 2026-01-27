import React from 'react'

export default function FilterButton({title}:{title : string}) {
  return (
    <div>
        <button className='bg-[#4EA674] text-[13px] text-[#FFFFFF] px-3 py-0.5 rounded-sm text-center'>{title}</button>
    </div>
  )
}
