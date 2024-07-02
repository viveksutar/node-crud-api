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
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Transform the images field to include full URLs
        if (ret.images) {
          ret.images = ret.images.map(image => process.env.BASE_URL +'/'+ image);
        }
        return ret;
      },
    },
    timestamps: true,
  }
);

productSchema.virtual("discounted_price").get(function () {
  let value = this.price;
  if (this.discount) {
    value = Math.round(this.price - (this.price * this.discount) / 100);
  }
  return value;
});

// Virtual for image URLs
// productSchema.virtual("images").get(function () {
//   return this.images.map((image) => process.env.APP_URL + image);
// });

const Product = mongoose.model("Product", productSchema);
export { productSchema };
export default Product;
