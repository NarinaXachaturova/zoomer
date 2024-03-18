import React from "react";

export default function Button({ onClick, className, children, icon }) {
  const buttonClasses = `flex justify-center items-center w-[130px] rounded-[12px] gap-[10px] text-[15px] py-2 px-2 cursor-pointer font-bold ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} type="button">
      {icon}
      {children}
    </button>
  );
}
