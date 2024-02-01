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

module.exports = { upload, handleUpload };
