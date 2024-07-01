import { Router } from "express";
import { validateCartAdd, validateCartItem } from "../../validators/api/cart.validator.js";
import { cartAddItems, cartDeleteItem, cartItems } from "../../controllers/api/cart.controller.js";

const router = Router();
// router.use(authenticatedUser);
router.route("/").get(cartItems);
router.route("/add").post(validateCartAdd, cartAddItems);
router.route("/:cartItemId").delete(validateCartItem, cartDeleteItem);

export default router;