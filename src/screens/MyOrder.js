import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Review from "../components/Review";

export default function MyOrder() {
  const [fooditem, setFooditem] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/order")
      .then((response) => {
        setFooditem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>

      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <button
        className="px-4 py-2 bg-black bold text-white rounded-md hover:bg-green-600 mr-4"
        onClick={handleButtonClick}
      >
        Add Review
      </button>
      <button onClick={handleClosePopup}>Close</button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Review onClose={handleClosePopup} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fooditem.map((foodItem) => (
          <div
            key={foodItem._id}
            className="border-b-1 border-solid border-gray"
          >
            <div className="p-4 flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{foodItem.name}</h2>
                <p className="text-gray-600 mb-1">Phone: {foodItem.phone}</p>
                <p className="text-gray-600 mb-1">User ID: {foodItem.userId}</p>
                <p className="text-gray-600 mb-1">Table: {foodItem.table}</p>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cart Items:</h3>
                  {(foodItem.cartItem || []).map((cartItem, index) => (
                    <div key={index}>
                      <p className="text-gray-600 mb-1">
                        Name: {cartItem.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
