import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/review", formData);
      setMessage("Review submitted successfully!");
      setFormData({ name: "", review: "", rating: 0 });
    } catch (error) {
      console.error("There was an error submitting the review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-button text-red-500"
          onClick={handleClosePopup}
        >
          Close
        </button>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Review:</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating:</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`cursor-pointer text-2xl ${
                  star <= formData.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};
export default Review;
