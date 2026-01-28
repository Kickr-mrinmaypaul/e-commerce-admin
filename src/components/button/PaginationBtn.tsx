import React from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationBtnProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationBtn({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationBtnProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="p-1 text-[#00000061] text-[15px] cursor-pointer"
      >
        <FaAngleLeft />
      </button>

      <span className="text-sm font-medium text-[#00000061] text-[15px]">
        {page} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="p-1 text-[#00000061] text-[15px] cursor-pointer"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
