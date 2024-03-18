import React from "react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

/* Buttons */
import Button from "../button/Button";

/* Services */
import { getPurchases } from "../../services/services";

export default function Purchase() {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getPurchases();
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateHomePageClick = () => {
    navigate(`/`);
  };

  return (
    <div className="container pt-10">
      <div className="flex flex-col md:flex-row items-center justify-between md:items-start md:justify-start md:flex-wrap gap-5">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex flex-col font-bold text-base md:text-lg gap-2 md:w-[300px] bg-lightgrey rounded-md p-4"
          >
            <p>
              <span>სულ გადახდილია: </span>
              {purchase.totalPrice} ₾
            </p>
            <p>
              <span>ნივთების რაოდენობა: </span>
              {purchase.totalItems}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center ml-[200px] mb-[100px]">
        <Button
          className="bg-primary text-white rounded-md"
          onClick={navigateHomePageClick}
        >
          დაიწყე ძებნა
        </Button>
      </div>
    </div>
  );
}
