import mongoose, { Schema } from "mongoose";
import Category from "./category.model.js";
import Subcategory from "./subcategory.model.js";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variant",
      },
    ],
    hotCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "HotCategory",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

productSchema.virtual("discounted_price").get(function () {
  let value = this.price;
  if (this.discount) {
    value = Math.round(this.price - (this.price * this.discount) / 100);
  }
  return value;
});

const Product = mongoose.model("Product", productSchema);
export { productSchema };
export default Product;
