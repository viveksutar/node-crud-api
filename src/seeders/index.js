import dotenv from "dotenv";
import connectDB from "../config/db.config.js";
dotenv.config();
connectDB();

//import seeders;
import { categorySeeder } from "./category.seeder.js";
import { productSeeder } from "./product.seeder.js";
import { hotCategorySeeder } from "./hotCategory.seeder.js";
import { admiSeeder } from "./admin.seeder.js";

// declare
const seedAll = async () => {
  try {
    await admiSeeder();
    await categorySeeder();
    await hotCategorySeeder();
    await productSeeder();
    console.log("Seeding completed successfully.");
    process.exit(0); 
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seedAll();
