"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Context } from "@/app/context/page";

function ProductCard({ listing }) {
  const [sellers, setSellers] = useState([]);
  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    fetch("/api/seller")
      .then((response) => response.json())
      .then((data) => setSellers(data.sellers))
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  const getBusinessName = (sellerId) => {
    const seller = sellers.find((seller) => seller.user_id === sellerId);
    return seller ? seller.businessName : "Unknown Business";
  };

  const addToCart = () => {
    handleAddToCart(listing);
    // Additional logic like notification or UI update can be added here
  };
  const addToWishlist = (e) => {
    e.preventDefault();
    const sellerUserId = sessionStorage.getItem("sellerUserId");
    const buyerId = sessionStorage.getItem("buyerId");
    const userId = sellerUserId || buyerId;
  
    if (!userId) {
      console.log("User ID not found in session storage. Please log in.");
      return;
    }
  
    fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wishlist: [listing._id],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update wishlist");
        }
        // Optionally, you can update the local state or UI to reflect the change
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
        // Handle error, show error message, etc.
      });
  };
  
  

  return (
    <div
      className="border border-gradient bg-gradient-to-bl from-blue-200 to-blue-100 p-4 rounded-lg shadow-lg flex flex-col justify-between items-center"
      style={{ width: "280px", height: "450px" }}
    >
      <Link href={`/products/${listing._id}`}>
        <div className="mb-2">
          <h2 className="text-lg font-semibold line-clamp-2">{listing.name}</h2>
        </div>
      </Link>
      <div
        className="mb-2 relative overflow-hidden rounded-lg"
        style={{ width: "250px", height: "250px" }}
      >
        <Image
          src={listing.productImage[0]}
          alt={listing.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="mb-2 line-clamp-2 text-gray-600">
        {listing.description}
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-lg font-bold flex-1">{listing.price} DT</span>
        <button
          onClick={addToCart}
          className="mt-8 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="mr-4 text-md bg-gradient-to-r from-green-400 to-green-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Add to Wishlist
        </button>
      </div>
      {/* <div className="text-sm text-gray-500 mt-2">
        By {getBusinessName(listing.sellerId)}
      </div> */}
    </div>
  );
}

export default ProductCard;
