import express from 'express';
import db from '../models/index.js';
import { renderSuccessResponseHandler, successResponseHandler } from '../utils/SuccessResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { joiValidate } from '../validations/joi_user_validation.js';
import UserError from '../utils/UserError.js';
const { History, User, Branding } = db;
const router = express.Router();

router.post('/create_branding', asyncHandler(async (req, res, next) => {
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

	return successResponseHandler(res, "/users/change_password", 200, `Password changed.`, null, true);
}));

export default router;