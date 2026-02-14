import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/queue-system")
  .then(() => {
    console.log("MongoDB Connected");


    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
  
  app.listen(8080, () => {
  console.log("Server running on port 8080");
}); 