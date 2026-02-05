import express from 'express';
import db from '../models/index.js';
import { renderSuccessResponseHandler, successResponseHandler } from '../utils/SuccessResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { joiValidate } from '../validations/joi_user_validation.js';
import event_types from "../data/event_type.js";
import { fn, col } from 'sequelize';
import UserError from '../utils/UserError.js';
const { History, User, Branding, Event, Media, Collection } = db;
const router = express.Router();


router.get('/dashboard', function (req, res) {
	res.render('users/dashboard', { title: 'Dashboard' });
});

router.get('/events', async function (req, res) {
	try {
		const user_id = req.user.id;
		const where = {
			user_id
		};

		const count = await Event.count({
			where,
		});

		const pageCount = Math.ceil(count / req.query.limit);
		//include the count of all medias 
		const data = await Event.findAll({
			where,
			attributes: {
				include: [
					[fn('COUNT', col('Media.id')), 'media_count']
				]
			},
			include: [
				{
					model: Media,
					attributes: [], // important: don't fetch media rows
					required: false,
				}
			],
			group: ['Event.id'],
			order: [['createdAt', 'DESC']],
			limit: req.query.limit,
			offset: req.skip,
			subQuery: false,
		});

		return res.render('users/event/events', { title: 'Events', pageCount, data, current_page: req.query.page, });
	} catch (error) {
		console.error("[E] /users/events", error);
		return res.render("500");
	}
});

router.get('/add-event', async function (req, res) {
	try {

		const user_id = req.user.id;

		const all_branding = await Branding.findAll({
			where: {
				user_id
			}
		});

		return res.render('users/event/add-event', {
			title: 'Add Event', all_branding,
			event_types,
			convert_name: (name) => name.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
		});
	} catch (error) {
		console.error("[E] /users/add-event", error);
		return res.render("500");
	}
});

router.get('/setting/:id([0-9]+)', async function (req, res, next) {
	try {
		const value = await joiValidate('get_event_by_id').validateAsync(req.params, {
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

	try {
		const id = req.params.id;
		const user_id = req.user.id;

		const event_exist = await Event.findOne({
			where: {
				user_id: user_id,
				id
			},
		});

		if (!event_exist) return res.render('404');

		const branding = await Branding.findAll({
			where: {
				user_id
			}
		});


		return res.render('users/event/setting', {
			title: 'Setting',
			data: event_exist,
			all_branding: branding,
			event_types,
			convert_name: (name) => name.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
		});
	} catch (error) {
		console.error("[E] /users/setting", error);
		return res.render("500");
	}
});


router.get('/branding', async function (req, res) {
	try {
		const user_id = req.user.id;
		const where = {
			user_id
		};

		const count = await Branding.count({
			where,
		});

		const pageCount = Math.ceil(count / req.query.limit);
		const data = await Branding.findAll({
			where,
			order: [['createdAt', 'DESC']],
			limit: req.query.limit,
			offset: req.skip,
		});

		return res.render('users/branding/branding', {
			title: 'Branding',
			pageCount,
			data,
			current_page: req.query.page,
			pages: res.locals.paginate.getArrayPages(5, pageCount, req.query.page),
		});
	} catch (error) {
		console.error("[E] /users/branding", error);
		return res.render("500");
	}
});

//Get branding by id
router.get('/edit-branding/:id([0-9]+)', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('get_branding_by_id').validateAsync(req.params, {
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

	if (!branding_exist) return res.render('404');

	return res.render('users/branding/edit-branding', { title: 'Edit branding', data: branding_exist });
}));



router.get('/add-branding', function (req, res) {
	res.render('users/branding/add-branding', { title: 'Add Event' });
});

router.get('/analytics', function (req, res) {
	res.render('users/analytics', { title: 'Analytics' });
});


router.get('/plan', function (req, res) {
	res.render('users/plan', { title: 'Plan' });
});

router.get('/addon', function (req, res) {
	res.render('users/addon', { title: 'Addon' });
});

router.get('/transactions', function (req, res) {
	res.render('users/transactions', { title: 'Transactions' });
});

router.get('/help', function (req, res) {
	res.render('users/help', { title: 'Help' });
});

router.get('/profile', function (req, res) {
	res.render('users/profile', { title: 'Profile' });
});

router.get('/security', function (req, res) {
	res.render('users/security', { title: 'Security' });
});

router.get('/activity', asyncHandler(async (req, res) => {
	const user_id = req.user.id;
	const history = await History.findAll({
		where: {
			user_id: user_id,
		},
		order: [['createdAt', 'DESC']],
		limit: 10
	});

	return renderSuccessResponseHandler(res, 'users/activity', { title: 'Activity', data: history });

}));

router.get('/event-details/:id([0-9]+)', async function (req, res) {
	try {
		const id = req.params.id;
		const user_id = req.user.id;

		const event_exist = await Event.findOne({
			where: {
				user_id: user_id,
				id
			},
			include: [
				{
					model: Collection,
					attributes: ['name', 'id'],
				}
			],
		});

		if (!event_exist) return res.render('404');
		req.user.event_name = event_exist.name;
		req.user.event_id = event_exist.id;

		const media_count = await Media.count({
			where: {
				event_id: id,
				user_id: user_id,
			}
		});
		const collections = event_exist.Collections;
		return res.render('users/event/event-details', { title: 'Event Details', data: event_exist, media_count, collections });
	} catch (error) {
		console.error("[E] /event-details/:id([0-9]+)", error);
		return res.render("500");
	}

});

router.get('/share', function (req, res) {
	res.render('users/event/share', { title: 'Event Details' });
});

router.get('/highlights', function (req, res) {
	res.render('users/event/highlights', { title: 'Event Details' });
});


router.get('/collection', function (req, res) {
	res.render('users/event/collection', { title: 'Event Details' });
});

router.get('/collection-details', function (req, res) {
	res.render('users/event/collection-details', { title: 'Event Details' });
});


router.get('/share-link', function (req, res) {
	res.render('share/index', { title: 'Share' });
});

router.get('/upload', function (req, res) {
	res.render('users/event/upload', { title: 'Share' });
});

router.post('/change_password', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('change_password').validateAsync(req.body, {
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

	const { current_password, new_password, confirm_password } = req.body;

	const user = await User.findByPk(req.user.id);

	if (!user) {
		throw new UserError('User not found', 'User not found', 400);
	}

	if (!user.validPassword(current_password.toString())) {
		throw new UserError('Old password did not match.', 'Old password did not match.', 400);
	}

	if (new_password != confirm_password) {
		throw new UserError('Confirm password did not Match.', 'Confirm password did not Match.', 400);
	}

	user.password = await user.generateHash(new_password);
	await user.save();
	return successResponseHandler(res, "/users/change_password", 200, `Password changed.`, null, true);
}));
router.post('/update_profile', asyncHandler(async (req, res, next) => {
	try {
		const value = await joiValidate('update_profile').validateAsync(req.body, {
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
	const { name, business_name } = req.body;
	const user_id = req.user.id;
	const user_exist = await User.findOne({
		where: {
			id: user_id,
			status: 'active',
		},
	});
	if (!user_exist) {
		throw new UserError('User not found.', 'User not found.', 400);
	}
	user_exist.name = name;
	user_exist.business_name = business_name;

	await user_exist.save();

	user_exist.password = '';
	req.logIn(user_exist, function (err) {
		if (err) return next(new UserError(err.message, err.message, 400));
		return successResponseHandler(res, "/users/update_profile", 200, `Profile updated successfully.`, "/users/dashboard", false, {});
	});
}));

export default router;

