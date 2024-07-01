import mongoose from "mongoose";
import Address from "../../models/address.model.js";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const addressCreate = asyncHandler(async (req, res, next) => {
  const { fullAddress, pincode } = req.body;
  const user = await User.findById(req.user?._id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const address = await Address.create({
    user: user._id, // Use the user ID directly
    fullAddress: fullAddress,
    pincode: pincode,
  });
  user.addresses.push(address);
  await user.save();
  return res.status(200).json({ address });
});

const addressUpdate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { fullAddress, pincode } = req.body;
  const address = await Address.findByIdAndUpdate(
    id,
    {
      $set: {
        fullAddress: fullAddress,
        pincode: pincode,
      },
    },
    { new: true }
  );
  if (!address) {
    return res.status(404).json({ error: "Address not found" });
  }
  return res.json({ address });
});

const addressDelete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { fullAddress, pincode } = req.body;
  const address = await Address.findByIdAndDelete(id);
  return res.json({ message: "Address deleted" });
});

export { addressCreate, addressUpdate, addressDelete };
