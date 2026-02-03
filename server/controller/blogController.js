import Blog from "../models/Blog.js";
import uploadCloudinary from "../config/cloudinary.js";



// Add a new blog post
export const addBlogPost = async (req, res) => {
    try {
        const { title, content, author, category, isPublished } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Cover image is required" });
        };

        const imageUrl = await uploadCloudinary(req.file.path);

        const blogPost = await Blog.create({
            title,
            content,
            author,
            coverImage: imageUrl,
            category,
            isPublished,
            views: 0
        });

        res.status(201).json({ message: "Blog post added successfully", blogPost });
    } catch (error) {
        res.status(500).json({ message: "Error adding blog post", error });
    }
};

// Increament views
export const incrementViews = async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  res.json({ success: true });
};


// Update Blog Post
export const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, category, isPublished } = req.body;
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        };

        // If a new image is uploaded, upload it to Cloudinary
        let imageUrl = blog.coverImage;
        if (req.file) {
            imageUrl = await uploadCloudinary(req.file.path);
        };

        // Update blog fields
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.author = author || blog.author;
        blog.category = category || blog.category;
        blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
        blog.coverImage = imageUrl;

        const updatedBlog = await blog.save();
        res.status(200).json({ message: "Blog post updated successfully", updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog post", error });
    }
};

// Get all blog posts with Search and Pagination
export const getAllBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; //
    const skip = (Number(page) - 1) * Number(limit);

    // Create a filter object
    const query = search 
      ? { title: { $regex: search, $options: "i" } } // "i" makes it case-insensitive
      : {};

    const blogs = await Blog.find(query) //
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(query); //

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blog posts", error });
  }
};


export const getBlogPostById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({
      blog,
    });
  } catch (error) {
    console.error("Get blog error:", error.message);
    res.status(500).json({
      message: "Error retrieving blog post",
      error: error.message,
    });
  }
};

// Filter blog posts by category and title
export const filterBlogPosts = async (req, res) => {
    try {
        const { category, title, search} = req.query;
        let filter = {};
        if (category) {
            filter.category = category;
        }
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }
        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ message: "Filtered blog posts retrieved successfully", blogs });
    } catch (error) {
        res.status(500).json({ message: "Error filtering blog posts", error });
    }
};

// Get all unique categories from the database
export const getCategories = async (req, res) => {
  try {
    // .distinct() returns an array of unique values for the specified field
    const categories = await Blog.distinct("category");
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(200).json({ message: "Blog post deleted successfully" });      
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog post", error });
    }
};