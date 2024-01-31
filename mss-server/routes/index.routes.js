const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");

// path is api/...

router.get("/", (req, res, next) => {
	res.json("All good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
