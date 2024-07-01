import mongoose, { Schema } from "mongoose";
import Address, { addressSchema } from "./address.model.js";
import { productSchema } from "./product.model.js";


const orderItemSchema = new Schema(
  {
    product: {
      type: productSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: addressSchema,
    deliveryCharges: {
      type: Number,
      required: true,
    },
    discountedAmount: {
      type: Number,
      default: 0,
    },

    paymentMode: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
      ],
      default: "Pending",
    },
    orderedDate: {
      type: Date,
      default: Date.now,
    },
    orderStatusDate: {
      type: Date,
    },
    // orderItems:[
    //   {
    //     product:productSchema,
    //     price:{
    //       type:Number,
    //       required:true
    //     },
    //     quantity:{
    //       type:Number,
    //       required:true
    //     },
    //     totalAmount:{
    //       type:Number,
    //       required:true
    //     }
    //   }
    // ]
    orderItems: [orderItemSchema],
    orderTotal :{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
