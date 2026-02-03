import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      drawing: { type: mongoose.Schema.Types.ObjectId, ref: "Drawing", required: true },
      price: { type: Number, required: true },
      qty: { type: Number, default: 1 }
    }
  ],

  customerEmail: { type: String, required: true },

  totalAmount: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ['PayFast', 'Stripe', 'JazzCash', 'EasyPaisa'],
    required: true
  },
  orderNumber: {
  type: String,
  unique: true
},

  paymentId: String,

  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Refunded'],
    default: 'Pending'
  },

}, { timestamps: true });
export default mongoose.model("Order", orderSchema);