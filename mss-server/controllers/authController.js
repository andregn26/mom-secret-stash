const User = require("../models/User.model");
const bcrypt = require("bcrypt");
// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
	const { firstName, lastName, email, password, profileImg } = req.body;
	try {
		// Check if email or password or name are provided as empty strings
		if (email === "" || password === "" || firstName === "" || lastName === "") {
			res.status(400).json({ message: "Provide email, password and name" });
			return;
		}

		// This regular expression check that the email is of a valid format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (!emailRegex.test(email)) {
			res.status(400).json({ message: "Provide a valid email address." });
			return;
		}

		// This regular expression checks password for special characters and minimum length
		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		if (!passwordRegex.test(password)) {
			res.status(400).json({
				message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
			});
			return;
		}

		// Check the users collection if a user with the same email already exists
		User.findOne({ email })
			.then((foundUser) => {
				// If the user with the same email already exists, send an error response
				if (foundUser) {
					res.status(400).json({ message: "User already exists." });
					return;
				}
				// How many rounds should bcrypt run the salt (default - 10 rounds)
				const saltRounds = 10;
				// If email is unique, proceed to hash the password
				const salt = bcrypt.genSaltSync(saltRounds);
				const hashedPassword = bcrypt.hashSync(password, salt);
				// Create the new user in the database
				// We return a pending promise, which allows us to chain another `then`
				return User.create({ firstName, lastName, email, password: hashedPassword, profileImg });
			})
			.then((createdUser) => {
				// Deconstruct the newly created user object to omit the password
				// We should never expose passwords publicly
				const { email, firstName, lastName, _id } = createdUser;
				// Create a new object that doesn't expose the password
				const user = { email, firstName, lastName, _id, profileImg };
				// Send a json response containing the user object
				res.status(201).json({ message: "User created!", user: user });
			})
			.catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
	} catch (error) {}
};

exports.postLogin = async (req, res, next) => {
	const { email, password } = req.body;
	// Check if email or password are provided as empty string
	if (email === "" || password === "") {
		res.status(400).json({ message: "Provide email and password." });
		return;
	}
	// Check the users collection if a user with the same email exists
	User.findOne({ email })
		.then((foundUser) => {
			console.log("🚀 ~ .then ~ foundUser:", foundUser);
			if (!foundUser) {
				// If the user is not found, send an error response
				res.status(401).json({ message: "User not found." });
				return;
			}
			// Compare the provided password with the one saved in the database
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
			if (passwordCorrect) {
				// Deconstruct the user object to omit the password
				const { _id, email, firstName, lastName, profileImg } = foundUser;
				// Create an object that will be set as the token payload
				const payload = { _id, email, firstName, lastName, profileImg };
				// Create a JSON Web Token and sign it
				const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: "6h",
				});
				// Send the token as the response
				res.status(200).json({ message: "Welcome to your account!", authToken: authToken });
			} else {
				res.status(401).json({ message: "Unable to authenticate the user" });
			}
		})
		.catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
};

exports.getVerify = (req, res, next) => {
	// If JWT token is valid the payload gets decoded by the
	// isAuthenticated middleware and is made available on `req.payload`
	console.log(`req.payload`, req.payload);

	// Send back the token payload object containing the user data
	res.status(200).json(req.payload);
};

// exports.postUploadProfileImg = async (req, res, next) => {
// 	try {
// 		res.status(200).json(req.file.path);
// 	} catch (error) {
// 		res.status(500).json({ message: `An error occured while uploading the image - ${error.message}` });
// 	}
// };
