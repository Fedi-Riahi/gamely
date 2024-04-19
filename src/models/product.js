import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Platform', 'Game', 'Gift Card'],
    required: true
  },
  platformDetails: {
    type: {
      // Define fields specific to the platform category
      // Example:
      manufacturer: String,
      os: String,
      version: String
    },
    required: function () {
      return this.category === 'platform';
    }
  },
  gameDetails: {
    type: {
      // Define fields specific to the game category
      // Example:
      genre: String,
      platform: String,
      releaseDate: String
    },
    required: function () {
      return this.category === 'game';
    }
  },
  giftCardDetails: {
    type: {
      // Define fields specific to the gift card category
      // Example:
      value: Number,
      currency: String,
      expiryDate: String
    },
    required: function () {
      return this.category === 'gift card';
    }
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  productImage:{
    type: String,
    required: true,
  },
  folderId:{
    type : String,
    required: true,
  }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
