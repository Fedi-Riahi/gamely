import mongoose, { Schema } from "mongoose";

const SellerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    businessEntityType: {
      type: String,
      enum: ["company", "individual"],
    },
    registrationNumber: {
      type: Number,
    },
    taxNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

module.exports = Seller;
