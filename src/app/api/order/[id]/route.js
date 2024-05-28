import Order from "@/models/Order";
import connectDatabase from "@/lib/database";
import { NextResponse } from "next/server";
// Define the GET route handler for fetching a bill by ID
// Define the GET route handler for fetching a bill by ID
export async function GET(request, { params }) {
    try {
      // Ensure database connection
      await connectDatabase();
  
      // Extract bill ID from the request parameters
      const { id } = params;
  
      // Retrieve the bill by ID
      const order = await Order.findById(id);
  
      // Check if the bill exists
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
  
      // Return the bill data as a JSON response
      return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
      // Return an error response if something goes wrong
      return NextResponse.json(
        { error: "Failed to fetch order", details: error.message },
        { status: 500 }
      );
    }
  }
  
  // Define the DELETE route handler for deleting a bill by ID
  export async function DELETE(request, { params }) {
    try {
      // Ensure database connection
      await connectDatabase();
  
      // Extract bill ID from the request parameters
      const { id } = params;
  
      // Delete the bill by ID
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      // Check if the bill exists
      if (!deletedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
  
      // Return a success response with the deleted bill data
      return NextResponse.json({ success: true, order: deletedOrder }, { status: 200 });
    } catch (error) {
      // Return an error response if something goes wrong
      return NextResponse.json(
        { error: "Failed to delete Order", details: error.message },
        { status: 500 }
      );
    }
  }