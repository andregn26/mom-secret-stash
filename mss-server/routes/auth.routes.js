const router = require("express").Router();
const authController = require("../controllers/authController");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// POST /auth/signup  - Creates a new user in the database
router.route("/signup").post(authController.postSignup);

// POST  /auth/login - Verifies email and password and returns a JWT
router.route("/login").post(authController.postLogin);

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.route("/verify").get(isAuthenticated, authController.getVerify);

module.exports = router;
