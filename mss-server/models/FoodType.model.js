const { Schema, model } = require("mongoose");

const foodTypeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
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
		description: { type: String },
		recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const FoodType = model("FoodType", foodTypeSchema);

module.exports = FoodType;
