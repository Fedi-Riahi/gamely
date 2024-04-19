import connectDatabase from "@/lib/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body to extract product data
    const {
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
      folderId
    } = await request.json();

    // Ensure database connection
    await connectDatabase();

    // Create a new product document
    await Product.create({
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
      folderId
    });

    // Return a success response with a message
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to create product", details: error.message }, { status: 500 });
  }
}


// Define the GET route handler
export async function GET(request) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Retrieve product data
    const products = await Product.find({}); // Retrieve all products, you can add conditions if needed

    // Return the product data as a JSON response
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch products", details: error.message }, { status: 500 });
  }
}
