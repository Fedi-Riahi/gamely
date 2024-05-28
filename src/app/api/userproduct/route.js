// Import the necessary modules and models
import connectDatabase from "@/lib/database";
import UserProduct from "@/models/userProduct";
import { NextResponse } from "next/server";

// Define the POST route handler for creating user products
export async function POST(request) {
  try {
    // Parse the request body to extract product data
    const {
      sellerId,
      name,
      description,
      category,
      price,
      stockQuantity,
      productImage,
      city,
      condition,
      folderId
    } = await request.json();

    // Ensure database connection
    await connectDatabase();

    // Create a new user product document
    await UserProduct.create({
      sellerId,
      name,
      description,
      category,
      price,
      stockQuantity,
      productImage,
      city,
      condition,
      folderId
    });

    // Return a success response with a message
    return NextResponse.json({ message: "User Product Created" }, { status: 201 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to create User Product", details: error.message }, { status: 500 });
  }
}



// Define the GET route handler
export async function GET(request) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Retrieve product data
    const products = await UserProduct.find({}); // Retrieve all products, you can add conditions if needed

    // Return the product data as a JSON response
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch User Products", details: error.message }, { status: 500 });
  }
}
