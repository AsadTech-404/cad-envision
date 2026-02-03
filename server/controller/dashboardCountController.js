import Order from "../models/Order.js";
import Drawing from "../models/Drawing.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalDrawings = await Drawing.countDocuments();

    const revenue = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      success: true,
      totalOrders,
      totalDrawings,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Stats error" });
  }
};
