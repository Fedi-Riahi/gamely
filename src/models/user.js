import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: false, // Make it optional for Google users
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
      },
      password: {
        type: String,
        required: false, // Make it optional for Google users
      },
    },
    { timestamps: true }
  );
  

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User