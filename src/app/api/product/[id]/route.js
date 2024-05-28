// Import necessary modules
import connectDatabase from "@/lib/database";
import cardProduct from "@/models/cardProduct";
import { NextResponse } from "next/server";

// Define the GET route handler to get a gift card by ID
export async function GET(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract gift card ID from the request parameters
    const { id } = params;

    // Retrieve the gift card by ID
    const giftCard = await cardProduct.findById(id);

    // Check if the gift card exists
    if (!giftCard) {
      return NextResponse.json({ error: "Gift card not found" }, { status: 404 });
    }

    // Return the gift card data as a JSON response
    return NextResponse.json({ giftCard }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to fetch gift card", details: error.message }, { status: 500 });
  }
}

// Define the PUT route handler to update a gift card by ID
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const requestData = await request.json();
    const {
      sellerId,
      name,
      description,
      value,
      currency,
      price,
      platform,
      productImage,
      folderId
    } = requestData;

    // Ensure database connection
    await connectDatabase();

    // Find the gift card by ID and update its properties
    const updatedGiftCard = await cardProduct.findByIdAndUpdate(
      id,
      {
        sellerId,
        name,
        description,
        value,
        currency,
        price,
        platform,
        productImage,
        folderId
      },
      { new: true }
    );

    // Check if the gift card exists
    if (!updatedGiftCard) {
      return NextResponse.json({ error: "Gift card not found" }, { status: 404 });
    }

    // Return a success response with the updated gift card data
    return NextResponse.json({ success: true, giftCard: updatedGiftCard }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Error updating gift card:", error);
    return NextResponse.json({ error: "Failed to update gift card", details: error.message }, { status: 500 });
  }
}

// Define the DELETE route handler to delete a gift card by ID
export async function DELETE(request, { params }) {
  // Ensure database connection
  await connectDatabase();

  try {
    // Extract gift card ID from the request parameters
    const { id } = params;

    // Delete the gift card by ID
    const deletedGiftCard = await cardProduct.findByIdAndDelete(id);

    // Check if the gift card exists
    if (!deletedGiftCard) {
      return NextResponse.json({ error: "Gift card not found" }, { status: 404 });
    }

    // Return a success response with the deleted gift card data
    return NextResponse.json({ success: true, giftCard: deletedGiftCard }, { status: 200 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: "Failed to delete gift card", details: error.message }, { status: 500 });
  }
}
