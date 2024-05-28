// Import necessary modules
"use client"
import React, { useState, useEffect } from "react";

function Bill({ handleCheckout }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

    // Retrieve buyerId and sellerUserId from session storage
    const buyerId = sessionStorage.getItem("buyerId");
    const sellerUserId = sessionStorage.getItem("sellerUserId");

    // Determine the userId based on which one exists in session storage
    const userId = buyerId || sellerUserId;

    // If neither buyerId nor sellerUserId exists, log an error
    if (!userId) {
      console.error(
        "Neither buyerId nor sellerUserId found in session storage."
      );
      return;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch all products from the server
      const productsResponse = await fetch("/api/userproduct");
      const { products } = await productsResponse.json();
  
      // Prepare an array to store the updated products
      const updatedProducts = [];
  
      // Iterate through each item in the cart
      for (const cartItem of cartItems) {
        // Find the corresponding product in the fetched products
        const product = products.find((p) => p._id === cartItem._id);
  
        // If the product exists, update its stock quantity
        if (product) {
          // Calculate the new stock quantity
          const updatedStockQuantity = product.stockQuantity - cartItem.quantity;
  
          // Send a PUT request to update the product's stock quantity
          const updateResponse = await fetch(`/api/userproduct/${product._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stockQuantity: updatedStockQuantity }),
          });
  
          if (!updateResponse.ok) {
            console.error(
              `Failed to update quantity for product with ID ${product._id}`
            );
          } else {
            // If the update is successful, add the updated product to the array
            updatedProducts.push({
              ...product,
              stockQuantity: updatedStockQuantity,
            });
          }
        }
      }
  
      // Proceed with creating the bill
      const userDetails = {
        userId,
        firstName,
        lastName,
        phone,
        email,
        state,
        city,
        zipcode,
        paymentMethod,
        cartItems,
      };
  
      // Send a POST request to create the bill
      const response = await fetch("/api/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
  
      if (response.ok) {
        console.log("Bill created successfully.");
        localStorage.removeItem("cartItems");
        // Update the cart items stored in the state with the updated quantities
        setCartItems(updatedProducts);
      } else {
        console.error("Failed to create bill:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bill:", error.message);
    }
  };
  
  
  return (
    <div className="mt-40">
      <h2>Bill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <h3>Cart Summary:</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Checkout</button>
      </form>
    </div>
  );
}

export default Bill;
