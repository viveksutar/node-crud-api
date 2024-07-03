import { body, param, validationResult } from "express-validator";
import Product from "../../models/product.model.js";
import HotCategory from "../../models/hotCategory.model.js";
import Category from "../../models/category.model.js";
import Subcategory from "../../models/subcategory.model.js";

const validateProductGet = [
  param("id")
    .notEmpty()
    .withMessage("ID parameter is required")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (id, { req }) => {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product does not exist");
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

const validateHotCategoryId = [
  param("hotCategoryId")
    .notEmpty()
    .withMessage("ID parameter is required")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (id, { req }) => {
      const hotCategory = await HotCategory.findById(id);
      if (!hotCategory) {
        throw new Error("Hot Category does not exist");
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

const validateProductCreate = [
  body("name").notEmpty().withMessage("Name feild is required").isString(),
  body("description").isString().optional(),
  body("discount").notEmpty().isNumeric(),
  body("price").notEmpty().isFloat(),
  body("category")
    .isMongoId()
    .optional()
    .custom(async (categoryId, { req }) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }
    }),
  body("subcategory")
    .isMongoId()
    .optional()
    .custom(async (subcategoryId, { req }) => {
      const subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory) {
        throw new Error("Subcategory does not exist");
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

const validateProductUpdate = [
  param("id")
  .notEmpty()
  .withMessage("ID parameter is required")
  .isMongoId()
  .withMessage("Invalid ID format")
  .custom(async (id, { req }) => {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product does not exist");
    }
  }),
  body("name").notEmpty().withMessage("Name feild is required").isString(),
  body("description").isString().optional(),
  body("discount").notEmpty().isNumeric(),
  body("price").notEmpty().isFloat(),
  body("category")
    .isMongoId()
    .optional()
    .custom(async (categoryId, { req }) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }
    }),
  body("subcategory")
    .isMongoId()
    .optional()
    .custom(async (subcategoryId, { req }) => {
      const subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory) {
        throw new Error("Subcategory does not exist");
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
export {
  validateProductGet,
  validateHotCategoryId,
  validateProductCreate,
  validateProductUpdate,
};
