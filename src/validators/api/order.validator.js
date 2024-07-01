import { body, check, validationResult } from "express-validator";
import User from "../../models/user.model.js";

const validateOrderCreate = [
  body("addressId")
    .notEmpty()
    .isMongoId()
    .withMessage('This id is not')
    .custom(async (addressId, { req }) => {
      const userId = req.user._id;
      const user = await User.findOne({
        _id: req.user._id,
        addresses: addressId,
      });
      if (!user) {
        throw new Error("Address not found");
      }
    }),
  // (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   next();
  // },
];

export { validateOrderCreate };
