const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	ingredients: [String],
	instructions: [String],
	imageUrl: { type: String },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	dependencies: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	foodType: [{ type: Schema.Types.ObjectId, ref: "FoodType" }],
	tools: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
	specialty: [{ type: Schema.Types.ObjectId, ref: "Specialty" }],
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
