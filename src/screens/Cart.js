import React, { useState, useEffect } from "react";
import { useContext, useReduce } from "react";
import { CartContext } from "../context/Cart";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Counter from "../components/Counter";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

export const Cart = (items) => {
  const cart = useContext(CartContext);
  const total = cart.items.reduce((a, b) => a + b.price, 0);
  console.log("Cart :", cart);
  return (
    <>
      <Header />
      <div>
        <h1>Cart Items</h1>
        {cart &&
          cart.items.map((item) => (
            <li>
              {item.name} - ${item.price}
            </li>
          ))}
        <h5>Total Price: ${total}</h5>
      </div>

      <Footer />
    </>
  );
};

export default Cart;