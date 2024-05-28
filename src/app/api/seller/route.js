import connectDatabase from "@/lib/database";
import Seller from "@/models/seller";
import { NextResponse } from "next/server";

// Define the POST API endpoint handler
export async function POST(request) {
  try {
    // Extract data from request body
    const {
      userId,
      name,
      phone,
      businessEntityType,
      registrationNumber,
      taxNumber,
    } = await request.json();

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDatabase();

    // Create a new seller document
    const newSeller = new Seller({
      user_id: userId,
      name,
      phone,
      businessEntityType,
      registrationNumber,
      taxNumber,
    });

    // Save the seller document
    await newSeller.save();

    // Return success response with the newly created seller document
    return NextResponse.json(
      { message: "Seller created successfully", seller: newSeller },
      { status: 201 }
    );
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to create seller", details: error.message },
      { status: 500 }
    );
  }
}

// Define the GET API endpoint handler
export async function GET(request) {
  try {
    // Connect to the database
    await connectDatabase();

    // Find all sellers
    const sellers = await Seller.find();

    // Return success response with the sellers data
    return NextResponse.json({ sellers }, { status: 200 });
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch sellers", details: error.message },
      { status: 500 }
    );
  }
}
