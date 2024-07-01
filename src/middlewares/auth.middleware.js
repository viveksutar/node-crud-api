import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticatedUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //authService.verifyToken(token);
    req.user = decoded; //await userService.findUserById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export { authenticatedUser };
