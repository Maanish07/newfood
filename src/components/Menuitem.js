import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Menuitem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    axios
      .get("http://localhost:4000/menuitem")
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const handleAddItem = (foodItem) => {
    const existingItem = cartItems.find((item) => item.id === foodItem.id);
    if (existingItem) {
      dispatch(addItem({ ...foodItem, quantity: existingItem.quantity + 1 }));
    } else {
      dispatch(addItem({ ...foodItem, quantity: 1 }));
    }
    toast.success(`${foodItem.name} added to cart!`);
  };

  const handleQuantityChange = (foodItem, quantity) => {
    if (quantity > 0) {
      dispatch(addItem({ ...foodItem, quantity }));
    } else {
    }
  };

  const handleCheckboxChange = (event) => {
    setShowVegOnly(event.target.checked);
  };

  const filteredItems = showVegOnly
    ? foodItems.filter((item) => item.veg)
    : foodItems;

  const handleSearch = () => {
    const filterItem = foodItems.filter((res) => res.name.includes(search));
    setFoodItems(filterItem);
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex flex-row items-center justify-between mb-4 px-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showVegOnly}
              onChange={handleCheckboxChange}
              id="showVegOnly"
              className="mr-2"
            />
            <label htmlFor="showVegOnly" className="text-gray-700">
              Veg
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="p-2 border border-gray-300 rounded mr-2"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="p-2 bg-black text-white rounded hover:bg-gray-800 transition"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {filteredItems.map((foodItem) => (
                <div
                  key={foodItem.id}
                  className="px-3 py-2 border border-gray-300"
                >
                  <div className="flex justify-between mb-2">
                    {foodItem.bestsellers && (
                      <span className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-sm font-medium text-black">
                        BestSellers
                      </span>
                    )}
                    {foodItem.veg && (
                      <div className="w-5 h-5">
                        <img
                          src="https://img.icons8.com/?size=64&id=119426&format=png"
                          alt="Veg Icon"
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={foodItem.image}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="w-100">
                        <span className="text-base font-bold leading-tight">
                          {foodItem.name}
                        </span>
                        <p className="title md-text16 md-f700 md-lh16">
                          ₹ {foodItem.price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        className={`pl-6 pr-6 pt-2 pb-2 bg-black text-white rounded ${
                          foodItem.quantity === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-blue-600 transition"
                        }`}
                        onClick={() => handleAddItem(foodItem)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Menuitem;
