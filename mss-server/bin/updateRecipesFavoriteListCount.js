const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

const mongoose = require("mongoose");
// Step 2: Update existing users to have the recipeCount property

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mss-server";

mongoose.connect(MONGO_URI);

async function updateFavoriteCount() {
	try {
		const recipeCounts = await User.aggregate([
			{ $unwind: "$favoriteRecipes" }, // Unwind the favoriteRecipes array
			{ $group: { _id: "$favoriteRecipes", count: { $sum: 1 } } }, // Group by recipe and count occurrences
		]);

		// Update the favoriteCount for each recipe
		await Promise.all(
			recipeCounts.map(async (recipeCount) => {
				await Recipe.findByIdAndUpdate(recipeCount._id, { favoriteCount: recipeCount.count }, { new: true });
			})
		);

		console.log("Favorite counts updated successfully.");
	} catch (error) {
		console.error("Error updating favorite counts:", error);
	} finally {
		mongoose.connection.close();
	}
}

// Call the function
updateFavoriteCount();
