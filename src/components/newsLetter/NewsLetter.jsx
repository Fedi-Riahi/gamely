"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription here, e.g., send email to backend
    console.log("Subscribed with email:", email);
    // Reset email input after submission
    setEmail("");
  };

  return (
    <div className="flex justify-between items-center bg-white py-20">
      <div className="flex-1 mr-8 mx-20 ">
        <div>
          <h1 className="text-3xl w-1/3 font-bold text-gray-900 my-5">
            Subscribe newsletter and{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              get -20% off
            </span>
          </h1>
          <p className="text-gray-700 mb-4 w-2/3">
            Welcome to Gamely Marketplace! Explore a world of gaming delights of
            game keys and accessories. Find your next gaming thrill here!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex mt-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
          />
          <button className="z-10 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white px-6 py-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full">
            Subscribe
          </button>
        </form>
      </div>
      <div className="flex-1">
        {/* Replace 'imageURL' with the URL of your image */}
        <img
          src="./newsletter.png"
          alt="Newsletter Image"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Newsletter;
