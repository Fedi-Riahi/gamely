"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ProductSection = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/userproduct");
        const data = await response.json();
        const products = data.products;
        if (products.length > 0) {
          setProduct(products[products.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-4 mx-20 w-full">
      <div className="flex items-center justify-start w-1/2 gap-8">
        <h1 className=" mb-5 text-3xl font-bold text-white text-start w-1/3">
          Topnotch Market Place deal !
        </h1>
        <span className="text-gray-300 flex-1 text-justify">
          More powerful hardware not only better their experiences in games
          ,they’re currently playing, but it also gives many players acces to
          titles with more demanding specifications
        </span>
      </div>
      <div className="flex items-center justify-around">
        {/* Left Image */}
        <div className="flex-1 text-center">
          <div className="relative w-96 h-96 mx-auto">
            {product.productImage[0] && (
              <Image
                src={product.productImage[0]}
                alt="Left Image"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>

        {/* Product Card */}
        <div className="flex-1 p-5 border border-gray-300 text-white bg-blue-950 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-5">
          <h2 className="text-2xl font-semibold my-4">{product.name}</h2>
          <p className="my-4 line-clamp-3 text-gray-300">
            {product.description}
          </p>
          <div className="flex items-center justify-between w-full my-4">
            <p className="font-bold text-lg mb-3">{product.price} DT</p>
            <button className="z-10 mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg">
              Add to cart
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 text-center">
          <div className="relative w-96 h-96 mx-auto">
            <Image
              src={product.productImage[1]}
              alt="Right Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
