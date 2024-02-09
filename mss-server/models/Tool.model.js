const { Schema, model } = require("mongoose");

const toolSchema = new Schema(
	{
		name: {
			type: String,
			enum: ["Airfryer", "Oven", "Slow Cook"],
		},
		recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;
