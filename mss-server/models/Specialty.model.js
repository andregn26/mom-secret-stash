const { Schema, model } = require("mongoose");

const specialtySchema = new Schema(
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

const Specialty = model("Specialty", specialtySchema);

module.exports = Specialty;
