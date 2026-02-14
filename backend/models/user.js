import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
mobile: {
  type: String,
  required: true,
  trim: true,
  match: [/^[0-9]{10}$/, "Please enter valid mobile number"]
}
}, 

{ timestamps: true });

export default mongoose.model("User", userSchema);