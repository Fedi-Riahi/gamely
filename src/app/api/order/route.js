import Order from "@/models/Order";
import connectDatabase from "@/lib/database";
import { NextResponse } from "next/server";

// Define the POST route handler for creating bills
export async function POST(request) {
  try {
    // Ensure database connection
    await connectDatabase();

    // Parse the request body to extract bill data
    const {
      userId,
      firstName,
      lastName,
      phone,
      email,
      state,
      city,
      zipcode,
      paymentMethod,
      cartItems,
    } = await request.json();

    // Create a new bill document
    const newOrder = new Order({
      userId,
      firstName,
      lastName,
      phone,
      email,
      state,
      city,
      zipcode,
      paymentMethod,
      cartItems,
    });

    // Save the new bill to the database
    await newOrder.save();

    // Return a success response with a message
    return NextResponse.json({ message: "Order Created" }, { status: 201 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to create Order", details: error.message },
      { status: 500 }
    );
  }
}


// Define the GET route handler for fetching bills
export async function GET(request) {
    try {
      // Ensure database connection
      await connectDatabase();
  
      // Retrieve all bills from the database
      const orders = await Order.find({});
  
      // Return the bills data as a JSON response
      return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
      // Return an error response if something goes wrong
      return NextResponse.json(
        { error: "Failed to fetch orders", details: error.message },
        { status: 500 }
      );
    }
  }