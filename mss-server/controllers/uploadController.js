const { handleUpload } = require("../config/cloudinary.js");

exports.postUpload = async (req, res, next) => {
	try {
		const b64 = Buffer.from(req.file.buffer).toString("base64");
		let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
		const cldRes = await handleUpload(dataURI);
		res.json(cldRes);
		console.log(cldRes);
	} catch (error) {
		console.log(error);
		res.send({
			message: error.message,
		});
	}
};
