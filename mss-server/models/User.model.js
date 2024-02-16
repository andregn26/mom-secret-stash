const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "Name is required."],
		},
		lastName: {
			type: String,
			required: [true, "Name is required."],
		},
		email: {
			type: String,
			required: [true, "Email is required."],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required."],
		},
		profileImg: {
			type: String,
			default: "https://res.cloudinary.com/dxxmsbtrt/image/upload/v1650390383/MovieScreen/Users/avatar-profile_af3anp.webp",
		},
		aboutMe: {
			type: String,
		},
		isUserAdmin: {
			type: Boolean,
			default: false,
		},
		createdRecipesCount: {
			type: Number,
			default: 0,
		},
		favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

// Middleware to update createdRecipesCount when a recipe is created
// userSchema.post("save", async function (user) {
// 	const Recipe = require("./Recipe.model"); // Import Recipe model
// 	const count = await Recipe.countDocuments({ createdBy: user._id });
// 	user.createdRecipesCount = count;
// 	await user.save();
// });

const User = model("User", userSchema);

module.exports = User;
