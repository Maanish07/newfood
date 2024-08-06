import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Header from "./Header";
import { Footer } from "../components/Footer";
import Card from "react-bootstrap/Card";

const Adminorders = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const total = order.reduce((sum, item) => sum + (item.price || 0), 0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/order")
      .then((response) => {
        const reversedOrders = response.data.reverse();
        setOrder(reversedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (index) => {
    if (!order[index]?.disabled) {
      const updatedOrder = [...order];
      updatedOrder[index].completed = !updatedOrder[index].completed;
      if (updatedOrder[index].completed) {
        updatedOrder[index]["Completed at"] = new Date().toISOString();
      } else {
        updatedOrder[index]["Completed at"] = null;
      }
      updatedOrder[index].disabled = true;
      setOrder(updatedOrder);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold my-4">Order</h1>
      <div className="container mx-auto px-4 py-6">
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Order Id
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Table Number
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Items
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Payment
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <ul className="space-y-4">
          {order.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            order.map((orderItem, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded shadow-sm bg-white flex flex-col gap-4"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={orderItem.completed || false}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={orderItem.disabled || false}
                    className="mr-2"
                  />
                  <div>
                    <div
                      className={`text-lg ${
                        orderItem.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {orderItem.name} - {orderItem.phone} - Table{" "}
                      {orderItem.table} - Created at -{" "}
                      {new Date(orderItem.createdAt).toLocaleString()}
                    </div>
                    <div>
                      {orderItem.cartItem && orderItem.cartItem.length > 0 ? (
                        orderItem.cartItem.map((foodItem) => (
                          <Card
                            className="flex"
                            key={foodItem._id}
                            style={{ width: "18rem", margin: "10px" }}
                          >
                            <Card.Img variant="top" src={foodItem.image} />
                            <Card.Body>
                              <Card.Title>{foodItem.name}</Card.Title>
                              <Card.Text>Price: {foodItem.price}</Card.Text>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <p>No items in the cart.</p>
                      )}
                    </div>
                    {orderItem.completed && (
                      <span className="text-sm text-gray-500 ml-4">
                        - Delivered at{" "}
                        {new Date(orderItem["Completed at"]).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <h5 className="mt-4 text-lg font-bold">
          Total Price: Rs. {total.toFixed(2)}
        </h5>
      </div>
      <Footer />
    </>
  );
};

export default Adminorders;
