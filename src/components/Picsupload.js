import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Picsupload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/pics",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Image uploaded successfully!");
      if (response) {
        navigate("/");
      }
    } catch (error) {
      setMessage("Error uploading image");
      console.error("Error uploading image:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="container mx-auto my-6">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center gap-4 cursor-pointer p-6 border border-dashed border-gray-300 rounded-lg transition hover:border-gray-400"
          >
            <span className="flex items-center justify-center h-12 w-12 bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="File input icon"
                role="img"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </span>
            <span className="text-gray-500">
              Drag & drop or{" "}
              <span className="text-emerald-500">upload a file</span>
            </span>
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-30 h-30 object-cover rounded-lg shadow"
            />
          )}
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Picsupload;
