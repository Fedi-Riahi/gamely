"use client"
import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve user ID from session storage
    const userId =
      sessionStorage.getItem("sellerUserId") ||
      sessionStorage.getItem("buyerId");

    // Fetch bills data from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        // Filter the bills to find the ones matching the user ID
        const userOrders = data.orders.filter((order) => order.userId === userId);

        // Fetch product details for each cart item in each order
        const ordersWithProducts = await Promise.all(
          userOrders.map(async (order) => {
            const cartItemsWithProducts = await Promise.all(
              order.cartItems.map(async (item) => {
                const product = await fetchProductDetails(item._id);
                return { ...item, product };
              })
            );
            return { ...order, cartItems: cartItemsWithProducts };
          })
        );

        setOrders(ordersWithProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/userproduct/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const productData = await response.json();
      return productData.product; // Assuming product details are nested under 'product' key
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <p>
                Name: {order.firstName} {order.lastName}
              </p>
              <ul>
                {order.cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      {item.product && (
                        <>
                          <p>Product Name: {item.product.name}</p>
                          {/* Render additional product details as needed */}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
