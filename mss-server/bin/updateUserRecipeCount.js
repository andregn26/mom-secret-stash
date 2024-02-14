const User = require("../models/User.model"); // Import your User model
const Recipe = require("../models/Recipe.model"); // Import your User model
const mongoose = require("mongoose");
// Step 2: Update existing users to have the recipeCount property

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mss-server";

mongoose.connect(MONGO_URI);

const updateUsers = async () => {
	try {
		const users = await User.find({}); // Fetch all users

		for (const user of users) {
			const recipeCount = await Recipe.countDocuments({ createdBy: user._id }); // Count recipes created by the user

			// Update the user's recipeCount field
			user.createdRecipesCount = recipeCount;

			// Save the updated user
			await user.save();

			console.log(`Updated recipe count for user ${user.firstName}: ${recipeCount}`);
		}
	} catch (error) {
		console.error("Error finding or updating users:", error);
	} finally {
		mongoose.connection.close();
	}
};

updateUsers();
