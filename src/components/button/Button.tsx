import React from 'react'

type ButtonProps = {
  title: string;
//   onClick?: () => void;
//   variant?: "primary" | "secondary" | "outline";
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
  icon?: string
  className?: string;
  onClick?: () => void; 
};

export default function Button(
    {
        title,
        icon,
        className="",
        onClick,
    }: ButtonProps
) {
  return (
    
    <button 
    onClick={onClick} 
    className={`
    flex items-center gap-1
    text-[10px] font-medium text-white
    cursor-pointer
    bg-[#003BFF]
    px-4 py-1
    rounded-xl
    ${className}
    `}>
        {icon && (
            <img 
            className="w-3 h-3 object-contain text-white"
            src={icon} alt="icon" />
        )}
        {title}
    </button>
   
  )
}
