const router = require("express").Router();
const FoodType = require("../models/FoodType.model");



router.get("/all", (req, res, next) => {
	FoodType.find({}).populate("recipes")
		.then((foodTypeFound) => {
			return res.status(200).json({ message: "All food types found!", foodType: foodTypeFound });
		})
		.catch((error) => next(error));
});

module.exports = router
