import mongoose, { Schema } from "mongoose";

const subcategorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category:{
      type: Schema.Types.ObjectId,
      ref:"Category"
    }
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
