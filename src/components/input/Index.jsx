import React from "react";

const Input = ({ type, onChange, id, value, placeholder }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (onChange) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type={type || "text"}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      className="focus:outline-none text-base w-full px-[15px] py-[10px] rounded-[10px] bg-lightgrey"
    />
  );
};

export default Input;
