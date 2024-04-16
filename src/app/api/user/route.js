import connectDatabase from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, email, password } = await request.json();
  await connectDatabase();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Create the user
    await User.create({ username, email, password });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
