// Import the necessary modules and models
import connectDatabase from "@/lib/database";
import CardProduct from "@/models/cardProduct";
import { NextResponse } from "next/server";

// Define the POST route handler for creating gift cards
export async function POST(request) {
    try {
      // Parse the request body to extract gift card data
      const {
        name,
        description,
        code,
        value,
        currency,
        price,
        platform,
        productImage,
        folderId
      } = await request.json();
  
      // Ensure database connection
      await connectDatabase();
  
      // Create a new gift card document
      const newProduct = new CardProduct({
        name,
        description,
        code,
        value,
        currency,
        price,
        platform,
        productImage,
        folderId
      });
  
      await newProduct.save();
  
      // Return a success response with a message
      return NextResponse.json({ message: "Product Created" }, { status: 201 });
    } catch (error) {
      // Return an error response if something goes wrong
      console.error("Failed to create product:", error);
      return NextResponse.json({ error: "Failed to create Product", details: error.message }, { status: 500 });
    }
  }

// Define the GET route handler for fetching gift cards
export async function GET(request) {
    // Ensure database connection
    await connectDatabase();
  
    try {
      // Retrieve gift card data
      const products = await CardProduct.find({}); // Retrieve all gift cards, you can add conditions if needed
  
      // Return the gift card data as a JSON response
      return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
      // Return an error response if something goes wrong
      return NextResponse.json({ error: "Failed to fetch Products", details: error.message }, { status: 500 });
    }
  }