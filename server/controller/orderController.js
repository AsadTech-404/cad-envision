import Order from "../models/Order.js";
import { generateInvoice } from "../utils/generateInvoice.js";

// Get all orders with pagination & filter
export const getOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let filter = {};
    if (status) filter.status = status; // Paid, Pending, Refunded

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.drawing", "title price image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrders: total,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: error.message
    });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.drawing", "title price fileUrl");

  if (!order) {
    return res.status(404).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: order
  });
};


// Download invoice PDF
export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.drawing", "title price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const filePath = await generateInvoice(order); // must be awaited

    res.download(filePath, `invoice-${order._id}.pdf`);

  } catch (error) {
    res.status(500).json({
      message: "Invoice generation failed",
      error: error.message
    });
  }
};
