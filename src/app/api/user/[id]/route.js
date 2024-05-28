// Import necessary modules
import connectDatabase from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

// Define the GET route handler to get a user by ID
export async function GET(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract user ID from the request parameters
    const { id } = params;

    // Retrieve the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data as a JSON response
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch user", details: error.message },
      { status: 500 }
    );
  }
}

// Define the PUT route handler to update a user by ID
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const requestData = await request.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      state,
      city,
      zipCode,
      wishlist,
    } = requestData;

    // Ensure database connection
    await connectDatabase();

    // Find the user by ID and update its properties
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phone,
        email,
        password,
        role,
        state,
        city,
        zipCode,
        wishlist,
      },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return a success response with the updated user data
    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user", details: error.message },
      { status: 500 }
    );
  }
}

// Define the DELETE route handler to delete a user by ID
export async function DELETE(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract user ID from the request parameters
    const { id } = params;

    // Delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if the user exists
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return a success response with the deleted user data
    return NextResponse.json(
      { success: true, user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to delete user", details: error.message },
      { status: 500 }
    );
  }
}
