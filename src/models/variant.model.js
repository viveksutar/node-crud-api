import { Double } from "mongodb";
import mongoose, { Schema } from "mongoose";

const variantSchema = Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Double,
      required: true,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
