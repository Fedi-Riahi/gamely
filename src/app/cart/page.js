"use client"
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/page";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Cart() {
  const { cartItems, handleAddToCart, handleRemoveItem } = useContext(Context);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { status, data: session } = useSession();

  // Clear cart on logout
  useEffect(() => {
    // Check if the session status changed from authenticated to unauthenticated
    if (status === "unauthenticated") {
      localStorage.removeItem("cartItems");
    }
  }, [status]);

  const handleQuantityChange = (item, newQuantity) => {
    // Ensure the new quantity is at least 1
    newQuantity = Math.max(1, newQuantity);

    // Update quantity in cartItems stored in localStorage
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Calculate the difference between the new quantity and the current quantity
    const quantityDifference = newQuantity - item.quantity;
    // Call handleAddToCart with the calculated difference
    handleAddToCart(item, quantityDifference);
  };

  const handleIncrementQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    handleQuantityChange(item, newQuantity);
  };

  const handleDecrementQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    handleQuantityChange(item, newQuantity);
  };

  // Calculate total amount of items in the cart
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCouponApply = () => {
    // Assume the coupon code "DISCOUNT10" gives a 10% discount
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1 * cartSubtotal);
    } else {
      // Invalid coupon code, reset discount
      setDiscount(0);
    }
  };

  const cartTotal = cartSubtotal - discount;

  return (
    <div className="my-40 mx-40">
      <h2 className="text-3xl text-zinc font-medium mb-4">Panier d'achat</h2>
      <div className="flex items-start justify-between">
        <div className="w-3/4 mr-4">
          {cartItems && cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex border border-gray-200 mb-4 mt-5 gap-10 p-6"
                >
                  <div className="w-1/4 flex items-center">
                    <img
                      src={item.productImage} // Use productImage field
                      alt={item.name} // Use name field
                      className="object-cover w-32 h-full"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between">
                    <div>
                      <h2 className="font-medium">{item.name}</h2>{" "}
                      {/* Use name field */}
                      <p className="text-gray-500">{item.category}</p>{" "}
                      {/* Use category field */}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrementQuantity(item)}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        onClick={() => handleIncrementQuantity(item)}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="font-bold text-xl">${item.price}</p>{" "}
                    {/* Use price field */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">Your cart is empty</div>
          )}
        </div>
        <div className="w-1/4 mt-5">
          {/* Order summary */}
          <Link href="/checkout">Check out</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
