import express from "express";
import { addBlogPost, deleteBlogPost, filterBlogPosts, getAllBlogPosts, getBlogPostById, getCategories, incrementViews, updateBlogPost } from "../controller/blogController.js";
import upload from "../middleware/multer.js";

const blogRoute = express.Router();

// Default route for testing
blogRoute.get("/", (req, res) => {
  res.send("Blog Route is working...");
});

blogRoute.post("/create", upload.single('coverImage'), addBlogPost);
blogRoute.put("/update/:id", upload.single('coverImage'), updateBlogPost);
blogRoute.put("/views/:id", incrementViews);
blogRoute.get("/all", getAllBlogPosts);
blogRoute.get("/single/:id", getBlogPostById);
blogRoute.get("/filter", filterBlogPosts);
blogRoute.get("/categories", getCategories);
blogRoute.delete("/delete/:id", deleteBlogPost);

export default blogRoute;
