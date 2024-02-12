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
		isUserAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;
