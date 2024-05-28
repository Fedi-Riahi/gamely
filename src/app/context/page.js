"use client"
import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(getCurrentItem, quantity = 1) {
    let cpyCartItems = [...cartItems];
    const existingItemIndex = cpyCartItems.findIndex(
      (item) => item._id === getCurrentItem._id // Assuming _id is the unique identifier for each item
    );

    if (existingItemIndex === -1) {
      // Add the item with quantity 1 if it's not already in the cart
      cpyCartItems.push({ ...getCurrentItem, quantity: 1 });
    } else {
      // Increase the quantity if item already exists
      cpyCartItems[existingItemIndex].quantity += quantity;
    }

    setCartItems(cpyCartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyCartItems));
  }

  function handleRemoveItem(itemId) {
    const updatedCartItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);

  return (
    <Context.Provider value={{ cartItems, handleAddToCart, handleRemoveItem }}>
      {children}
    </Context.Provider>
  );
}

export default GlobalState;
