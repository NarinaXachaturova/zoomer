import React from "react";

import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigation = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigation("/");
  };

  return (
    <div className="mt-10 ml-5 mb-[100px]">
      <div className="flex items-center justify-center mt-10">
        <div className="flex items-center flex-col gap-4">
          <span className="font-bold text-2xl">
            Are you sure you want to log out?
          </span>

          <button
            onClick={handleLogOut}
            className="bg-primary text-white rounded-md px-[100px] py-[10px]"
            children={"Logout"}
          />
        </div>
      </div>
    </div>
  );
};

export default Logout;
