import mongoose, { Schema } from 'mongoose';

const SellerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  businessEntityType: {
    type: String,
    enum: ['company', 'individual'],
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: function () {
      return this.businessEntityType === 'company';
    }
  },
  taxNumber: {
    type: String,
    required: function () {
      return this.businessEntityType === 'company';
    }
  },  
  listedProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  forSaleProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

module.exports = Seller;
