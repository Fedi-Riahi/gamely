"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import EditProductForm from "@/components/editProductForm/EditProductForm";

function SellerProducts() {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const sellerUserId = sessionStorage.getItem("sellerUserId");
        if (!sellerUserId) {
          throw new Error("Seller user ID not found in session storage");
        }

        const response = await fetch(
          `/api/userproduct?sellerId=${sellerUserId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch user products: ${response.status}`);
        }

        const data = await response.json();
        setUserProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/userproduct/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      setUserProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleFinishEditing = () => {
    setEditingProductId(null);
  };

  return (
    <div className="">
      {editingProductId ? (
        <EditProductForm
          product={userProducts.find(
            (product) => product._id === editingProductId
          )}
          onFinishEditing={handleFinishEditing}
        />
      ) : (
        <div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {userProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                userProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 p-4 rounded-lg shadow-lg flex items-center mb-4 gap-10"
                  >
                    <div className="w-1/4  flex items-center justify-center">
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
                      <span>Name</span>
                      <h2 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h2>
                      <span>Date</span>
                      <h2 className="text-lg font-semibold mb-2">
                        {product.createdAt.split("T")[0]}
                      </h2>
                      <span>Category</span>
                      <h2 className="text-lg font-semibold mb-2">
                        {product.category}
                      </h2>
                      <span>Price</span>
                      <span className="text-lg font-bold">
                        {product.price} DT
                      </span>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleEditProduct(product._id)}
                          className="mt-4 mr-2 text-md bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="mt-4 text-md text-red-500 bg-white font-medium py-2 px-8 rounded-tl-lg rounded-br-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
