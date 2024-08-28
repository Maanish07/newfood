import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slick = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/menuitem")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const settingsForward = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const settingsBackward = {
    ...settingsForward,
    rtl: true,
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto w-[70rem] max-w-[90vw] flex flex-col gap-1 p-6 overflow-hidden fade-in">
        <Slider {...settingsForward}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center max-w-max gap-1 text-white text-lg text-bold bg-gray-800 rounded-lg p-3 mr-4 shadow-md shadow-black"
            >
              {item.name}
            </div>
          ))}
        </Slider>

        <Slider {...settingsBackward}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center max-w-max gap-1 text-gray-300 text-white text-lg text-bold bg-gray-800 rounded-lg p-3 mr-4 shadow-md shadow-black"
            >
              {item.name}
            </div>
          ))}
        </Slider>

        <Slider {...settingsForward}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center max-w-max gap-1 text-gray-300 text-white text-lg text-bold bg-gray-800 rounded-lg p-3 mr-4 shadow-md shadow-black"
            >
              {item.name}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slick;
