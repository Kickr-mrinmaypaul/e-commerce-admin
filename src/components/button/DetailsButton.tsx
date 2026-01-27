import React from 'react'

export default function DetailsButton({title}: {title: string}) {
  return (
    <div>
        <button className={`text-[11px] text-[#003BFF] px-3 py-0.25 cursor-pointer border rounded-full shadow text-center items-center`}>
            {title}
        </button>
    </div>
  )
}
