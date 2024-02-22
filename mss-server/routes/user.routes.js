const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Recipe = require("../models/Recipe.model.js");
const User = require("../models/User.model.js");

router.get("/:userId/my-recipes", isAuthenticated, (req, res, next) => {
	const userId = req.params.userId;
	Recipe.find({ createdBy: { $eq: userId } })
		.populate("createdBy")
		.populate("foodType")
		.then((foundRecipes) => {
			res.status(200).json({ message: "all good!", recipes: foundRecipes });
		});
});

router.get("/:userId/favorites", isAuthenticated, async (req, res, next) => {
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
		if (!foundedUserFavoriteRecipes) {
			res.status(404).json({ debugMessage: "The id provided doesn't match with any user in the DB" });
			return;
		}
		res.status(200).json({ debugMessage: "all good!", foundedUserFavoriteRecipes });
	} catch (error) {
		next(error);
	}
});

router.get("/:userId", isAuthenticated, async (req, res, next) => {
	const userId = req.params.userId;

	try {
		const userFound = await User.findById(userId);
		if (!userFound) {
			res.status(404).json({ message: "User not found!" });
		}
		const { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount, aboutMe, favoriteRecipes } = userFound;
		const userDetails = { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount, aboutMe, favoriteRecipes };
		res.status(200).json({ message: "User found!", userDetails });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
