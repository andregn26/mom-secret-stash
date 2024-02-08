const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String },
	ingredients: [{ ingredient: String, quantity: String }],
	instructions: [{ step: Number, instruction: String }],
	imageUrl: { type: String, default: "https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg" },
	prepTime: { type: Number },
	servings: { type: Number },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	foodType: {
		type: String,
		required: true,
		enum: [
			"Breakfasts",
			"Main Courses",
			"Sides",
			"Pasta & Pizza",
			"Seafood",
			"Snacks",
			"Desserts",
			"Appetizers",
			"Condiments",
			"Drinks",
			"Salads",
			"Soups",
		],
	},
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
