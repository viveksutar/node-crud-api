import { body, check, validationResult } from "express-validator";
import User from "../../models/user.model.js";
import Admin from "../../models/admin.model.js";

const validateRegister = [
  body("fullName").notEmpty().trim(),
  body("email")
    .notEmpty()
    .isEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email Already Exists");
      }
    }),
  body("password", "Password must be 6 or more character").notEmpty().isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// const validateLogin = [
//   body("email")
//     .notEmpty()
//     .isEmail()
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (!user) {
//         throw new Error("Invalid Email please register first");
//       }
//     }),
//   body("password", "Password must be 6 or more character").notEmpty().isLength({
//     min: 6,
//   }),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

const validateLogin = [
  body("username")
    .notEmpty()
    .custom(async (username) => {
      const user = await Admin.findOne({ username });
      if (!user) {
        throw new Error("Invalid Username please register first");
      }
    }),
  body("password", "Password must be 6 or more character").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRegister ,validateLogin};
