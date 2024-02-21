const router = require("express").Router();
const Ingredient = require("../models/Ingredient.model");
const { isAuthenticated, isUserAdmin } = require("../middleware/jwt.middleware.js");

router.post("/create", isAuthenticated, isUserAdmin, (req, res, next) => {
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
		.sort({ updatedAt: -1 })
		.then((foundedIngredients) => {
			res.status(200).json({ message: "Ingredients founded", foundedIngredients });
		})
		.catch((error) => next(error));
});

router.put("/edit/:ingredientId", isAuthenticated, isUserAdmin, (req, res, next) => {
	const { ingredientId } = req.params;
	console.log("reqPayload", req.payload);
	const { name, category, quantity, unit, calories, fat, carbs, protein, fiber } = req.body;

	if (name === "") {
		res.status(400).json({ message: "Please give a name to ingredient" });
		return;
	}

	if (category === "" || unit === "") {
		res.status(400).json({ message: "Please select a valid value for category and unit" });
		return;
	}

	Ingredient.findByIdAndUpdate(ingredientId, { name, category, quantity, unit, calories, fat, carbs, protein, fiber }, { new: true })
		.then((updatedIngredient) => {
			res.status(201).json({ message: "Ingredient updated!", updatedIngredient });
		})
		.catch((error) => {
			if (error.code === 11000) {
				res.status(404).json({ message: "This name is already taken" });
				return;
			}

			res.status(404).json({ message: "Something went wrong!" });
		});
});

router.delete("/delete/:ingredientId", isAuthenticated, isUserAdmin, (req, res, next) => {
	const { ingredientId } = req.params;

	Ingredient.findByIdAndDelete(ingredientId)
		.then((deletedIngredient) => {
			res.status(200).json({ message: "Ingredient deleted!", deletedIngredient });
		})
		.catch((error) => {
			console.log(error);
			res.status(404).json({ message: "Ups! The ingredient was not deleted" });
		});
});

router.get("/:ingredientId", (req, res, next) => {
	const { ingredientId } = req.params;

	Ingredient.findById(ingredientId)
		.then((foundedIngredient) => {
			res.status(200).json({ message: "Ingredient founded!", foundedIngredient });
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = router;
