import { Router } from "express";
import { orderCreate } from "../../controllers/api/order.controller.js";
import { validateOrderCreate } from "../../validators/api/order.validator.js";

const router = Router();

router.route('/create').post(validateOrderCreate,orderCreate)

export default router