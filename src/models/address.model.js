import mongoose, { Schema } from "mongoose";

export const addressSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullAddress: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const Address = mongoose.model('Address',addressSchema);
export default Address;