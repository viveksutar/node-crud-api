import dotenv from "dotenv";
import connectDB from "../src/config/db.config.js";
import { app } from "./app.js";

dotenv.config();  

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on at port : ${process.env.PORT || 8000}`);
    });
    app.on("error", (error) => {
      console.log("Error", error);
    });
    console.log("connected");
  })
  .catch((err) => {
    console.log("conection failed", err);
  });
