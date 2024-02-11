const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
	name: { type: String, required: true, unique: true },
	category: {
		type: String,
		required: true,
		enum: [
			"Grocery",
			"Bio & Nutrition",
			"Fishery and Butchery",
			"Dairy and Eggs",
			"Fruits and vegetables",
			"Charcuterie and Cheese",
			"Bakery and Pastry",
			"Frozen",
			"Drinks and Wine Racks",
		],
	},
	quantity: { type: Number, required: true },
	unit: {
		type: String,
		required: true,
		enum: ["Cup", "Gallon", "Gram", "Liter", "Milliliter", "Tablespoon", "Teaspoon", "Whole"],
	},
	calories: { type: Number, required: true },
	fat: { type: Number, required: true },
	carbs: { type: Number, required: true },
	protein: { type: Number, required: true },
	fiber: { type: Number, required: true },
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
