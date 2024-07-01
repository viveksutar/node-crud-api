import { body, param, validationResult } from "express-validator";
import Product from "../../models/product.model.js";
import AppError from "../../utils/appError.js";
const validateCartAdd = [
  body("cart.*.productId")
    .notEmpty()
    .withMessage("Product ID should not be empty")
    .isMongoId()
    .withMessage("Product ID must be a valid Mongo ID")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not exists");
      }
    }),
  body("cart.*.quantity").notEmpty()
  .withMessage("Quantity required")
  .isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, 
];

const validateCartItem = [
  param("cartItemId")
    .notEmpty()
    .custom(async (cartItemId) => {
      const cart = await Cart.findById(cartItemId);
      if (!cart) {
        throw new Error("Cart item id not found");
        // return next(new AppError('Item Not Found', 404));
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateCartAdd, validateCartItem };
