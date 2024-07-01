// src/seeders/category.seeder.js
import Category from "../models/category.model.js";
import Subcategory from "../models/subcategory.model.js";

const categorySeeder = async () => {
  try {
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    const categoriesSeed = [
      {
        name: "Electric",
        subcategories: [{ name: "TVs" }, { name: "Laptops" }],
      },
      {
        name: "Fashion",
        subcategories: [{ name: "Clothing" }, { name: "Accessories" }],
      },
    ];

    for (let categoryData of categoriesSeed) {
      const { name, subcategories } = categoryData;

      // Create category
      const category = new Category({ name });
      await category.save();

      // Create and associate subcategories
      for (let subcategoryData of subcategories) {
        const subcategory = new Subcategory({
          ...subcategoryData,
          category: category._id,
        });
        await subcategory.save();
        category.subcategories.push(subcategory._id);
      }

      await category.save();
    }

    console.log("Categories and subcategories imported successfully.");
  } catch (error) {
    console.error("Error importing categories and subcategories:", error);
  } 
};
export { categorySeeder };

// Parse command line arguments
// const arg = process.argv[2];

// if (arg === "-d") {
//   deleteCategories();
// } else {
//   categorySeeder();
// }
