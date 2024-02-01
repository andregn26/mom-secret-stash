require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
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

module.export = { handleUpload, upload };
