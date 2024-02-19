import { FoodTypeFromDB } from "./foodTypes";
import { User } from "./userTypes";

export type RecipeFromDB = {
	totalCaloriesPerServing: number;
	_id: string;
	imageUrl: string;
	name: string;
	description: string;
	prepTime: number;
	servings: number;
	foodType: FoodTypeFromDB;
	createdBy: User;
	ingredients: {
		_id: string;
		quantityForRecipe: number;
		ingredient: {
			calories: number;
			carbs: number;
			category: string;
			fat: number;
			fiber: number;
			name: string;
			protein: number;
			quantity: number;
			unit: string;
			_id: string;
		};
	}[];
	instructions: InstructionFromDB[];
};

export type PostAndPutRecipe = {
	name: string;
	description: string;
	ingredients: { ingredient: string; quantityForRecipe: number }[];
	instructions: NewInstruction[];
	prepTime: number;
	servings: number;
	foodType: string;
	createdBy?: string;
	imageUrl?: string;
	tools: string[];
};

export type NewIngredient = {
	ingredientId: string;
	quantityForRecipe: number;
	name?: string;
	unit?: number;
};

export type NewInstruction = {
	step: number;
	instruction: string;
};
export type InstructionFromDB = {
	_id: string;
	step: number;
	instruction: string;
};
