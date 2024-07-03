import { Router } from "express";
import { authenticatedUser } from "../../middlewares/auth.middleware.js";
import { hotCategoryProductsGet, productAll, productCreate, productDelete, productGet, productUpdate } from "../../controllers/api/product.controller.js";
import { validateProductGet ,validateHotCategoryId, validateProductCreate, validateProductUpdate} from "../../validators/api/product.validator.js";
import { uploadProductImage } from "../../middlewares/uploadProductImage.middleware.js";


const router = Router();
// router.use(authenticatedUser);

router.route("/").get(productAll);
router.route("/create").post(uploadProductImage.array('images',2),validateProductCreate,productCreate);
router.route("/:id").get(validateProductGet,productGet);
router.route("/:id").put(uploadProductImage.none(),validateProductUpdate,productUpdate);
router.route("/:id").delete(validateProductGet,productDelete);
router.route("/hot-products/:hotCategoryId").get(validateHotCategoryId,hotCategoryProductsGet);
export default router;


