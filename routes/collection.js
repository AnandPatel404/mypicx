import express from "express";
import db from "../models/index.js";
import {
	successResponseHandler,
} from "../utils/SuccessResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { joiValidate } from "../validations/joi_collection_validation.js";
import UserError from "../utils/UserError.js";
const { Event, Collection } = db;
const router = express.Router();

//Creating collection
router.post('/', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('create_collection').validateAsync(req.body, {
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
	const user_id = req.user.id;
	const { name, event_id } = req.body;	

	const event_exist = await Event.findOne({
		where: {
			user_id: user_id,
			id: event_id
		},
	});

	if (!event_exist) {
		return next(new UserError('Event not exist.', 'Event not exist.', 400));
	}


	const collection_already_exist = await Collection.findOne({
		where: {
			user_id: user_id,
			name,
			event_id
		},
	});

	if (collection_already_exist) {
		return next(new UserError('Collection already exist.', 'Collection already exist.', 400));
	}

	await Collection.create({
		user_id,
		name,
		event_id
	});

	return successResponseHandler(res, '/collection', 200, "Collection added.", null, true, {});
}));

export default router;
