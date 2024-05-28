"use client"
import React, { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { useRouter } from "next/navigation";

function EditProductForm({ product }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [stockQuantity, setStockQuantity] = useState(product.stockQuantity);
  const [city, setCity] = useState(product.city || ""); // New state for city, handling potential undefined value
  const [condition, setCondition] = useState(product.condition || ""); // New state for condition, handling potential undefined value
  const [loading, setLoading] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(false);

  const imageListRef = ref(storage, `images/${product.folderId}`);

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
  }, [imageUploadComplete, product.folderId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
    }
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${product.folderId}/${imageUpload.name}`);
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
      name: productName,
      description,
      category,
      price,
      stockQuantity,
      city,
      condition,
      productImage: imageList, // Assign the imageList array directly
    };
  
    console.log("Form Data:", formData); // Log the formData
  
    try {
      const response = await fetch(`/api/userproduct/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update product: " + response.status);
      }
  
      alert("Product updated successfully");
      router.push("/dashboard/products"); // Redirect to products dashboard
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Your input fields for product details */}

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block">
            Upload New Image
          </label>
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
                <img src={imageUrl} alt="Product" width={100} />
                <button type="button" onClick={() => deleteImage(imageUrl)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductForm;
