// services/recipeService.js

const Recipe = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");

async function calculateTotalNutrient(recipeId, nutrientType) {
	try {
		const recipe = await Recipe.findById(recipeId).populate("ingredients.ingredient");
		if (!recipe) {
			throw new Error("Recipe not found");
		}
		let totalNutrient = 0;
		for (const ingredientItem of recipe.ingredients) {
			const ingredientFromDB = await Ingredient.findById(ingredientItem.ingredient);
			const ingredientNutrient = ingredientFromDB[nutrientType];
			const ingredientQuantity = ingredientFromDB.quantity;
			const ingredientQuantityForRecipe = ingredientItem.quantityForRecipe;
			totalNutrient += (ingredientNutrient / ingredientQuantity) * ingredientQuantityForRecipe;
		}
		return Number(totalNutrient / recipe.servings).toFixed(1);
	} catch (error) {
		console.error(`Error calculating total ${nutrientType}:`, error.message);
		throw error;
	}
}

module.exports = calculateTotalNutrient;
