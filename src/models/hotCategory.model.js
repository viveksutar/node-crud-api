import mongoose, { Schema } from "mongoose";

const hotCategorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HotCategory = mongoose.model("HotCategory", hotCategorySchema);
export default HotCategory;