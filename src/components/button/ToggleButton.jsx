import React, { useState, useEffect } from "react";

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");

    return savedMode === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const body = document.body;

    if (isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div>
      <input
        style={{ display: "none" }}
        checked={isDarkMode}
        onChange={toggleTheme}
        type="checkbox"
        id="toggle"
      />

      <label
        className="toggle cursor-pointer font-bold text-gray-500 bg-white p-3 rounded-[30px]"
        htmlFor="toggle"
      >
        {isDarkMode ? "Dark" : "Light"}
      </label>
    </div>
  );
};

export default ToggleButton;
