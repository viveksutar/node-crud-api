import Category from "../../models/category.model";
import { asyncHandler } from "../../utils/asyncHandler";

const categoryAll = asyncHandler(async(req,res,next)=>{
    const catagories = Category.find();
})