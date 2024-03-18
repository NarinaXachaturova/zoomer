import React, { useRef } from "react";

/* Product */
import Product from "../products/Product";

/* Icons */
import PrevSlideIcon from "../icons/PrevSlideIcon";
import NextSlideIcon from "../icons/NextSlideIcon";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DefaultSlider({ products, title }) {
  if (!products) {
    return null;
  }

  const settings = {
    arrows: false,
    dots: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const sliderRef = useRef(null);

  return (
    <div className="relative mt-[50px]">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-10 flex justify-center items-center cursor-pointer rounded-full shadow-md">
        <button onClick={goToPrev}>
          <PrevSlideIcon />
        </button>
      </div>
      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-10 flex justify-center items-center cursor-pointer rounded-full shadow-md">
        <button onClick={goToNext}>
          <NextSlideIcon />
        </button>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
}
