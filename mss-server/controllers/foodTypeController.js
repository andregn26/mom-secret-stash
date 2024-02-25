const FoodType = require("../models/FoodType.model");

exports.getAllFoodTypes = async (req, res, next) => {
	try {
		const foundedFoodTypes = await FoodType.find({}).populate("recipes");
		res.status(200).json({ debugMessage: "All food types found!", foodType: foundedFoodTypes });
	} catch (error) {
		next(error);
	}
};
