"use client";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm/BusinessRegistrationForm";
import ProductForm from "@/components/productForm/ProductForm";
import React from "react";

const Dashboard = () => {
  // Check if SellerUserId exists in session storage
  const sellerUserId = sessionStorage.getItem("sellerUserId");

  return (
    <div>
      {sellerUserId ? (
        <div>
          <ProductForm />
        </div>
      ) : (
        <BusinessRegistrationForm />
      )}
    </div>
  );
};

export default Dashboard;
