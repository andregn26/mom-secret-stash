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
	instructions: Instruction[];
	ingredients: Ingredient[];
	createdBy?: string;
	foodType:string
};

export type RecipeToEdit = {
	name: string;
	description: string;
};

export type Ingredient = {
	ingredient: string;
	quantity: string;
};

export type Instruction = {
	step: number;
	instruction: string;
};
