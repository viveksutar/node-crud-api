import { Router } from "express";
import { authenticatedUser } from "../../middlewares/auth.middleware.js";
import { hotCategoryProductsGet, productAll, productCreate, productDelete, productGet } from "../../controllers/api/product.controller.js";
import { validateProductGet ,validateHotCategoryId, validateProductCreate} from "../../validators/api/product.validator.js";

const router = Router();
// router.use(authenticatedUser);
router.route("/").get(productAll);
router.route("/create").post(validateProductCreate,productCreate);
router.route("/:id").get(validateProductGet,productGet);
router.route("/:id").delete(validateProductGet,productDelete);
router.route("/hot-products/:hotCategoryId").get(validateHotCategoryId,hotCategoryProductsGet);
export default router;
