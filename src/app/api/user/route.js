import connectDatabase from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
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
  } = await request.json();
  await connectDatabase();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create the user
    await User.create({
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
    });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

// Define the GET route handler
export async function GET(request) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Retrieve user data
    const users = await User.find({}); // Retrieve all users, you can add conditions if needed

    // Return the user data as a JSON response
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
