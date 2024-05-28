"use client";
import React, { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

function ProductForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [generatedId] = useState(v4());
  const [loading, setLoading] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(false);

  const imageListRef = ref(storage, `images/${generatedId}`);

  useEffect(() => {
    const sellerIdFromStorage = sessionStorage.getItem("sellerUserId");
    console.log("Seller UserId from session storage:", sellerIdFromStorage);
    setSellerId(sellerIdFromStorage);
  }, []);

  const uploadImage = () => {
    if (imageUpload === null) return;
    const promises = Array.from(imageUpload).map((file) => {
      const imageRef = ref(storage, `images/${generatedId}/${file.name}`);
      return uploadBytes(imageRef, file);
    });

    Promise.all(promises)
      .then(() => {
        alert("Images Uploaded");
        setImageUploadComplete(true);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  useEffect(() => {
    if (imageUploadComplete) {
      listAll(imageListRef)
        .then((response) =>
          Promise.all(response.items.map((item) => getDownloadURL(item)))
        )
        .then((urls) => setImageList(urls))
        .catch((error) => {
          console.error("Error fetching image URLs:", error);
        });
    }
  }, [imageUploadComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUpload === null || imageList.length === 0 || category === "") {
      console.error(
        "Please fill out all fields and upload images before submitting the form."
      );
      return;
    }

    setLoading(true);

    const formData = {
      sellerId,
      name: productName,
      description,
      category,
      price,
      stockQuantity,
      productImage: imageList,
      city,
      condition,
      folderId: generatedId,
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch("api/userproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit product data: " + response.status);
      }

      const data = await response.json();
      console.log("Product submitted successfully:", data.product);
    } catch (error) {
      console.error("Error submitting product data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8  w-full px-4  ">
      <Link
        href="/dashboard"
        className="text-center flex items-center"
      >
        Back to home
      </Link>
      <h1 className="text-3xl font-medium mb-6 mt-10">
        Upload your product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block">
            Product Title
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
          />
        </div>
        <div className="flex items-center w-full justify-between gap-4">
          {/* Add condition field */}

          <div className="flex-1">
            <label htmlFor="condition" className="block">
              Condition:
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-3 px-4 w-full"
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="category" className="block">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-3 px-4 w-full"
            >
              <option value="">Select Category</option>
              <option value="Console">Console</option>
              <option value="Chair">Chair</option>
              <option value="Graphic Cards">Graphic Cards</option>
              <option value="Memory">Memory</option>
              <option value="Monitors">Monitors</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex items-center w-full gap-4">
          <div className="flex-1">
            <label htmlFor="price" className="block">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-3 px-4 w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="stockQuantity" className="block">
              Stock Quantity:
            </label>
            <input
              type="number"
              id="stockQuantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
              className="border border-gray-300 rounded-md py-3 px-4 w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
          />
        </div>

        <div>
          <label htmlFor="city" className="block">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
          />
        </div>

        <div>
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files)}
            className="hidden"
            id="fileInput"
            multiple
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer border border-gray-300 text-black px-4 py-3 rounded-md inline-block"
          >
            Choose product images
          </label>
          <button
            type="button"
            onClick={uploadImage}
            className="ml-4 bg-black text-white px-4 py-3 rounded-md"
          >
            Upload Images
          </button>
          {imageList.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="Product Image"
              className="mt-2 object-cover rounded-md"
              width={200}
              height={200}
            />
          ))}
        </div>
        <div className="flex items-center justify-center w-full mt-10">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-10 rounded-tl-lg rounded-br-lg "
          >
            Upload the Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
