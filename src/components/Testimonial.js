import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    setBgColor(getRandomLightHexColor());
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/review")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);
  function getRandomLightHexColor() {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;

    const hexColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    return hexColor;
  }

  const settings = {
    infinite: true,
    slidesToShow: 5,
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
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {reviews.map((userrev, index) => (
            <div key={index} className="p-4">
              <div
                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-60 flex flex-col justify-between"
                style={{ backgroundColor: bgColor }}
              >
                <div className="flex-grow">
                  <p className="italic text-lg text-gray-700 mb-4">
                    "{userrev.review}"
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="text-gray-900 font-semibold">
                    {userrev.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
