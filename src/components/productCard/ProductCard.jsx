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
  const addToWishlist = async (e) => {
    e.preventDefault();
    const sellerUserId = sessionStorage.getItem("sellerUserId");
    const buyerId = sessionStorage.getItem("buyerId");
    const userId = sellerUserId || buyerId;

    if (!userId) {
        console.log("User ID not found in session storage. Please log in.");
        return;
    }

    try {
        // Fetch the current user data
        const userResponse = await fetch(`/api/user/${userId}`);
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        console.log("Current user data:", userData);  // Log current user data

        // Get the current wishlist and add the new product ID
        const currentWishlist = userData.wishlist || [];
        console.log("Current wishlist:", currentWishlist);  // Log current wishlist

        // Add the new product ID if it's not already in the wishlist
        if (!currentWishlist.includes(listing._id)) {
            const newWishlist = [...currentWishlist, listing._id];
            console.log("Updated wishlist:", newWishlist);  // Log updated wishlist

            // Update the wishlist on the server
            const updateResponse = await fetch(`/api/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wishlist: newWishlist,
                }),
            });

            if (!updateResponse.ok) {
                const errorMessage = await updateResponse.text();
                console.log("Server response:", errorMessage);
                throw new Error("Failed to update wishlist");
            }

            // Optionally, update the local state or UI to reflect the change
            console.log("Wishlist updated successfully");
        } else {
            console.log("Item already in wishlist");
        }

    } catch (error) {
        console.error("Error updating wishlist:", error);
        // Handle error, show error message, etc.
    }
};






  return (
    <div
      className="border border-gradient bg-gradient-to-bl from-blue-200 to-blue-100 p-4 rounded-lg shadow-lg flex flex-col justify-between items-start"
      style={{ width: "300px", height: "450px" }}
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
          width={250}
          height={250}
          objectFit="cover"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="mb-2 line-clamp-2 text-gray-600">
        {listing.description}
      </div>
      <span className="text-lg font-bold">{listing.price} DT</span>
      <div className="flex justify-between items-center w-full gap-4">
        <button
          onClick={addToCart}
          className="flex-1 mt-8 text-sm bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-m rounded-tl-lg rounded-br-lg"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="flex-1 mt-8 text-sm bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-m rounded-tl-lg rounded-br-lg"
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
