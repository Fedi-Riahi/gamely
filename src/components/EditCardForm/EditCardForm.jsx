"use client";
import React, { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { useRouter } from "next/navigation";

function EditCardForm({ giftCard }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [name, setName] = useState(giftCard.name);
  const [description, setDescription] = useState(giftCard.description);
  const [value, setValue] = useState(giftCard.value);
  const [currency, setCurrency] = useState(giftCard.currency);
  const [price, setPrice] = useState(giftCard.price);
  const [platform, setPlatform] = useState(giftCard.platform);
  const [loading, setLoading] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(false);

  const imageListRef = ref(storage, `images/${giftCard.folderId}`);

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setImageList(urls);
          })
          .catch((error) => {
            console.error("Error fetching image URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, [imageUploadComplete, giftCard.folderId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
    }
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${giftCard.folderId}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert("Image Uploaded");
        setImageUploadComplete(true);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const deleteImage = async (imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      setImageList((prevImages) => prevImages.filter((image) => image !== imageUrl));
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = {
      name,
      description,
      value,
      currency,
      price,
      platform,
      productImage: imageList,
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch(`/api/product/${giftCard._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update gift card: " + response.status);
      }

      alert("Gift card updated successfully");
      router.push("/admin"); // Redirect to gift cards dashboard
    } catch (error) {
      console.error("Error updating gift card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Gift Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="value" className="block">Value</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="currency" className="block">Currency</label>
          <input
            type="text"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label htmlFor="platform" className="block">Platform</label>
          <input
            type="text"
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block">Upload New Image</label>
          <input type="file" id="image" onChange={handleImageUpload} />
          <button type="button" onClick={uploadImage}>
            Upload Image
          </button>
        </div>

        {/* Image list */}
        <div>
          <label className="block">Current Images</label>
          <div>
            {imageList.map((imageUrl) => (
              <div key={imageUrl}>
                <img src={imageUrl} alt="Gift Card" width={100} />
                <button type="button" onClick={() => deleteImage(imageUrl)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Gift Card
        </button>
      </form>
    </div>
  );
}

export default EditCardForm;
