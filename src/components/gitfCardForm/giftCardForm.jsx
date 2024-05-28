"use client";
import React, { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";

function giftCardForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [currency, setCurrency] = useState("");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [generatedId] = useState(v4());
  const [loading, setLoading] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(false);

  const imageListRef = ref(storage, `images/${generatedId}`);

  

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${generatedId}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
      setImageUploadComplete(true);
    });
  };

  useEffect(() => {
    if (imageUploadComplete) {
      listAll(imageListRef).then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setImageList(urls);
          })
          .catch((error) => {
            console.error("Error fetching image URLs:", error);
          });
      });
    }
  }, [imageUploadComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (imageUpload === null || imageList.length === 0 || platform === "") {
      console.error(
        "Please fill out all fields and upload an image before submitting the form."
      );
      return;
    }
  
    setLoading(true);
  
    const formData = {
      name,
      description,
      code,
      platform,
      price,
      value,
      currency,
      stockQuantity,
      productImage: imageList[0],
      folderId: generatedId,
    };
  
    console.log("Form Data:", formData); // Log the formData
  
    try {
      // Log the form data before posting
      console.log("Form Data to be posted:", formData);
  
      const response = await fetch("api/product", {
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
    <div className="mt-20">
      <h1 className="text-3xl font-bold mb-6">Product Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="code" className="block">
            Product Code:
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="platform" className="block">
            Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Platform</option>
            <option value="Steam">Steam</option>
            <option value="Google Play">Google Play</option>
            <option value="PSN">PSN</option>
            <option value="XBOX Live">XBOX Live</option>
            <option value="Riot">Riot</option>
            <option value="BattleNet">BattleNet</option>
          </select>
        </div>
        <div>
          <label htmlFor="currency" className="block text-white">
          currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="value" className="block">
            Value:
          </label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="stockQuantity" className="block">
            Stock Quantity:
          </label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md inline-block"
          >
            Upload Image
          </label>
          <button
            type="button"
            onClick={uploadImage}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Upload
          </button>
          {imageList.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="Product Image"
              className="mt-2 object-cover"
              width={200}
              height={200}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default giftCardForm;
