const router = require("express").Router();
const Ingredient = require("../models/Ingredient.model");

router.post("/create", (req, res, next) => {
	const { name, category, quantity, unit, calories, fat, carbs, protein, fiber } = req.body;

	if (name === "") {
		res.status(400).json({ message: "Please give a name to ingredient" });
		return;
	}

	Ingredient.findOne({ name })
		.then((foundedIngredient) => {
			if (foundedIngredient) {
				res.status(400).json({ message: "The name of your ingredient has already been taken" });
				return;
			}
			return Ingredient.create({ name, category, quantity, unit, calories, fat, carbs, protein, fiber })
				.then((createdIngredient) => {
					res.status(200).json({ message: "Ingredient created", createdIngredient });
				})
				.catch((error) => next(error));
		})
		.catch((error) => next(error));
});

router.get("/all", (req, res, next) => {
	Ingredient.find({})
		.then((foundedIngredients) => {
			res.status(200).json({ message: "Ingredients founded", foundedIngredients });
		})
		.catch((error) => next(error));
});

module.exports = router;
