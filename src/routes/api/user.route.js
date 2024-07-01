import { Router } from "express";
import { authenticatedUser } from "../../middlewares/auth.middleware.js";
import { addressCreate, addressDelete, addressUpdate } from "../../controllers/api/user.controller.js";
import { validateAddressCreate, validateAddressDelete, validateAddressUpdate } from "../../validators/api/user.validator.js";

const router = Router();
// router.use(authenticatedUser)
router.route("/address/create").post(validateAddressCreate,addressCreate);
router.route("/address/:id").put(validateAddressUpdate,addressUpdate);
router.route("/address/:id").delete(validateAddressDelete,addressDelete);

export default router;
