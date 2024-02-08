const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const FoodType = require("../models/FoodType.model");


router.post("/create", (req, res, next) => {
	const { name, description, createdBy, instructions, ingredients, prepTime, foodType } = req.body;
	if (name === "") {
		res.status(400).json({ message: "Provide a title for your recipe" });
		return;
	}
	// Check if a recipe with the same name is already in the database
	Recipe.findOne({ name })
		.then((recipeFound) => {
			// if exists, return an error message
			if (recipeFound) {
				res.status(400).json({ message: "The name of your recipe has already been taken" });
				return;
			}
			return Recipe.create({ name, description, createdBy, instructions, ingredients, prepTime , foodType});
		})
		.then((createdRecipe) => {
			return Recipe.findById(createdRecipe._id).populate("createdBy");
		})		
		.then((createdRecipe) => {
			return FoodType.findOneAndUpdate(
				{ name: foodType}, 
				{ $push: { recipes: createdRecipe._id } },
				{new: true}
			)
		}).then(()=> {
			res.status(200).json({ message: "Recipe Created and food type updated!"});
		})
		.catch((error) => next(error));
});

router.get("/:recipeId", (req, res, next) => {
	const { recipeId } = req.params;
	Recipe.findById(recipeId)
		.then((recipeFounded) =>
			recipeFounded ? res.status(200).json({ recipeFounded }) : res.status(404).json({ message: "Recipe not found!" })
		)
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
	Recipe.findByIdAndDelete(recipeId)
		.then((deletedRecipe) =>
			deletedRecipe ? res.status(200).json({ deletedRecipe }) : res.status(404).json({ message: "Something went wrong" })
		)
		.catch((error) => next(error));
});



module.exports = router;
