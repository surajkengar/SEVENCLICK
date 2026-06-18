import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  emailid: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  mobileno: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  isBlocked: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
  },

  verificationTokenExpiry: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  referralid: {
    type: String,
    trim: true,
  },

  resetpasswordToken: {
    type: String,
  },

  resetpasswordExpiry: {
    type: Date,
  },

  avatar: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // ✅ add this — was missing!
  plan: {
    type: String,
    enum: ["free", "standard", "pro"],
    default: "free",
  },

}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;