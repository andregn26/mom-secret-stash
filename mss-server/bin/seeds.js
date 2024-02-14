const mongoose = require("mongoose");

const FoodType = require("../models/FoodType.model");

// User.collection.drop();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mss-server";

mongoose.connect(MONGO_URI);

const foodType = [
	{ name: "Breakfasts" },
	{ name: "Main Courses" },
	{ name: "Sides" },
	{ name: "Pasta & Pizza" },
	{ name: "Seafood" },
	{ name: "Snacks" },
	{ name: "Desserts" },
	{ name: "Appetizers" },
	{ name: "Condiments" },
	{ name: "Drinks" },
	{ name: "Salads" },
	{ name: "Soups" },
];

FoodType.create(foodType)
	.then((dbFoodTypes) => {
		console.log(`Created ${dbFoodTypes.length} food types`);
		mongoose.connection.close();
	})
	.catch((err) => console.log(`An error occurred while creating fake food types in the DB: ${err}`));
