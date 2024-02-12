import { Recipe } from "./recipeTypes";

export type FoodType = {
	createdAt: string;
	name: string;
	recipes: Recipe[];
	updatedAt: string;
	_id: string;
};
