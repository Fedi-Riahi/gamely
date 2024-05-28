// Import mongoose and Schema
import mongoose, { Schema } from 'mongoose';

// Define User Product Schema
const UserProductSchema = new Schema({
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
    enum: ['Console', 'Chair', 'Graphic Cards', 'Memory', 'Monitors', 'Accessories'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  productImage: [{
    type: String,
    required: true,
  }],
  folderId: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Used'],
    required: true
  }
}, { timestamps: true });

const UserProduct = mongoose.models.UserProduct || mongoose.model("UserProduct", UserProductSchema);

module.exports = UserProduct;
