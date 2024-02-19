const FoodType = require("../models/FoodType.model");
const Recipe = require("../models/Recipe.model");

const mongoose = require("mongoose");
// Step 2: Update existing users to have the recipeCount property

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mss-server";

mongoose.connect(MONGO_URI);

async function updateFoodTypeRecipes() {
	try {
		// Aggregate recipes by food type
		const recipeByFoodType = await Recipe.aggregate([{ $group: { _id: "$foodType", recipes: { $push: "$_id" } } }]);

		// Update recipes property for each food type
		await Promise.all(
			recipeByFoodType.map(async (foodType) => {
				await FoodType.findByIdAndUpdate(foodType._id, { recipes: foodType.recipes });
			})
		);

		console.log("Recipes updated for each food type successfully.");
	} catch (error) {
		console.error("Error updating recipes for food types:", error);
	} finally {
		mongoose.connection.close();
	}
}

// Call the function
updateFoodTypeRecipes();
