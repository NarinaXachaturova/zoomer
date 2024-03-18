import React, { useState } from "react";

const ProfileSidebar = ({ onItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (page) => {
    onItemClick(page);
    setSelectedItem(page);
  };

  return (
    <div className="pl-[100px] pb-[300px]">
      <ul className="flex flex-col gap-5 p-4 cursor-pointer">
        <li
          onClick={() => handleItemClick("Logout")}
          className={`text-lg ${
            selectedItem === "Logout"
              ? "font-bold text-orange-600"
              : "text-gray-600"
          }`}
        >
          გამოსვლა
        </li>

        <li
          onClick={() => handleItemClick("Profile")}
          className={`text-lg ${
            selectedItem === "Profile"
              ? "font-bold text-orange-600"
              : "text-gray-600"
          }`}
        >
          პროფილი
        </li>

        <li
          onClick={() => handleItemClick("Wishlist")}
          style={{
            fontWeight: selectedItem === "Wishlist" ? "bold" : "normal",
          }}
        >
          ვიშლისტი
        </li>

        <li
          onClick={() => handleItemClick("Purchase")}
          style={{
            fontWeight: selectedItem === "Purchase" ? "bold" : "normal",
          }}
        >
          შეკვეთები
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
