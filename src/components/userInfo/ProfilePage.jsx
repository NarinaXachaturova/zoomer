import React, { useState, useEffect } from "react";

/* Services */
import { getUserDetails, updateUserDetails } from "../../services/services";

/* Button */
import Button from "../button/Button";

export default function Profile() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserDetails(userData);
      console.log("Profile updated successfully", response.data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const [updatedUserData, setUpdatedUserData] = useState(null);

  const fetchUpdatedUserData = async () => {
    try {
      const response = await getUserDetails();
      setUpdatedUserData(response.data);
      console.log("User data fetched successfully", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    if (updatedUserData === null) {
      fetchUpdatedUserData();
    }
  }, [updatedUserData]);

  return (
    <div className="container pt-[100px] pb-[100px] flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-[500px] flex flex-col gap-5">
        <form className="flex flex-col gap-y-4">
          <input
            type="text"
            name="phone_number"
            placeholder="ტელეფონის ნომერი"
            value={userData.phone_number}
            onChange={handleChange}
            className="focus:outline-none font-bold text-base w-full bg-lightgrey px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="first_name"
            placeholder="სახელი"
            value={userData.first_name}
            onChange={handleChange}
            className="focus:outline-none font-bold text-base w-full bg-lightgrey px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="last_name"
            placeholder="გვარი"
            value={userData.last_name}
            onChange={handleChange}
            className="focus:outline-none font-bold text-base w-full bg-lightgrey px-4 py-3 rounded-md"
          />
          <Button
            type="button"
            children="განახლება"
            onClick={handleUpdateProfile}
            className="text-white bg-primary w-full py-3 rounded-md"
          />
        </form>
      </div>

      {updatedUserData && (
        <div className="w-full md:w-[500px] flex flex-col gap-5 mt-5 md:mt-0 ml-11">
          <h2 className="font-bold text-[20px] mb-4">განახლებული ინფორმაცია</h2>
          <div className="bg-lightgrey rounded-md p-6 flex flex-col gap-4">
            <div className="flex items-center">
              <span className="font-bold mr-2">ტელეფონის ნომერი:</span>
              <span>{updatedUserData.phone_number}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-2">სახელი:</span>
              <span>{updatedUserData.first_name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-2">გვარი:</span>
              <span>{updatedUserData.last_name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
