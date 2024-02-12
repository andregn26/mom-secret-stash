const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const FoodType = require("../models/FoodType.model");

router.get("/all", (req, res, next) => {
	Recipe.find({})
		.populate("createdBy", ["firstName", "lastName", "profileImg"])
		.populate("foodType")
		.then((allRecipes) => res.status(200).json({ message: "All recipes fetched", allRecipes }))
		.catch((error) => next(error));
});

router.post("/create", (req, res, next) => {
	const { imageUrl, name, description, createdBy, instructions, ingredients, prepTime, foodType, servings, tools } = req.body;
	if (name === "") {
		res.status(400).json({ message: "Provide a title for your recipe" });
		return;
	}
	if (foodType === "") {
		res.status(400).json({ message: "Select a food type" });
		return;
	}
	Recipe.findOne({ name })
		.then((recipeFound) => {
			if (recipeFound) {
				res.status(400).json({ message: "The name of your recipe has already been taken" });
				return;
			}
			return Recipe.create({ imageUrl, name, description, createdBy, instructions, ingredients, prepTime, foodType, servings, tools });
		})
		.then((createdRecipe) => {
			return FoodType.findByIdAndUpdate(foodType, { $push: { recipes: createdRecipe._id } }, { new: true });
		})
		.finally(() => {
			res.status(200).json({ message: "Recipe Created and food type updated!" });
		})
		.catch((error) => next(error));
});

router.get("/:recipeId", (req, res, next) => {
	const { recipeId } = req.params;
	Recipe.findById(recipeId)
		.populate("createdBy", ["firstName", "lastName", "profileImg"])
		.populate({
			path: "foodType",
			populate: {
				path: "recipes",
				options: { perDocumentLimit: 5 }, // Limit the number of populated recipes within foodType to 5
			},
		})
		.then((recipeFounded) => (recipeFounded ? res.status(200).json({ recipeFounded }) : res.status(404).json({ message: "Recipe not found!" })))
		.catch((error) => next(error));
});

router.put("/:recipeId/edit", (req, res, next) => {
	const { recipeId } = req.params;
	const { name, description } = req.body;

	if (name === "") {
		res.status(400).json({ message: "Your recipe must have a name!" });
	}
	Recipe.findByIdAndUpdate(
		recipeId,
		{
			name,
			description,
		},
		{ new: true }
	)
		.then((updatedRecipe) => res.status(200).json({ message: "Recipe edited!", updatedRecipe }))
		.catch((error) => {
			if (error.code === 11000) {
				return res.status(400).json({ message: "This name already exists!" });
			}
			next(error);
		});
});

router.delete("/:recipeId/delete", (req, res, next) => {
	const { recipeId } = req.params;

	Recipe.findById(recipeId)
		.then((recipeFounded) => {
			return recipeFounded;
		})
		.then((recipeFounded) => {
			FoodType.findByIdAndUpdate(recipeFounded.foodType._id, { $pull: { recipes: recipeFounded._id } }, { new: true });
		});

	Recipe.findByIdAndDelete(recipeId)
		.then((deletedRecipe) => (deletedRecipe ? res.status(200).json({ deletedRecipe }) : res.status(404).json({ message: "Something went wrong" })))
		.catch((error) => next(error));
});

module.exports = router;
