const router = require("express").Router();
const authController = require("../controllers/authController");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { upload, handleUpload } = require("../config/cloudinary.js");

// POST /auth/signup  - Creates a new user in the database
router.route("/signup").post(authController.postSignup);

// POST  /auth/login - Verifies email and password and returns a JWT
router.route("/login").post(authController.postLogin);

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.route("/verify").get(isAuthenticated, authController.getVerify);

// router.route("/upload").post(authController.postUploadProfileImg);

router.post("/upload", upload.single("my_file"), async (req, res) => {
	try {
		const b64 = Buffer.from(req.file.buffer).toString("base64");
		let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
		const cldRes = await handleUpload(dataURI);
		res.json(cldRes);
		console.log("ok");
	} catch (error) {
		console.log(error);
		res.send({
			message: error.message,
		});
	}
});

module.exports = router;
