const router = require("express").Router();
const authController = require("../controllers/authController");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
async function handleUpload(file) {
	const res = await cloudinary.uploader.upload(file, {
		resource_type: "auto",
	});
	return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
	storage,
});

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
