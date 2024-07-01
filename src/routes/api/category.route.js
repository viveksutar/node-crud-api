import { Router } from "express";
import { authenticatedUser } from "../../middlewares/auth.middleware.js";
import { productAll, productGet } from "../../controllers/api/product.controller.js";
import { validateProductGet } from "../../validators/product.validator.js";

const router = Router();
// router.use(authenticatedUser);
router.route("/").get(productAll);
router.route("/:id").get(validateProductGet,productGet);

export default router;
