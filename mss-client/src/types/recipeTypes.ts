import { User } from "./userTypes";

export type Recipe = {
	_id: string;
	name: string;
	description: string;
	createdBy: User;
};

export type RecipeToCreate = {
	name: string;
	description: string;
	ingredients: IngredientToAdd[];
	instructions: Instruction[];
	prepTime: number;
	servings: number;
	foodType: string;
	createdBy?: string;
	imageUrl?: string;
	tools: string[];
};

export type RecipeToEdit = {
	name: string;
	description: string;
};

export type IngredientToAdd = {
	ingredientId: string;
	name?: string;
	quantityForRecipe?: number;
	unit?: number;
};

export type Instruction = {
	step: number;
	instruction: string;
};

export type NewInstruction = {
	step: number;
	instruction: string;
};
