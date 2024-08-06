import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Counter from "../components/Counter";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "razorpay";

import Tabs from "../components/Tabs";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const natigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (sum, foodItem) => sum + foodItem.price * quantity,
    0
  );
  const [order, setOrder] = useState({
    name: "",
    phone: "",
    table: "",
    cartItems: cartItems,
    user_Id: "",
  });

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleRemove = (foodItem) => {
    dispatch(removeItem(foodItem));
  };
  console.log("cartItems", { cartItems });
  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleRepeat = (foodItem) => {
    dispatch(addItem(foodItem));
  };

  const handlePlace = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/payment", {
        amount: total,
      });
      console.log(data);
      initPayment(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const initPayment = (data) => {
    const options = {
      key_id: "rzp_test_y2KlnwPCrKqlwr",
      amount: data.amount,
      currency: "INR",
      name: "The Night Manager",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verify = "http://localhost:4000/verify";
          const { data } = await axios.post(verify, {
            ...response,
            cartItems,
            user,
          });
          // const adminOrderEndpoint = "http://localhost:4000/order";
          // const orderData = {
          //   name: user.name,
          //   phone: user.phone,
          //   table: 3,
          //   cartItems,
          //   user_Id: user.id,
          //   payment_id: response.razorpay_payment_id,
          //   order_id: response.razorpay_order_id,
          //   signature: response.razorpay_signature,
          //   amount: data.amount,
          // };
          // const adminResponse = await axios.post(adminOrderEndpoint, orderData);
          // console.log(adminResponse.data);
          // console.log(data);
          dispatch(clearCart());
          natigate("/myorder");
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "7352380611",
      },
      notes: {
        address: "Customer Address",
      },

      theme: {
        color: "#000",
      },
    };
    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };
  const handleCheck = () => {};

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-gray-700"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-gray-700"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-gray-700"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium text-gray-700"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((foodItem) => (
                <tr key={foodItem._id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {foodItem.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <Counter value={quantity} onChange={handleQuantityChange} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ₹ {foodItem.price * quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      className="px-4 py-2  text-white rounded "
                      onClick={() => handleRemove(foodItem)}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/10514/10514406.png"
                        className="w-10 h-10"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <h5 className="text-lg font-semibold">Total Price: ₹{total}</h5>
        </div>
        <Tabs />
        <h1>{user ? `Hello, ${user}` : "Hello, Guest"}</h1>
        <div>
          <button
            className="px-4 py-2 bg-black bold text-white rounded-md hover:bg-green-600 mr-4"
            onClick={handlePlace}
          >
            Place Order
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={handleClear}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Cart;
