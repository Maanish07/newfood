import { useState } from "react";
import React from "react";
import Header from "./Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Menumanage = () => {
  let navigate = useNavigate();
  const [menu, setMenu] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    veg: "",
    bestsellers: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/menuitem",
        {
          image: menu.image,
          name: menu.name,
          price: menu.price,
          description: menu.description,
          veg: menu.veg,
          bestsellers: menu.bestsellers,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("menu added", menu).then((rs) => {
        console.log(rs.data);
        navigate("/");
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  console.log(menu);
  return (
    <>
      <Header />
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
          Add Item
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >
          {" "}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Image
            </label>
            <input
              type="file"
              name="Image"
              id="Image"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="Number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="000"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              required=""
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label>Option</label>
            <div className="flex items-center ">
              <input
                checked
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
              <label
                for="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Veg
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
              <label
                for="default-radio-2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Non Veg
              </label>
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={handleChange}
            />
            <div className="relative w-11 h-6 bg-gray-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Best Sellers
            </span>
          </label>
          <button
            type="submit"
            className="w-full text-black bg-primary-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
        </form>
      </div>
    </>
  );
};
