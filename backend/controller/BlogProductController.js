import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { BlogProduct } from "../model/BlogProduct.js";
import { Blogs } from "../model/Blog.js";
import { Products } from "../model/Product.js";

// Create blog product association
export const createBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { blogId, productId, order } = req.body;

    if (!blogId || !productId) {
      return res.status(400).json({
        status: "fail",
        message: "Blog ID and Product ID are required",
      });
    }

    // Check if blog exists
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    // Check if product exists
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    // Check if association already exists
    const existing = await BlogProduct.findOne({ blogId, productId });
    if (existing) {
      return res.status(400).json({
        status: "fail",
        message: "This product is already associated with this blog",
      });
    }

    const blogProduct = await BlogProduct.create({
      blogId,
      productId,
      order: order || 0,
    });

    const populated = await BlogProduct.findById(blogProduct._id)
      .populate("blogId", "title slug")
      .populate("productId", "name slug images");

    res.status(200).json({
      status: "success",
      message: "Blog product association created successfully!",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
});

// Get all blog products by blog ID
export const getBlogProductsByBlogId = catchAsyncError(async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const blogProducts = await BlogProduct.find({ blogId })
      .populate("productId", "name slug images actualPrice size description")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      status: "success",
      data: blogProducts,
    });
  } catch (error) {
    next(error);
  }
});

// Get all blog products (for admin)
export const getAllBlogProducts = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || "";

    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { "blogId.title": { $regex: searchQuery, $options: "i" } },
        { "productId.name": { $regex: searchQuery, $options: "i" } },
      ];
    }

    const [blogProducts, total] = await Promise.all([
      BlogProduct.find(filter)
        .populate("blogId", "title slug")
        .populate("productId", "name slug images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogProduct.countDocuments(filter),
    ]);

    res.status(200).json({
      status: "success",
      data: blogProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Update blog product
export const updateBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { blogId, productId, order } = req.body;

    const blogProduct = await BlogProduct.findById(id);
    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found",
      });
    }

    // Check if blog exists (if blogId is being updated)
    if (blogId) {
      const blog = await Blogs.findById(blogId);
      if (!blog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found",
        });
      }
    }

    // Check if product exists (if productId is being updated)
    if (productId) {
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "Product not found",
        });
      }

      // Check if new association already exists
      const existing = await BlogProduct.findOne({
        blogId: blogId || blogProduct.blogId,
        productId,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(400).json({
          status: "fail",
          message: "This product is already associated with this blog",
        });
      }
    }

    const updateData = {};
    if (blogId) updateData.blogId = blogId;
    if (productId) updateData.productId = productId;
    if (order !== undefined) updateData.order = order;

    const updated = await BlogProduct.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("blogId", "title slug")
      .populate("productId", "name slug images");

    res.status(200).json({
      status: "success",
      message: "Blog product association updated successfully!",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

// Delete blog product
export const deleteBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const blogProduct = await BlogProduct.findByIdAndDelete(id);
    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Blog product association deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

// Get blog product by ID
export const getBlogProductById = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const blogProduct = await BlogProduct.findById(id)
      .populate("blogId", "title slug")
      .populate("productId", "name slug images actualPrice size description");

    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: blogProduct,
    });
  } catch (error) {
    next(error);
  }
});
