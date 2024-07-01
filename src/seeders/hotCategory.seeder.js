// src/seeders/category.seeder.js

import HotCategory from "../models/hotCategory.model.js";

const hotCategorySeeder = async () => {
  const categories = [
    "Hot Seller",
    "Great Discounts",
    "Trendings",
    "New Arrivals",
  ];
  try {
    await HotCategory.deleteMany(); // Optional: clear the collection first
    const categoryPromises = categories.map((name) => ({ name }));
    
    await HotCategory.insertMany(categoryPromises);
    console.log("Hot categories seeded successfully");
  } catch (error) {
    console.error("Error importing hot categories ", error);
  }
};
export { hotCategorySeeder };

// Parse command line arguments
// const arg = process.argv[2];

// if (arg === "-d") {
//   deleteCategories();
// } else {
//   categorySeeder();
// }
