import mongoose from "mongoose";

const Appoitnmentschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      required: true,
      enum: ["strategy", "financial", "hr", "marketing"], // ✅ fixed
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    emailid: {
      type: String,        // ✅ fixed — no quotes
      required: true,
      trim: true,
      lowercase: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
      enum: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    },

    note: {
      type: String,        // ✅ fixed — no quotes
      default: "",
      trim: true,
    },

    status: {             // ✅ added
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }    // ✅ added
);

const Appoitnment = mongoose.model("Appoitnment", Appoitnmentschema);

export default Appoitnment;