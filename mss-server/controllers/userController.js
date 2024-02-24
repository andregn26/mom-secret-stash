const Recipe = require("../models/Recipe.model.js");
const User = require("../models/User.model.js");

exports.getMyRecipes = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const foundedRecipes = await Recipe.find({ createdBy: { $eq: userId } })
			.populate("createdBy")
			.populate("foodType");

		res.status(200).json({ debugMessage: "My recipes fetched successfully!", data: foundedRecipes });
	} catch (error) {
		next(error);
	}
};

exports.getMyFavorites = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const foundedUserFavoriteRecipes = await User.findById(userId, ["firstName", "lastName", "profileImg, favoriteRecipes"])
			.populate("favoriteRecipes")
			.populate({
				path: "favoriteRecipes",
				populate: {
					path: "foodType",
				},
			});
		res.status(200).json({ debugMessage: "My favorite recipes fetched successfully!", data: foundedUserFavoriteRecipes });
	} catch (error) {
		next(error);
	}
};

exports.getUser = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const foundedUser = await User.findById(userId);
		const { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount, aboutMe, favoriteRecipes } = foundedUser;
		const userDetails = { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount, aboutMe, favoriteRecipes };
		res.status(200).json({ debugMessage: "User found!", data: userDetails });
	} catch (error) {
		next(error);
	}
};
