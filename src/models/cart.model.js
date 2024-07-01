import mongoose, { Schema } from "mongoose";
import Product from "./product.model.js";
const cartSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

cartSchema.virtual("total").get(function () {
  let value = 0;
  if (this.product) {
    value = Math.round(this.product.discounted_price * this.quantity);
  }
  return value;
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
