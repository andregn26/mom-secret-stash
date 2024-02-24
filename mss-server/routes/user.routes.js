const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Recipe = require("../models/Recipe.model.js");
const User = require("../models/User.model.js");
const userController = require("../controllers/userController");

router.route("/:userId/my-recipes").get(isAuthenticated, userController.getMyRecipes);

router.route("/:userId/favorites").get(isAuthenticated, userController.getMyFavorites);

router.route("/:userId").get(isAuthenticated, userController.getUser);

module.exports = router;
