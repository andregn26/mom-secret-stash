const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const FoodType = require("../models/FoodType.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/all", (req, res, next) => {
	Recipe.find({})
		.populate("createdBy", ["firstName", "lastName", "profileImg"])
		.populate("foodType")
		.then((allRecipes) => res.status(200).json({ message: "All recipes fetched", allRecipes }))
		.catch((error) => next(error));
});

router.post("/create", async (req, res, next) => {
	const { imageUrl, name, description, createdBy, instructions, ingredients, prepTime, foodType, servings, tools } = req.body;
	if (name === "") {
		res.status(400).json({ message: "Provide a title for your recipe" });
		return;
	}
	if (foodType === "") {
		res.status(400).json({ message: "Select a food type" });
		return;
	}

	try {
		const foundedOneRecipe = await Recipe.findOne({ name });
		if (foundedOneRecipe) {
			res.status(400).json({ message: "The name of your recipe has already been taken" });
			return;
		}
		const createdRecipe = await Recipe.create({
			imageUrl,
			name,
			description,
			createdBy,
			instructions,
			ingredients,
			prepTime,
			foodType,
			servings,
			tools,
		});
		const foundCreatedRecipe = await Recipe.findById(createdRecipe._id).populate("ingredients.ingredient");
		const updatedFoodType = await FoodType.findByIdAndUpdate(foodType, { $push: { recipes: createdRecipe._id } }, { new: true });
		const recipeCreator = await User.findByIdAndUpdate(createdBy, { $inc: { createdRecipesCount: 1 } });
		return res.status(200).json({ message: "Recipe Created!", updatedFoodType, foundCreatedRecipe, recipeCreator });
	} catch (error) {
		next(error);
	}
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
		.populate("ingredients.ingredient")
		.then((recipeFounded) => (recipeFounded ? res.status(200).json({ recipeFounded }) : res.status(404).json({ message: "Recipe not found!" })))
		.catch((error) => next(error));
});

router.put("/:recipeId/edit", (req, res, next) => {
	const { recipeId } = req.params;
	const { imageUrl, name, description, prepTime, servings, tools, foodType, instructions, ingredients } = req.body;

	if (name === "") {
		res.status(400).json({ message: "Your recipe must have a name!" });
	}
	Recipe.findByIdAndUpdate(
		recipeId,
		{
			imageUrl,
			name,
			description,
			prepTime,
			servings,
			tools,
			instructions,
			ingredients,
			foodType,
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

router.delete("/:recipeId/delete", async (req, res, next) => {
	const { recipeId } = req.params;

	try {
		const recipeFounded = await Recipe.findById(recipeId);
		await Promise.all([
			FoodType.findByIdAndUpdate(recipeFounded.foodType, { $pull: { recipes: recipeFounded._id } }, { new: true }),
			Recipe.findByIdAndDelete(recipeId),
			User.findByIdAndUpdate(recipeFounded.createdBy, { $inc: { createdRecipesCount: -1 } }),
		]);
		res.status(200).json({ message: "Recipe deleted successfully" });
	} catch (error) {
		next(error);
	}
});

router.put("/:recipeId/addToFavorite", isAuthenticated, async (req, res, next) => {
	const { recipeId } = req.params;
	try {
		const userFounded = await User.findById(req.payload._id);
		if (!userFounded) {
			res.status(404).json({ message: "User not found!" });
			return;
		}
		const foundedRecipe = await Recipe.findById(recipeId);
		if (!foundedRecipe) {
			res.status(404).json({ message: "Recipe not found!" });
			return;
		}

		const isRecipeAlreadyInFavorite = userFounded.favoriteRecipes.includes(foundedRecipe._id);
		if (isRecipeAlreadyInFavorite) {
			res.status(404).json({ message: "Recipe is already in your favorite list." });
			return;
		}

		const updatedRecipeFavoriteList = await User.findByIdAndUpdate(req.payload._id, { $push: { favoriteRecipes: foundedRecipe._id } }, { new: true });
		const updatedRecipeFavoriteListCount = await Recipe.findByIdAndUpdate(recipeId, { $inc: { favoriteCount: +1 } }, { new: true });

		res.status(200).json({
			message: "Added recipe to favorite list",
			debugMessage: "Added recipe and incremented count in recipe favorite count.",
			updatedRecipeFavoriteList,
			updatedRecipeFavoriteListCount: updatedRecipeFavoriteListCount.favoriteCount,
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:recipeId/removeFromFavorite", isAuthenticated, async (req, res, next) => {
	const { recipeId } = req.params;
	try {
		const userFounded = await User.findById(req.payload._id);
		if (!userFounded) {
			res.status(404).json({ message: "User not found!" });
			return;
		}
		const foundedRecipe = await Recipe.findById(recipeId);
		if (!foundedRecipe) {
			res.status(404).json({ message: "Recipe not found!" });
			return;
		}

		const isRecipeAlreadyInFavorite = userFounded.favoriteRecipes.includes(foundedRecipe._id);
		if (!isRecipeAlreadyInFavorite) {
			res.status(404).json({ message: "Recipe is not in your favorite list." });
			return;
		}

		const updatedRecipeFavoriteList = await User.findByIdAndUpdate(req.payload._id, { $pull: { favoriteRecipes: foundedRecipe._id } }, { new: true });
		const updatedRecipeFavoriteListCount = await Recipe.findByIdAndUpdate(recipeId, { $inc: { favoriteCount: -1 } }, { new: true });

		res.status(200).json({
			message: "Removed recipe from favorite list",
			debugMessage: "Removed recipe and decremented count in recipe favorite count.",
			updatedRecipeFavoriteList,
			updatedRecipeFavoriteListCount: updatedRecipeFavoriteListCount.favoriteCount,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
