import React from "react";

/* Slider */
import MainSlider from "../components/slider/MainSlider";

/* Products */
import Products from "../components/products/Products";

/* Categories */
import Categories from "../components/categories/Categories";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex lg:gap-[70px] sm:justify-center">
        <Categories />
        <MainSlider />
      </div>
      <Products />
    </div>
  );
}
