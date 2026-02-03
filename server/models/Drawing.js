import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    description: { type: String },
    price: { type: Number, default: 0 },
    fileType: { type: String },
    layers: { type: Number },
    software: { type: String },
    isFree: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Drawing", drawingSchema);
