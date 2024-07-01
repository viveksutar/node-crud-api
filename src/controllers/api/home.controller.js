import Category from "../../models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import HotCategory from "../../models/hotCategory.model.js";
import mongoose from "mongoose";
import Product from "../../models/product.model.js";

const home = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  const hotCategories = await HotCategory.find();
  const hotCategoriesWithProducts = await Promise.all(
    hotCategories
      .filter((hotCategory) => hotCategory.name !== "New Arrivals")
      .map(async (hotCategory) => {
        const products = await Product.find({ hotCategories: hotCategory._id });
        return {
          ...hotCategory.toObject(),
          products,
        };
      })
  );
  return res
    .status(200)
    .json({ success: true, data: { categories, hotCategoriesWithProducts } });
  if (categories) {
    return res.status(200).json({ categories });
  }
});

export { home };
