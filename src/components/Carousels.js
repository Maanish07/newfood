import React from "react";
import Carousel from "react-bootstrap/Carousel";

export const Carousels = () => {
  return (
    <>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className=""
            src="https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <button ClassName="px-4 py-1.5 text-bold border border-gray-300 bg-Red-800 hover:bg-red-500 hover : text-white rounded-md shadow-md">
              Get Best Offers
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dqwgwb6gd/image/upload/v1722076619/fycuijm9att30bktghy7.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
