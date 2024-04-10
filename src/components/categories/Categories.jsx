import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Category from "./Category";

import { getCategories } from "../../services/services";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error("Response data is not an array");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectCategory = async (categoryName) => {
    navigate(`/products?categoryName=${categoryName}`);
  };

  if (error) {
    return <div>error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col w-[240px] rounded-[12px] border">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onSelectCategory={handleSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}
