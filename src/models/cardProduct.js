// Import mongoose and Schema
import mongoose, { Schema } from 'mongoose';

// Define Gift Card Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    enum: ['USD', 'EURO'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  platform: {
    type: String,
    enum: ['Steam', 'Google Play', 'PSN', 'XBOX Live', 'Riot', 'BattleNet'],
    required: true,
  },
  productImage: [{
    type: String,
    required: true,
  }],
  folderId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const CardProduct = mongoose.models.CardProduct || mongoose.model("CardProduct", productSchema);

module.exports = CardProduct;
