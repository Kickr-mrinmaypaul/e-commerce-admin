// import React from 'react'

// export default function FilterButton({title}:{title : string}) {
//   return (
//     <div>
//         <button className='bg-[#4EA674] text-[13px] text-[#FFFFFF] px-3 py-0.5 rounded-sm text-center'>{title}</button>
//     </div>
//   )
// }

'use client';

import { useState } from "react";
import { Filter } from "lucide-react";
import { IoFilterOutline } from "react-icons/io5";


type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;               // default label
  options: Option[];
  onSelect: (value: string) => void;
  value?: string;
};

export default function FilterButton({
  title = "Filter",
  options,
  onSelect,
  value,
}: Props) {

  const [open, setOpen] = useState(false);
  const selectedLabel =
  options.find(o => o.value === value)?.label || title

  const handleSelect = (opt: Option) => {
    onSelect(opt.value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer gap-2 bg-[#4EA674] text-[13px] text-white px-3 py-1 rounded-sm"
      >
        
        {selectedLabel}
        <IoFilterOutline size={14} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1 bg-white border shadow-md rounded-sm z-50 w-40">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
