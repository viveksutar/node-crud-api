// src/seeders/product.seeder.js
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Subcategory from "../models/subcategory.model.js";
import HotCategory from "../models/hotCategory.model.js";

// Connect to MongoDB (update with your connection string)

const productSeeder = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Fetch categories and subcategories
    const electricCategory = await Category.findOne({ name: "Electric" });
    const fashionCategory = await Category.findOne({ name: "Fashion" });
    const tvSubcategory = await Subcategory.findOne({ name: "TVs" });
    const clothingSubcategory = await Subcategory.findOne({ name: "Clothing" });
    const hotCategories = await HotCategory.find();

    // Define product seeds
    const productsSeed = [
      {
        name: "Samsung TV",
        description: "A high-definition television",
        price: 599.99,
        discount: 10,
        category: electricCategory._id,
        subcategory: tvSubcategory._id,
        hotCategories:[
          hotCategories[0]._id,
          hotCategories[1]._id,
          hotCategories[2]._id,
        ],
        status: true,
      },
      {
        name: "Nike T-Shirt",
        description: "A comfortable cotton t-shirt",
        price: 29.99,
        discount: 5,
        category: fashionCategory._id,
        subcategory: clothingSubcategory._id,
        hotCategories:[
          hotCategories[2]._id,
          hotCategories[1]._id,
          hotCategories[3]._id,
        ],
        status: true,
      },
    ];

    // Create products
    const products = await Product.insertMany(productsSeed);
    console.log("Products imported:", products);
  } catch (error) {
    console.error("Error importing products:", error);
  } 
};

export { productSeeder };

// const deleteProducts = async () => {
//   try {
//     await Product.deleteMany({});
//     console.log('Products deleted');
//   } catch (error) {
//     console.error('Error deleting products:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// // Parse command line arguments
// const arg = process.argv[2];

// if (arg === '-d') {
//   deleteProducts();
// } else {
//   productSeeder();
// }
