import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

/* Category */
import Category from "./Category";

/* Services */
import { getCategories } from "../../services/services";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectCategory = async (categoryName) => {
    navigate(`/products?categoryName=${categoryName}`);
  };

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
