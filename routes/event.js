import express from "express";
import db from "../models/index.js";
import {
	successResponseHandler,
} from "../utils/SuccessResponse.js";
import event_types from "../data/event_type.js";
import asyncHandler from "../utils/asyncHandler.js";
import { joiValidate } from "../validations/joi_event_validation.js";
import { join } from "path";
import fs from "fs";
import { uploadEventCover } from "../utils/multerInstance.js";
import UserError from "../utils/UserError.js";
const { Event, Branding, Collection } = db;
const router = express.Router();

//Creating event
router.post('/', uploadEventCover.single('cover_image'), asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('create_event').validateAsync(req.body, {
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
	const { name, type, branding_id, starting_date, ending_date } = req.body;

	// check the event type is exist or not 
	if (!event_types.includes(type)) return next(new UserError('Invalid event type.', 'Invalid event type.', 400));


	const event_already_exist = await Event.findOne({
		where: {
			user_id: user_id,
			name,
			event_type: type
		},
	});

	if (event_already_exist) {
		return next(new UserError('Event already exist.', 'Event already exist.', 400));
	}

	if (!req.file) {
		return next(new UserError('Please upload cover image.', 'Please upload cover image.', 400));
	}

	//check the default branding is exist if exist then assign to event only if branding_id not exist
	let branding = branding_id;
	if (!branding) {
		const default_branding = await Branding.findOne({
			where: {
				user_id: user_id,
				default: true
			},
		});
		if (default_branding) branding = default_branding.id;

	}

	const file = `/${req.file.destination.split('/')[1]}/${req.file.filename}`;

	const guest_access_pin = Math.floor(100000 + Math.random() * 900000);
	const full_access_pin = Math.floor(100000 + Math.random() * 900000);
	const photo_selection_with_full_access_pin = Math.floor(100000 + Math.random() * 900000);
	const vip_guest_access_pin = Math.floor(100000 + Math.random() * 900000);


	const event = await Event.create({
		user_id,
		name,
		event_type: type,
		brand_id: branding,
		starting_date,
		ending_date,
		cover_image: file,
		guest_access_pin,
		full_access_pin,
		photo_selection_with_full_access_pin,
		vip_guest_access_pin,
	});

	await Collection.create({
		name: 'Highlights',
		event_id: event.id,
		user_id
	});
	await Collection.create({
		name: 'Stories',
		event_id: event.id,
		user_id
	});


	return successResponseHandler(res, '/event', 200, "Event added.", '/users/events', false, null);
}));

//Delete event by id
router.delete('/:id([0-9]+)', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('delete_event_by_id').validateAsync(req.params, {
			convert: true,
			abortEarly: true,
			allowUnknown: false,
		});
		req.params = value;
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
	const { id } = req.params;

	const event_exist = await Event.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!event_exist) {
		return next(new UserError('Event not exist.', 'Event not exist.', 400));
	}

	//delete branding and its logo
	const file = event_exist.cover_image;

	const path = join('public', file);
	if (fs.existsSync(path)) fs.unlinkSync(path);

	//TODO : delete the all media of events send to queue in redis

	await event_exist.destroy();

	return successResponseHandler(res, '/branding', 200, "Event deleted.", false, true);
}));

//Update event by id
router.put('/', uploadEventCover.single('cover_image'), asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('update_event').validateAsync(req.body, {
			convert: true,
			abortEarly: true,
			allowUnknown: false,
		});
		req.params = value;
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
	const {
		name,
		type,
		branding_id,
		starting_date,
		ending_date,
		id,
		guest_access_pin,
		full_access_pin,
		photo_selection_with_full_access_pin,
		vip_guest_access_pin,
		bulk_download,
		single_download
	} = req.body;

	// check the event type is exist or not 
	if (!event_types.includes(type)) return next(new UserError('Invalid event type.', 'Invalid event type.', 400));


	const event_exist = await Event.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!event_exist) {
		return next(new UserError('Event not exist.', 'Event not exist.', 400));
	}

	if (!event_exist.cover_image && !req.file) {
		return next(new UserError('Please upload event cover image.', 'Please upload event cover image.', 400));
	}

	if (req.file) {
		const file = event_exist.cover_image;
		if (file) {
			const path = join('public', file);
			if (fs.existsSync(path)) fs.unlinkSync(path);
		}
		event_exist.cover_image = `/${req.file.destination.split('/')[1]}/${req.file.filename}`;
	}


	if (branding_id && event_exist.brand_id !== branding_id) {
		const branding = await Branding.findOne({
			where: {
				user_id: user_id,
				id: branding_id
			},
		});

		if (!branding) {
			return next(new UserError('Branding not exist.', 'Branding not exist.', 400));
		}
		event_exist.brand_id = branding_id;
	}

	event_exist.name = name || event_exist.name;
	event_exist.event_type = type || event_exist.event_type;
	event_exist.starting_date = starting_date || event_exist.starting_date;
	event_exist.ending_date = ending_date || event_exist.ending_date;

	const pins = [
		guest_access_pin,
		full_access_pin,
		photo_selection_with_full_access_pin,
		vip_guest_access_pin
	].filter(Boolean); // remove empty/null


	const uniquePins = new Set(pins);
	if (uniquePins.size !== pins.length) {
		return next(new UserError('All pins must be unique.', 'All pins must be unique.', 400));
	}


	if (event_exist.guest_access_pin !== guest_access_pin) {
		event_exist.guest_access_pin = guest_access_pin || event_exist.guest_access_pin;
	}

	if (event_exist.full_access_pin !== full_access_pin) {
		event_exist.full_access_pin = full_access_pin || event_exist.full_access_pin;
	}

	if (event_exist.photo_selection_with_full_access_pin !== photo_selection_with_full_access_pin) {
		event_exist.photo_selection_with_full_access_pin = photo_selection_with_full_access_pin || event_exist.photo_selection_with_full_access_pin;
	}

	if (event_exist.vip_guest_access_pin !== vip_guest_access_pin) {
		event_exist.vip_guest_access_pin = vip_guest_access_pin || event_exist.vip_guest_access_pin;
	}

	event_exist.bulk_download = bulk_download === 'on' ? true : false;
	event_exist.single_download = single_download === 'on' ? true : false;

	await event_exist.save();

	return successResponseHandler(res, '/event', 200, "Event updated.", "/users/events", false);
}));

//Delete event cover image
router.delete('/cover_image/:id([0-9]+)', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('delete_event_by_id').validateAsync(req.params, {
			convert: true,
			abortEarly: true,
			allowUnknown: false,
		});
		req.params = value;
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
	const { id } = req.params;

	const event_exist = await Event.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!event_exist) {
		return next(new UserError('Event not exist.', 'Event not exist.', 400));
	}

	const file = event_exist.cover_image;

	const path = join('public', file);
	if (fs.existsSync(path)) fs.unlinkSync(path);
	event_exist.cover_image = null;
	await event_exist.save();


	return successResponseHandler(res, '/branding', 200, "Event cover image deleted.", false, true);
}));


export default router;
