import express from "express";
import { downloadInvoice, getOrderById, getOrders } from "../controller/orderController.js";

const orderRoute = new express.Router();

// Default route for testing
orderRoute.get("/", (req, res) => {
    return res.send("Order Route is working")
});

orderRoute.get("/all", getOrders);
orderRoute.get("/:id", getOrderById);
orderRoute.get("/invoice/:id", downloadInvoice);

export default orderRoute;