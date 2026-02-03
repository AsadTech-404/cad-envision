import uploadCloudinary from "../config/cloudinary.js";
import Drawing from "../models/Drawing.js";

export const addDrawing = async (req, res) => {
  try {
    const { title, category, description, price, fileType, layers, software, isFree } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadCloudinary(req.file.path);

    const drawing = await Drawing.create({
      title,
      category,
      image: imageUrl,
      description,
      price: Number(price),
      fileType,
      layers,
      software,
      isFree,
    });

    res.status(201).json({ message: "Drawing added successfully", drawing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const updateDrawing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, price, fileType, layers, software, isFree } = req.body;

    const drawing = await Drawing.findById(id);
    if (!drawing) {
      return res.status(404).json({ message: "Drawing not found" });
    }

    // If a new image is uploaded, upload it to Cloudinary
    let imageUrl = drawing.image;
    if (req.file) {
      imageUrl = await uploadCloudinary(req.file.path);
    }

    // Update drawing fields
    drawing.title = title || drawing.title;
    drawing.category = category || drawing.category;
    drawing.description = description || drawing.description;
    drawing.price = price ? Number(price) : drawing.price;
    drawing.fileType = fileType || drawing.fileType;
    drawing.layers = layers || drawing.layers;
    drawing.software = software || drawing.software;
    drawing.isFree = isFree ? isFree : drawing.isFree;
    drawing.image = imageUrl;

    const updatedDrawing = await drawing.save();

    res.status(200).json({ message: "Drawing updated successfully", drawing: updatedDrawing });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getDrawings = async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;
    let filter = {};

    // Search (title + description)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter (case-insensitive)
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Sorting
    let sort = { createdAt: -1 };
    if (sortBy === "priceAsc") sort = { price: 1 };
    if (sortBy === "priceDesc") sort = { price: -1 };

    const drawings = await Drawing.find(filter).sort(sort);

    res.status(200).json({
      count: drawings.length,
      drawings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getDrawingById = async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: "Drawing not found" });
    }
    res.status(200).json({ drawing });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteDrawing = async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: "Drawing not found" });
    }
    res.status(200).json({ message: "Drawing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
