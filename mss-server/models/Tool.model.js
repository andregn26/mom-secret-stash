const { Schema, model } = require("mongoose");

const toolSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			enum: ["Airfryer", "Oven", "Slow Cook"],
		},
		description: { type: String },
		recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Tool = model("Tool", toolSchema);

module.exports = Tool;
