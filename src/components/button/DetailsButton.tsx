import React from 'react'

type ButtonProps = {
  title: string;
//   onClick?: () => void;
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
  className?: string;
};

export default function DetailsButton(
  {
    title,
    className= ""
  }:ButtonProps
) {
  return (
    <div>
        <button className={`text-[11px] text-[#003BFF] px-3 py-0.25 cursor-pointer border rounded-full shadow text-center items-center ${className}`}>
            {title}
        </button>
    </div>
  )
}
