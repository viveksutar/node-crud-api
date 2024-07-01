import Product from "../../models/product.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const productAll = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    // .populate("category","name")
    .populate({ path: "subcategory", model: "Subcategory" })
    .populate({
      path: "category",
      model: "Category",
    });
  return res.json(products);
});

const productGet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate({ path: "subcategory", model: "Subcategory" })
    .populate({
      path: "category",
      model: "Category",
    });
  return res.json(product);
});

const hotCategoryProductsGet = asyncHandler(async (req, res, next) => {
  const { hotCategoryId } = req.params;
  const products = await Product.find({ hotCategories: hotCategoryId });
  if (products) {
    return res.status(200).json({ success: true, data: products });
  }
});

const productCreate = asyncHandler(async (req, res, next) => {
  const { name, description, price, discount, category, subcategory } =
    req.body;

  const product = await Product.create({
    name: name,
    description: description,
    price: price,
    discount: discount,
    category: category,
    subcategory: subcategory,
    status: true,
  });
  if (product) {
    return res.status(200).json({ success: true, data: product });
  }
  return res
    .status(500)
    .json({ success: false, message: "something went wrong" });
});

const productDelete = asyncHandler(async(req,res,next)=>{
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if(product){
    return res.status(200).json({ success: true, message:"Product deleted" });
  }
  return res
    .status(500)
    .json({ success: false, message: "something went wrong" });
})

export { productAll, productGet, hotCategoryProductsGet, productCreate ,productDelete};
