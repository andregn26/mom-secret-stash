const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const ingredientsRoutes = require("./ingredients.routes");
const recipesRoutes = require("./recipes.routes");
const foodTypes = require("./foodTypes.routes");
const userRoutes = require("./user.routes");
const { upload } = require("../config/cloudinary.js");
const uploadController = require("../controllers/uploadController");

// path is api/...

router.get("/", (req, res, next) => {
	res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/ingredients", ingredientsRoutes);
router.use("/recipe", recipesRoutes);
router.use("/food-types", foodTypes);
router.use("/profile", userRoutes);

router.route("/upload").post(upload.single("my_file"), uploadController.postUpload);

module.exports = router;
