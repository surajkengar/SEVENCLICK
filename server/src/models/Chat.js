import mongoose from "mongoose";

const Messageschema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const chatschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    services: {
      type: String,
      enum: ["supply"],
      default: "supply",
    },
    message: [Messageschema],
    totalmessage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ fix — update totalmessage manually in controller
// removed pre("save") hook — it was causing "next is not a function" error

const Chat = mongoose.model("Chat", chatschema);

export default Chat;