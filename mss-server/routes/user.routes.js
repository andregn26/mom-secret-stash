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

router.get("/:userId", isAuthenticated, async (req, res, next) => {
	const userId = req.params.userId;

	try {
		const userFound = await User.findById(userId);
		if (!userFound) {
			res.status(404).json({ message: "User not found!" });
		}
		const { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount } = userFound;
		const userDetails = { _id, firstName, lastName, email, profileImg, isUserAdmin, createdRecipesCount };
		res.status(200).json({ message: "User found!", userDetails });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
