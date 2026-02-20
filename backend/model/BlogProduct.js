import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogProductSchema = new Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogProductSchema.index({ blogId: 1, productId: 1 }, { unique: true });
blogProductSchema.index({ blogId: 1, order: 1 });
blogProductSchema.index({ productId: 1 });

export const BlogProduct = mongoose.model("BlogProduct", blogProductSchema);
