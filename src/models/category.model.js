import mongoose, { Schema } from "mongoose";
import Subcategory from "./subcategory.model.js";
const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
