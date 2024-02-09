const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
	name: { type: String, required: true, unique: true },
	category: {
		type: String,
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
	quantity: Number,
	unit: {
		type: String,
		enum: ["Cup", "Gallon", "Gram", "Liter", "Milliliter", "Tablespoon", "Teaspoon", "Whole"],
	},
	calories: Number,
	Fat: Number,
	Carbs: Number,
	Protein: Number,
	Fiber: Number,
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
