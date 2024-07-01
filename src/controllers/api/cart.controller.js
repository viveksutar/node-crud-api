import Cart from "../../models/cart.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const cartItems = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const items = await Cart.find({ user: user?._id }).populate("product");
  return res.status(200).json(items);
});

const cartAddItems = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;
  const user = req.user;
  const cartItems = cart.map((item) => ({
    user: user._id,
    product: item.productId,
    quantity: item.quantity,
  }));
  const cartModel = await Cart.insertMany(cartItems);
  return res.status(200).json(cartModel);
});

const cartDeleteItem = asyncHandler(async (req, res, next) => {
  const { cartItemId } = req.params;
  const itemDelete = await Cart.findByIdAndDelete(cartItemId);
  return res.status(200).json(itemDelete);
});

export { cartItems, cartAddItems, cartDeleteItem };
