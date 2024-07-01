import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//import routes here
import authRoutes from "./routes/api/auth.route.js";
import usersRoutes from "./routes/api/user.route.js";
import productRoutes from "./routes/api/product.route.js";
import cartsRoutes from "./routes/api/cart.routes.js";
import orderRoutes from "./routes/api/order.route.js";
import { home } from "./controllers/api/home.controller.js";
import { authenticatedUser } from "./middlewares/auth.middleware.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
//declare routes here
app.use("/api/v1/home", home);
app.use("/api/v1/auth", authRoutes);
app.use(authenticatedUser);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartsRoutes);
app.use("/api/v1/orders", orderRoutes);
// app.use(globalErrorHandler);
export { app };
