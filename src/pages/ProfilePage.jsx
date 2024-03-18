import React from "react";

import { useState, useEffect } from "react";

/* Sidebar */
import Sidebar from "../components/sidebar/Sidebar";

/* Page */
import WishList from "../components/userInfo/WishListPage";
import Logout from "../pages/Logout";
import Profile from "../components/userInfo/ProfilePage";
import Purchase from "../components/userInfo/PurchasePage";

export default function ProfilePage() {
  const [selectedPage, setSelectedPage] = useState(
    localStorage.getItem("selectedPage") || null
  );

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  return (
    <div className="custom-container flex flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <Sidebar onItemClick={setSelectedPage} />
        </div>

        <div className="w-full h-full">
          {selectedPage === "Profile" && <Profile />}
          {selectedPage === "Purchase" && <Purchase />}
          {selectedPage === "Wishlist" && <WishList />}
          {selectedPage === "Logout" && <Logout />}
        </div>
      </div>
    </div>
  );
}
