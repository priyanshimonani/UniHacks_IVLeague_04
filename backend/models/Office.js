import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      unique: true,
      required: true
    },

    name: { type: String, required: true },
    location: { type: String, required: true },
    operatingHours: { type: String, required: true },
    counters: { type: Number, required: true },

    queueLimit: { type: Number, default: 50 },
    avgWaitingTime: { type: Number, default: 5 },
    currentToken: { type: Number, default: 0 },
    isPaused: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Office", officeSchema);
