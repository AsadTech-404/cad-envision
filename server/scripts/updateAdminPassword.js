import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashed = await bcrypt.hash("admin123", 10);

    await User.updateOne(
      { email: "admin@example.com" }, 
      { 
        $set: { 
          password: hashed,
          role: "admin"
        } 
      }
    );

    console.log("Admin password updated successfully");
    process.exit();
  } catch (err) {
    console.error("Error updating admin password:", err);
    process.exit(1);
  }
};

run();
