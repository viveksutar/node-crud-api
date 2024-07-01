import Admin from "../../models/admin.model.js";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (user) {
    user.token = user.generateAccessToken();
    await user.save();
    return res.json({ user, message: "Registered successfully" });
  }
  return res.status(500).json({ message: "User Not created" });
});

// const loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   const isPasswordCorrect = await user.isPasswordCorrect(password);
//   if (isPasswordCorrect) {
//     user.token = user.generateAccessToken();
//     await user.save();
    
//     return res.status(200).json({ user });
//   }
//   return res.status(400).json({ error: "Password is invalid" });
// });

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (isPasswordCorrect) {
    user.token = user.generateAccessToken();
    await user.save();
    
    return res.status(200).json({ user });
  }
  return res.status(400).json({ error: "Password is invalid" });
});

export { registerUser, loginUser };
