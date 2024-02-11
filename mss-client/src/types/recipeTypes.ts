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
	ingredients: Ingredient[];
	instructions: Instruction[];
	prepTime: number;
	servings: number;
	foodType: string;
	createdBy?: string;
	imageUrl?: string;
};

export type RecipeToEdit = {
	name: string;
	description: string;
};

export type Ingredient = {
	ingredient: string;
	quantity: number;
	measure: string;
};

export type Instruction = {
	step: number;
	instruction: string;
};
