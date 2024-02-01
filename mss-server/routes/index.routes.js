const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const { upload } = require("../config/cloudinary.js");
const uploadController = require("../controllers/uploadController");

// path is api/...

router.get("/", (req, res, next) => {
	res.json("All good in here");
});

router.use("/auth", authRoutes);

router.route("/upload").post(upload.single("my_file"), uploadController.postUpload);

module.exports = router;
