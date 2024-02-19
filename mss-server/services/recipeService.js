// services/recipeService.js

const Recipe = require("../models/Recipe.model");
const Ingredient = require("../models/Ingredient.model");

async function calculateTotalFat(recipeId) {
	try {
		const recipe = await Recipe.findById(recipeId).populate("ingredients.ingredient");
		if (!recipe) {
			throw new Error("Recipe not found");
		}
		let totalFat = 0;
		for (const ingredientItem of recipe.ingredients) {
			const ingredientFromDB = await Ingredient.findById(ingredientItem.ingredient);
			const ingredientCalories = ingredientFromDB.fat;
			const ingredientQuantity = ingredientFromDB.quantity;
			const ingredientQuantityForRecipe = ingredientItem.quantityForRecipe;
			totalFat += (ingredientCalories / ingredientQuantity) * ingredientQuantityForRecipe;
		}
		return Number(totalFat / recipe.servings).toFixed(1);
	} catch (error) {
		console.error("Error calculating total carbs:", error.message);
		throw error;
	}
}

async function calculateTotalCarbs(recipeId) {
	try {
		const recipe = await Recipe.findById(recipeId).populate("ingredients.ingredient");
		if (!recipe) {
			throw new Error("Recipe not found");
		}
		let totalCarbs = 0;
		for (const ingredientItem of recipe.ingredients) {
			const ingredientFromDB = await Ingredient.findById(ingredientItem.ingredient);
			const ingredientCalories = ingredientFromDB.carbs;
			const ingredientQuantity = ingredientFromDB.quantity;
			const ingredientQuantityForRecipe = ingredientItem.quantityForRecipe;
			totalCarbs += (ingredientCalories / ingredientQuantity) * ingredientQuantityForRecipe;
		}
		return Number(totalCarbs / recipe.servings).toFixed(1);
	} catch (error) {
		console.error("Error calculating total carbs:", error.message);
		throw error;
	}
}

async function calculateTotalProtein(recipeId) {
	try {
		const recipe = await Recipe.findById(recipeId).populate("ingredients.ingredient");
		if (!recipe) {
			throw new Error("Recipe not found");
		}
		let totalProtein = 0;
		for (const ingredientItem of recipe.ingredients) {
			const ingredientFromDB = await Ingredient.findById(ingredientItem.ingredient);
			const ingredientCalories = ingredientFromDB.protein;
			const ingredientQuantity = ingredientFromDB.quantity;
			const ingredientQuantityForRecipe = ingredientItem.quantityForRecipe;
			totalProtein += (ingredientCalories / ingredientQuantity) * ingredientQuantityForRecipe;
		}
		return Number(totalProtein / recipe.servings).toFixed(1);
	} catch (error) {
		console.error("Error calculating total protein:", error.message);
		throw error;
	}
}

async function calculateTotalFiber(recipeId) {
	try {
		const recipe = await Recipe.findById(recipeId).populate("ingredients.ingredient");
		if (!recipe) {
			throw new Error("Recipe not found");
		}
		let totalFiber = 0;
		for (const ingredientItem of recipe.ingredients) {
			const ingredientFromDB = await Ingredient.findById(ingredientItem.ingredient);
			const ingredientCalories = ingredientFromDB.fiber;
			const ingredientQuantity = ingredientFromDB.quantity;
			const ingredientQuantityForRecipe = ingredientItem.quantityForRecipe;
			totalFiber += (ingredientCalories / ingredientQuantity) * ingredientQuantityForRecipe;
		}
		return Number(totalFiber / recipe.servings).toFixed(1);
	} catch (error) {
		console.error("Error calculating total fiber:", error.message);
		throw error;
	}
}
module.exports = {
	calculateTotalFat,
	calculateTotalCarbs,
	calculateTotalProtein,
	calculateTotalFiber,
};
