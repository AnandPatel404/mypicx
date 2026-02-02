import express from "express";
import db from "../models/index.js";
import {
	successResponseHandler,
} from "../utils/SuccessResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { joiValidate } from "../validations/joi_brandning_validation.js";
import { join } from "path";
import fs from "fs";
import { uploadBranding } from "../utils/multerInstance.js";
import UserError from "../utils/UserError.js";
const { Branding } = db;
const router = express.Router();

//Creating branding
router.post('/', uploadBranding.single('brand_logo'), asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('create_branding').validateAsync(req.body, {
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
	const { name, tagline, about_us, contact_number, contact_email, website, facebook, instagram, youtube, linkedin, whatsapp, x, snapchat, tiktok, address, default: isDefault } = req.body;

	const branding_already_exist = await Branding.findOne({
		where: {
			user_id: user_id,
			name
		},
	});

	if (branding_already_exist) {
		throw new UserError('Branding already exist.', 'Branding already exist.', 400);
	}

	if (isDefault) {
		const already_default_exist = await Branding.findOne({
			where: {
				user_id: user_id,
				default: true
			},
		});
		if (already_default_exist) {
			already_default_exist.default = false;
			await already_default_exist.save();
		}
	}

	if (!req.file) {
		throw new UserError('Please upload brand logo.', 'Please upload brand logo.', 400);
	}

	const file = `/${req.file.destination.split('/')[1]}/${req.file.filename}`;

	await Branding.create({
		user_id,
		name,
		brand_logo: file,
		tagline,
		about_us,
		contact_number,
		contact_email,
		website,
		facebook,
		instagram,
		youtube,
		linkedin,
		whatsapp,
		x,
		snapchat,
		tiktok,
		address,
		default: isDefault ? true : false
	});

	return successResponseHandler(res, '/branding', 200, "Branding added.", '/users/branding', false, null);

}));
//Delete branding by id
router.delete('/:id([0-9]+)', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('delete_branding_by_id').validateAsync(req.params, {
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

	const branding_exist = await Branding.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!branding_exist) {
		throw new UserError('Branding not exist.', 'Branding not exist.', 400);
	}

	//delete branding and its logo

	const file = branding_exist.brand_logo;

	const path = join('public', file);
	if (fs.existsSync(path)) fs.unlinkSync(path);
	await branding_exist.destroy();

	return successResponseHandler(res, '/branding', 200, "Branding deleted.", false, true);
}));

//Update branding by id
router.put('/', uploadBranding.single('brand_logo'), asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('update_branding').validateAsync(req.body, {
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
	const { id, name, tagline, about_us, contact_number, contact_email, website, facebook, instagram, youtube, linkedin, whatsapp, x, snapchat, tiktok, address, default: isDefault } = req.body;

	const branding_exist = await Branding.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!branding_exist) {
		throw new UserError('Branding not exist.', 'Branding not exist.', 400);
	}

	if (req.file) {
		const file = branding_exist.brand_logo;
		if (file) {
			const path = join('public', file);
			if (fs.existsSync(path)) fs.unlinkSync(path);
		}
		branding_exist.brand_logo = `/${req.file.destination.split('/')[1]}/${req.file.filename}`;
	}

	branding_exist.name = name || branding_exist.name;
	branding_exist.tagline = tagline || branding_exist.tagline;
	branding_exist.about_us = about_us || branding_exist.about_us;
	branding_exist.contact_number = contact_number || branding_exist.contact_number;
	branding_exist.contact_email = contact_email || branding_exist.contact_email;
	branding_exist.website = website || branding_exist.website;
	branding_exist.facebook = facebook || branding_exist.facebook;
	branding_exist.instagram = instagram || branding_exist.instagram;
	branding_exist.youtube = youtube || branding_exist.youtube;
	branding_exist.linkedin = linkedin || branding_exist.linkedin;
	branding_exist.whatsapp = whatsapp || branding_exist.whatsapp;
	branding_exist.x = x || branding_exist.x;
	branding_exist.snapchat = snapchat || branding_exist.snapchat;
	branding_exist.tiktok = tiktok || branding_exist.tiktok;
	branding_exist.address = address || branding_exist.address;

	if (isDefault == 'on') {
		const already_default_exist = await Branding.findOne({
			where: {
				user_id: user_id,
				default: true
			},
		});
		if (already_default_exist && already_default_exist.id !== branding_exist.id) {
			already_default_exist.default = false;
			await already_default_exist.save();
		}
		branding_exist.default = true;
	} else {
		branding_exist.default = false;
	}

	await branding_exist.save();

	return successResponseHandler(res, '/branding', 200, "Branding updated.", "/users/branding", false);
}));


//Delete branding image
router.delete('/logo/:id([0-9]+)', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('delete_branding_by_id').validateAsync(req.params, {
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

	const branding_exist = await Branding.findOne({
		where: {
			user_id: user_id,
			id
		},
	});

	if (!branding_exist) {
		throw new UserError('Branding not exist.', 'Branding not exist.', 400);
	}

	//delete branding and its logo

	const file = branding_exist.brand_logo;

	const path = join('public', file);
	if (fs.existsSync(path)) fs.unlinkSync(path);
	branding_exist.brand_logo = null;
	await branding_exist.save();


	return successResponseHandler(res, '/branding', 200, "Branding logo deleted.", false, true);
}));


export default router;
