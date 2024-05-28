"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Context } from "@/app/context/page";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    fetchUserWishlist();
  }, []);

  const addToCart = () => {
    handleAddToCart(listing);
    // Additional logic like notification or UI update can be added here
  };

  const fetchUserWishlist = async () => {
    try {
      const userId = getUserIdFromSession();
      if (!userId) {
        console.log("User ID not found in session storage. Please log in.");
        return;
      }

      const userData = await fetchUserData(userId);
      if (!userData) return;

      const productIds = userData.user.wishlist;
      const productsData = await fetchProductsData(productIds);
      if (!productsData) return;

      setWishlist(productsData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const getUserIdFromSession = () => {
    const sellerUserId = sessionStorage.getItem("sellerUserId");
    const buyerId = sessionStorage.getItem("buyerId");
    return sellerUserId || buyerId;
  };

  const fetchUserData = async (userId) => {
    const response = await fetch(`/api/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  };

  const fetchProductsData = async (productIds) => {
    const promises = productIds.map(async (productId) => {
      const productResponse = await fetch(`/api/userproduct/${productId}`);
      if (!productResponse.ok) {
        throw new Error(`Failed to fetch product with ID: ${productId}`);
      }
      const productData = await productResponse.json();
      return productData.product;
    });
    return Promise.all(promises);
  };

  const removeFromWishlist = async (productId) => {
    try {
      const userId = getUserIdFromSession();
      if (!userId) {
        console.log("User ID not found in session storage. Please log in.");
        return;
      }

      // Update the local state by filtering out the removed product
      const updatedWishlist = wishlist.filter(
        (product) => product._id !== productId
      );
      setWishlist(updatedWishlist);

      // Send the PUT request to update the wishlist in the database
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlist: updatedWishlist.map((product) => product._id),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }

      console.log("Product removed from wishlist successfully.");
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlist.map((product) => (
        <div
          key={product._id}
          className="border border-gray-200 p-4 rounded-lg shadow-lg flex items-center gap-10"
        >
          <div className="w-1/4 flex items-center justify-center">
            <div
              className="relative overflow-hidden rounded-lg"
              style={{ width: "300px", height: "200px" }}
            >
              <Image
                src={product.productImage[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-3/4 flex flex-col">
            <span className="text-sm">Name</span>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <span className="text-sm">Category</span>
            <h2 className="text-lg font-semibold mb-2">{product.category}</h2>
            <span className="text-sm">Price</span>
            <span className="text-lg font-bold">{product.price} DT</span>
            <div className="flex justify-end">
              <button
                onClick={addToCart}
                className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
              >
                Add to cart
              </button>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-4 mr-2  border border-gray-400 text-md text-black font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
