import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: true
    },

    name: { type: String, required: true },
    mobile: { type: String, required: true },

    tokenNumber: { type: Number, required: true },

    status: {
      type: String,
      enum: ["waiting", "served"],
      default: "waiting"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Queue", queueSchema);
