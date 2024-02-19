import { RecipeFromDB } from "./recipeTypes";

export type FoodTypeFromDB = {
	createdAt: string;
	name: string;
	recipes: RecipeFromDB[];
	updatedAt: string;
	_id: string;
};
