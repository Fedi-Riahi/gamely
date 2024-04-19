"use client"
import React, { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";

function ProductForm() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [os, setOS] = useState("");
  const [version, setVersion] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [generatedId] = useState(v4());
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [imageUploadComplete, setImageUploadComplete] = useState(false);

  const imageListRef = ref(storage, `images/${generatedId}`);

  useEffect(() => {
    const sellerIdFromStorage = sessionStorage.getItem("sellerUserId");
    setSellerId(sellerIdFromStorage);
  }, []);

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${generatedId}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
      setImageUploadComplete(true); // Set image upload complete to true
    });
  };
  
  useEffect(() => {
    if (imageUploadComplete) {
      // Fetch image URLs only when upload is complete
      listAll(imageListRef).then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises).then((urls) => {
          setImageList(urls);
        }).catch((error) => {
          console.error("Error fetching image URLs:", error);
        });
      });
    }
  }, [imageUploadComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
 
  // Check if an image has been uploaded and image URLs are fetched
  if (imageUpload === null || imageList.length === 0) {
    console.error("Please upload an image before submitting the form.");
    return;
  }
  
    setLoading(true); // Set loading state to true
  

  
    const formData = {
      sellerId,
      name: productName,
      description,
      category,
      price,
      stockQuantity,
      platformDetails: {
        manufacturer,
        os,
        version,
      },
      gameDetails: {
        genre,
        platform,
        releaseDate,
      },
      giftCardDetails: {
        value,
        currency,
        expiryDate,
      },
      productImage: imageList[0], // Use the first uploaded image URL
      folderId: generatedId,
    };
  
    try {
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
      setLoading(false); // Set loading state to false after submission
    }
  };
  
  
  

  
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold mb-6">Product Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Category</option>
            <option value="Platform">Platform</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block">Price:</label>
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
          <label htmlFor="stockQuantity" className="block">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        {/* Additional fields based on category */}
        {category === "Platform" && (
          <div>
            <div>
              <label htmlFor="manufacturer" className="block">Manufacturer:</label>
              <input
                type="text"
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="os" className="block">OS:</label>
              <input
                type="text"
                id="os"
                value={os}
                onChange={(e) => setOS(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="version" className="block">Version:</label>
              <input
                type="text"
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        )}
        {/* Additional fields based on category */}
        {category === "Game" && (
          <div>
            <div>
              <label htmlFor="genre" className="block">Genre:</label>
              <input
                type="text"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="platform" className="block">Platform:</label>
              <input
                type="text"
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="releaseDate" className="block">Release Date:</label>
              <input
                type="text"
                id="releaseDate"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        )}
        {/* Additional fields based on category */}
        {category === "Gift Card" && (
          <div>
            <div>
              <label htmlFor="value" className="block">Value:</label>
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
              <label htmlFor="currency" className="block">Currency:</label>
              <input
                type="text"
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        )}
        <div>
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md inline-block">Upload Image</label>
          <button type="button" onClick={uploadImage} className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md">Upload</button>
          {imageList.map((url, index) => (
            <Image key={index} src={url} alt="Product Image" className="mt-2 object-cover" width={200} height={200}/>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;
