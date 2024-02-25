const router = require("express").Router();
const foodTypeController = require("../controllers/foodTypeController");

router.route("/all").get(foodTypeController.getAllFoodTypes);

module.exports = router;
