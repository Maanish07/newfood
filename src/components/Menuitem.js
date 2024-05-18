import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Counter from "./Counter";
import { CartContext } from "../context/Cart";

export const Menuitem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cart = useContext(CartContext);

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

  const handleClick = (foodItem) => {
    console.log("this si the food item", foodItem);
    cart.setItems([
      ...cart.items,
      {
        name: foodItem.name,
        price: foodItem.price,
      },
    ]);
  };
  console.log("Cart :", cart);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div>
      {foodItems.map((foodItem) => (
        <Card key={foodItem._id} style={{ width: "18rem", margin: "30px" }}>
          <Card.Img variant="top" src={foodItem.image} />
          <Card.Body>
            <Card.Title>{foodItem.name}</Card.Title>
            <Card.Text>
              Price: {foodItem.price}
              <br />
              Description: {foodItem.description}
            </Card.Text>
            <Counter value={quantity} onChange={handleQuantityChange} />
            <button onClick={() => handleClick(foodItem)}>Add to Cart</button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};