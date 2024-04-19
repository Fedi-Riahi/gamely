// Import necessary modules
import connectDatabase from "@/lib/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// Define the GET route handler to get a product by ID
export async function GET(request, {params}) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract product ID from the request parameters
    const { id } = params;

    // Retrieve the product by ID
    const product = await Product.findById(id);

    // Check if the product exists
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the product data as a JSON response
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch product", details: error.message }, { status: 500 });
  }
}

// Define the PUT route handler to update a product by ID
export async function PUT(request, { params }) {
    const { id } = params;
  
    try {
      const requestData = await request.json();
      const { sellerId, name, description, category, platformDetails, gameDetails, giftCardDetails, price, stockQuantity, productImage, folderId } = requestData;
  
      // Ensure database connection
      await connectDatabase();
  
      // Find the product by ID and update its properties
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        sellerId,
        name,
        description,
        category,
        platformDetails,
        gameDetails,
        giftCardDetails,
        price,
        stockQuantity,
        productImage,
        folderId,
      }, { new: true });
  
      // Check if the product exists
      if (!updatedProduct) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      // Return a success response with the updated product data
      return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
    } catch (error) {
      // Return an error response if something goes wrong
      console.error("Error updating product:", error);
      return NextResponse.json({ error: "Failed to update product", details: error.message }, { status: 500 });
    }
  }

// Define the DELETE route handler to delete a product by ID
export async function DELETE(request, {params}) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract product ID from the request parameters
    const { id } = params;

    // Delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return a success response with the deleted product data
    return NextResponse.json({ success: true, product: deletedProduct }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to delete product", details: error.message }, { status: 500 });
  }
}
