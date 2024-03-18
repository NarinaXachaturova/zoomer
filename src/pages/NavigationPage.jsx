import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

/* Category */
import Category from "../components/categories/Category";

/* Services */
import { getCategories, getProducts } from "../services/services";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div className="container pb-[300px]">
      <div className="pb-[30px] mb-[30px]">
        <h1 className="text-primary text-[20px] font-bold">ყველა კატეგორია</h1>
      </div>

      <div className="flex justify-between">
        {categories.map((category) => (
          <Category
            onSelectCategory={handleSelectCategory}
            category={category}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
