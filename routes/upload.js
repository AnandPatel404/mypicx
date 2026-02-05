import express from "express";
import db from "../models/index.js";
import { joiValidate } from "../validations/joi_upload_validation.js";
import UserError from "../utils/UserError.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { uploadUserMedia } from "../utils/multerInstance.js";
const { Event, Collection, Media } = db;
const router = express.Router();

//Upload media

router.post('/file', uploadUserMedia.single('file'), async (req, res, next) => {
	try {
		const value = await joiValidate('upload_media').validateAsync(req.body, {
			convert: true,
			abortEarly: true,
			allowUnknown: false,
		});
		req.body = value;
	} catch (error) {
		return next(
			new UserError(
				error.details[0]?.message,
				error.details[0]?.message,
				400,
				'validation'
			)
		);
	}
	try {
		const user_id = req.user.id;

		//TODO : add the subscription checker here 
		const { event_id, collection_id } = req.body;
		const file = req.file;

		if (!file) {
			return next(new UserError('Please upload file.', 'Please upload file.', 400));
		}

		const event_exist = await Event.findOne({
			where: {
				user_id: user_id,
				id: event_id
			},
		});

		if (!event_exist) {
			return next(new UserError('Event not exist.', 'Event not exist.', 400));
		}


		const collection_exist = await Collection.findOne({
			where: {
				user_id: user_id,
				event_id,
				id: collection_id
			},
		});

		if (!collection_exist) {
			return next(new UserError('Collection not exist.', 'Collection not exist.', 400));
		}
		const ext = path.extname(file.originalname).toLowerCase();
		const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext.replace(".", ""));

		const originalPath = file.path;
		const generatedName = file.filename;

		let resolution = null;
		const unique_dir_string = req.user.unique_dir_string;
		if (isImage) {
			const thumbnailPath = `public/media/${unique_dir_string}_thumbnail/${generatedName}`;
			const image = sharp(originalPath);
			const meta = await image.metadata();

			resolution = `${meta.width}x${meta.height}`;

			if (ext === '.webp') {
				await image
					.resize(400)
					.webp({ quality: 50 })
					.toFile(thumbnailPath);

			} else if (ext === '.png') {
				await image
					.resize(400)
					.png({ quality: 50 })
					.toFile(thumbnailPath);
			} else if (ext === '.jpg' || ext === '.jpeg') {
				await image
					.resize(400)
					.jpeg({ quality: 50 })
					.toFile(thumbnailPath);
			} else {
				await image
					.resize(400)
					.toFile(thumbnailPath);
			}
		}
		const sizeMB = (file.size / 1024 / 1024).toFixed(2);

		await Media.create({
			user_id,
			event_id,
			collection_id: collection_id || null,
			name: file.originalname,
			generated_name: generatedName,
			path: `/media/${unique_dir_string}/${generatedName}`,
			thumbnail_path: `/media/${unique_dir_string}_thumbnail/${generatedName}`,
			resolution_size: resolution,
			size: sizeMB,
			type: isImage ? "image" : "video"
		});
		return res.status(200).json({
			status: 'success',
			message: 'Upload success.',
			success: true,
		});
	} catch (error) {
		if (req.file?.path && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}
		throw new UserError(error.message || 'Something went wrong.', error.user_message || 'Something went wrong.', 400);
	}
});


export default router;
