"use client";
import React, { useEffect, useState } from "react";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm/BusinessRegistrationForm";
import ProductForm from "@/components/productForm/ProductForm";
import SellerProducts from "@/components/sellerProducts/SellerProducts";
import Wishlist from "@/components/wishlist/Wishlist";
import SideNav from "@/components/sidenav/Sidenav";
import Intro from "@/components/intro/Intro";
import Orders from "@/components/orders/Orders";

const Dashboard = () => {
  const [sellerUserId, setSellerUserId] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [activeComponent, setActiveComponent] = useState("intro");

  useEffect(() => {
    const sellerId = sessionStorage.getItem("sellerUserId");
    const buyerId = sessionStorage.getItem("buyerId");

    if (sellerId) {
      setSellerUserId(sellerId);
    } else if (buyerId) {
      setBuyerId(buyerId);
    }
  }, []);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="my-20">
      <Intro />
      <div className="bg-white flex">
        <SideNav
          handleShowWishlist={() => handleComponentChange("wishlist")}
          handleShowSellerProducts={() => handleComponentChange("sellerProducts")}
          handleShowOrders={() => handleComponentChange("orders")}
        />
        <div className="w-3/4 p-4 mx-10">
          {activeComponent === "orders" && <Orders />}
          {activeComponent === "wishlist" && buyerId && <Wishlist />}
          {activeComponent === "sellerProducts" && (
            <>
              {sellerUserId ? (
                <>
                  <div className="flex items-center justify-between w-full my-4">
                    <h2 className="text-2xl font-bold mb-4">Your Products for Sale</h2>
                    <button
                      onClick={() => handleComponentChange("productForm")}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                    >
                      Add Product
                    </button>
                  </div>
                  <SellerProducts />
                </>
              ) : (
                <BusinessRegistrationForm />
              )}
            </>
          )}
          {activeComponent === "productForm" && sellerUserId && <ProductForm />}
          {!sellerUserId && !buyerId && <BusinessRegistrationForm />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
