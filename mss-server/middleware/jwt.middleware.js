const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
	secret: process.env.TOKEN_SECRET,
	algorithms: ["HS256"],
	requestProperty: "payload",
	getToken: getTokenFromHeaders,
});

// Middleware function to check if the user is a superadmin
const isUserAdmin = (req, res, next) => {
	// Check if the authenticated user object contains superadmin role
	console.log(req.payload);
	if (req.payload && req.payload.isUserAdmin) {
		// User is a superadmin, allow access to the route
		next();
	} else {
		// User is not authorized, return 403 Forbidden
		return res.status(403).json({ message: "You must be an Admin to perform this operation" });
	}
};

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
	// Check if the token is available on the request Headers
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		// Get the encoded token string and return it
		const token = req.headers.authorization.split(" ")[1];
		return token;
	}
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
	isAuthenticated,
	isUserAdmin,
};
