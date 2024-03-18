import React, { useRef } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Icons */
import PrevSlideIcon from "../icons/PrevSlideIcon";
import NextSlideIcon from "../icons/NextSlideIcon";

/* Images */
import Image1 from "../../assets/Images/MainImage1.webp";
import Image2 from "../../assets/Images/MainImage2.webp";
import Image3 from "../../assets/Images/MainImage3.webp";
import Image4 from "../../assets/Images/MainImage4.webp";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: false,
    speed: 600,
    slidesToShow: 1,
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
    <div className="relative max-w-[895px]">
      <div className="flex justify-center items-center cursor-pointer absolute mt-[140px] left-2 z-10 rounded-full shadow-md">
        <button onClick={goToPrev}>
          <PrevSlideIcon />
        </button>
      </div>

      <div className="flex justify-center items-center cursor-pointer absolute mt-[150px] right-2 z-10 rounded-full shadow-md">
        <button onClick={goToNext}>
          <NextSlideIcon />
        </button>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {[Image1, Image2, Image3, Image4].map((main, index) => (
          <div key={index}>
            <img
              src={main}
              alt={`Image ${index + 1}`}
              style={{ width: "1000px", height: "320px" }}
              className="rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
