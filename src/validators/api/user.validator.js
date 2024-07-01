import { body, param, validationResult } from "express-validator";
import Address from "../../models/address.model.js";

const validateAddressCreate = [
  body("fullAddress").notEmpty(),
  body("pincode").isNumeric().notEmpty().isLength({
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
const validateAddressUpdate = [
  param("id")
    .notEmpty()
    .withMessage("ID parameter is required")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (id, { req }) => {
      const address = await Address.findOne({ _id: id, user: req.user?._id });
      if (!address) {
        throw new Error("Address does not exist");
      }
    }),

  body("fullAddress").notEmpty(),
  body("pincode").isNumeric().notEmpty().isLength({
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

const validateAddressDelete = [
  param("id")
    .notEmpty()
    .withMessage("ID parameter is required")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (id, { req }) => {
      const address = await Address.findOne({ _id: id, user: req.user?._id });
      if (!address) {
        throw new Error("Address does not exist");
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

export { validateAddressCreate, validateAddressUpdate ,validateAddressDelete};
