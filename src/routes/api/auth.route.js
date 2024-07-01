import { Router } from "express";
import {
  validateLogin,
  validateRegister,
} from "../../validators/api/auth.validator.js";
import { loginUser, registerUser } from "../../controllers/api/auth.controller.js";

const router = Router();

router.route("/register").post(validateRegister, registerUser);
router.route("/login").post(validateLogin, loginUser);

export default router;
