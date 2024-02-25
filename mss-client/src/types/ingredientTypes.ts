export type IngredientFromDB = {
	_id?: string;
	name: string;
	category: string;
	quantity: number;
	unit: string;
	calories: number;
	fat: number;
	carbs: number;
	protein: number;
	fiber: number;
};

export type InputsIngredient = {
	name: string;
	category: string;
	quantity: number;
	unit: string;
	calories: number;
	fat: number;
	carbs: number;
	protein: number;
	fiber: number;
};
