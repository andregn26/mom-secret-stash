const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
	name: { type: String, required: true, unique: true },
	category: {
		type: String,
		enum: [
			"Grocery",
			"Bio & Nutrition",
			"Laticionios e Ovos",
			"Dairy and Eggs",
			"Fruits and vegetables",
			"Charcuterie and Cheese",
			"Bakery and Pastry",
			"Frozen",
			"Drinks and Wine Racks",
		],
	},
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
