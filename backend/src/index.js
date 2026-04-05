import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected:", mongoose.connection.host);
    console.log("🌍 CORS ORIGIN:", process.env.CORS_ORIGIN);

    app.listen(PORT, () => {
      console.log(`⚙️  Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
  });