const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Recipe = require("../models/Recipe.model.js");

router.get("/:userId/my-recipes", isAuthenticated, (req, res, next) => {
	const userId = req.params.userId;
	Recipe.find({ createdBy: { $eq: userId } })
		.populate("createdBy")
		.populate("foodType")
		.then((foundRecipes) => {
			res.status(200).json({ message: "all good!", recipes: foundRecipes });
		});
});

module.exports = router;
