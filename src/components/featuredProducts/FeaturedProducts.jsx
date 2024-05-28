"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("api/userproduct");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to truncate the description to a certain length
  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-20 my-20">
      <h1 className="text-white text-2xl font-semibold ">
        Featured Market Products
      </h1>
      <span className="text-gray-200">Voir Tout</span>
      </div>
      <div className="flex justify-center items-center mt-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative max-w-xs flex flex-col py-4 px-2 items-center justify-between bg-blue-950 rounded-lg overflow-hidden shadow-lg m-4"
            style={{ width: "300px", height: "480px" }}
          >
            <h3 className="text-lg text-center font-semibold mb-2 text-white z-10">
              {product.name}
            </h3>
            <div className="w-full h-40 flex items-center justify-center">
              <Image
                src={product.productImage[0]}
                alt={product.name}
                className="object-cover z-10"
                width={250}
                height={250}
              />
            </div>
            <div className="p-4">
              <p className="text-gray-400 mb-2 z-10">
                {truncateDescription(product.description, 50)}
              </p>
              <div className="flex items-center justify-between ">
                <p className="text-white font-semibold text-2xl z-10">
                  {product.price} DT
                </p>
                <button className="z-10 mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-blue-500 via-blue-600 to-purple-800 opacity-25 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
