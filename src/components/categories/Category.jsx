import React from "react";

export default function Category({ category, onSelectCategory }) {
  const handleClick = () => {
    onSelectCategory(category.name);
  };

  return (
    <div onClick={handleClick}>
      <div className="flex items-center gap-2 cursor-pointer py-[13px] hover:bg-lightgrey border-b px-[20px]">
        <span className="text-[12px] text-[#626262] font-bold">
          {category.name}
        </span>
      </div>
    </div>
  );
}
