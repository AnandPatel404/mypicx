import debugFn from 'debug';
import express from 'express';
import useragent from 'express-useragent';
import fs from 'fs';
import passport from 'passport';
import path from 'path';
import pug from 'pug';
import OtpController from '../controllers/OtpController.js';
import db from '../models/index.js';
import sendEmail from '../utils/mailer.js';
import { successResponseHandler, renderSuccessResponseHandler } from '../utils/SuccessResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { PROJECT_NAME } from '../config/prefix.js';
import UserError from '../utils/UserError.js';
import { joiValidate } from '../validations/joi_auth_validation.js';
const debug = debugFn('whatsapp-backend:auth');
const { User, History } = db;
const router = express.Router();
const logo = path.join(process.cwd(), 'public', 'assets', 'images', 'logo', 'payment-logo.png');

router.get('/login', function (req, res) {
	try {
		return renderSuccessResponseHandler(res, 'auth/login', { title: "Login" });
	} catch (error) {
		console.error('[e] GET /auth/login', error.message);
		return successResponseHandler(res, '500');
	}
});

router.get('/register', function (req, res) {
	try {
		return renderSuccessResponseHandler(res, 'auth/register');
	} catch (error) {
		console.error('[e] GET /auth/register', error.message);
		return successResponseHandler(res, '500');
	}
});

router.get('/forgot-password', function (req, res) {
	try {
		return successResponseHandler(res, 'auth/forgot-password');
	} catch (error) {
		console.error('[e] GET /auth/forgot-password', error.message);
		return successResponseHandler(res, '500');

	}
});

router.post(
	'/login',
	asyncHandler(async (req, res, next) => {
		try {
			const value = await joiValidate('login').validateAsync(req.body, {
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

		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(new UserError(err.message, err.message, 400));
			}

			if (!user) {
				return next(
					new UserError(info?.message || 'Invalid credentials', info?.message, 400)
				);
			}

			req.logIn(user, async (err) => {
				if (err) {
					return next(new UserError(err.message, err.message, 400));
				}

				if (user.user_type === 'admin') {
					return res.status(200).json({
						status: 'success',
						message: 'Login Successfully',
						redirect: '/admin/dashboard',
					});
				}

				setImmediate(async () => {
					const agent = useragent.parse(req.headers['user-agent']);
					await History.create({
						user_id: user.id,
						type: 'Login',
						text: `${agent.browser} ${agent.version} on ${agent.os} of ${agent.platform}`,
						useragent: agent.source,
						browser: agent.browser,
						ip:
							req.headers['x-forwarded-for'] ||
							req.headers['x-real-ip'] ||
							req.connection.remoteAddress ||
							req.ip,
					});
				});

				return res.status(200).json({
					status: 'success',
					message: 'Login Successfully.',
					redirect: '/users/dashboard',
				});
			});
		})(req, res, next);
	})
);

router.post('/send_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('send_otp').validateAsync(req.body, {
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
	const { email } = req.body;

	const user = await User.findOne({ where: { email } });
	if (user) {
		throw new UserError('Email already registered.', 'Email already registered.', 400);
	}

	const instance = new OtpController(email, 'register');
	const otp = await instance.getOtp();

	debug('Generated OTP:', otp);

	if (process.env.NODE_ENV !== 'development') {
		const data = pug.renderFile(path.join(process.cwd(), 'views', 'email', 'email.pug'), {
			otp: otp,
			text: `Thank you for signing up for ${PROJECT_NAME}, To complete the registration process, we need you to verify your account with a One-Time Password (OTP).`,
			subject: 'Register Your Account',
		});

		const file = fs.readFileSync(logo);

		//TODO : CHANGE LOGO
		const message = {
			from: process.env.SMTP_USERNAME,
			to: req.body.email,
			subject: `Verify your ${PROJECT_NAME} account with One-Time Password (OTP)`,
			text: 'Your One Time Password is ' + otp,
			html: data,
			attachments: [
				{
					filename: 'payment-logo.png',
					content: file,
					encoding: 'base64',
					cid: 'logo@edgegateway.in',
				},
			],
		};

		setImmediate(async (message) => {
			try {
				sendEmail(message);
			} catch (error) {
				console.error('[email]', error);
			}
		}, message);
	}
	return successResponseHandler(res, "/auth/send_otp", 200, `OTP sent successfully to ${email}.`);
}));

router.post('/verify_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('verify_otp').validateAsync(req.body, {
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
	const { email, otp } = req.body;

	const user = await User.findOne({ where: { email } });
	if (user) {
		throw new UserError('Email already registered. Please use another email.', 'Email already registered. Please use another email.', 400);
	}

	const instance = new OtpController(email, 'register');
	const verify = await instance.verifyOtp(otp);
	if (!verify) {
		throw new UserError('Please enter valid OTP.', 'Please enter valid OTP.', 400);
	}
	return successResponseHandler(res, "/auth/verify_otp", 200, 'OTP verified successfully.');
}));

router.post('/resend_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('resend_otp').validateAsync(req.body, {
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

	const { email } = req.body;

	const instance = new OtpController(email, 'register');
	const is_exist = await instance.isExist();
	if (!is_exist) {
		throw new UserError('Please send OTP first.', 'Please send OTP first.', 400);
	}
	const otp = await instance.getResendOtp();
	debug('Generated OTP:', otp);

	if (process.env.NODE_ENV !== 'development') {
		const data = pug.renderFile(path.join(process.cwd(), 'views', 'email', 'email.pug'), {
			otp: otp,
			text: `Thank you for signing up for ${PROJECT_NAME}, To complete the registration process, we need you to verify your account with a One-Time Password (OTP).`,
			subject: 'Register Your Account',
		});

		const file = fs.readFileSync(logo);

		//TODO:  change logo
		const message = {
			from: process.env.SMTP_USERNAME,
			to: req.body.email,
			subject: `Verify your ${PROJECT_NAME} account with One-Time Password (OTP)`,
			text: 'Your One Time Password is ' + otp,
			html: data,
			attachments: [
				{
					filename: 'payment-logo.png',
					content: file,
					encoding: 'base64',
					cid: 'logo@edgegateway.in',
				},
			],
		};

		setImmediate(async (message) => {
			try {
				sendEmail(message);
			} catch (error) {
				console.error('[email]', error);
			}
		}, message);
	}
	return successResponseHandler(res, "/auth/resend_otp", 200, `OTP sent successfully to ${email}.`);
}));

router.post('/register', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('register').validateAsync(req.body, {
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
	const { mobile_no, name, password, email, country_code } = req.body;

	const user = await User.findOne({ where: { email } });
	if (user) {
		throw new UserError('Email already registered. Please use another email.', 'Email already registered. Please use another email.', 400);
	}

	const instance = new OtpController(email, 'register');
	const otp = await instance.isExist();
	if (!otp) {
		throw new UserError('Please verify your otp first.', 'Please verify your otp first.', 400);
	}
	await instance.resetOtp();

	await User.create({
		name: name,
		email: email,
		mobile_no: mobile_no,
		country_code: country_code,
		password: password,
	});
	return successResponseHandler(res, "/auth/register", 200, `User registered successfully.`, '/auth/login');
}));

router.post('/forgot_password_send_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('forgot_password_send_otp').validateAsync(req.body, {
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
	const { email } = req.body;

	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new UserError('Email not registered.', 'Email not registered.', 400);
	}

	const instance = new OtpController(email, 'forgot_password');
	const otp = await instance.getOtp();
	debug('Generated OTP:', otp);

	if (process.env.NODE_ENV !== 'development') {
		const data = pug.renderFile(path.join(process.cwd(), 'views', 'email', 'email.pug'), {
			otp: otp,
			text: `You requested to reset your password on ${PROJECT_NAME}. To proceed, please verify your account using the One-Time Password (OTP) we’ve sent you`,
			subject: 'Password Reset',
		});

		const file = fs.readFileSync(logo);
		//TODO : CHANGE LOGO HERE
		const message = {
			from: process.env.SMTP_USERNAME,
			to: req.body.email,
			subject: `Your ${PROJECT_NAME} Password Reset OTP`,
			text: 'Your One Time Password is ' + otp,
			html: data,
			attachments: [
				{
					filename: 'payment-logo.png',
					content: file,
					encoding: 'base64',
					cid: 'logo@edgegateway.in',
				},
			],
		};

		setImmediate(async (message) => {
			try {
				sendEmail(message);
			} catch (error) {
				console.error('[email]', error);
			}
		}, message);
	}
	return successResponseHandler(res, "/auth/forgot_password_send_otp", 200, `OTP sent successfully to ${email}.`);
}));

router.post('/forgot_password_verify_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('forgot_password_verify_otp').validateAsync(req.body, {
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
	const { email, otp } = req.body;

	const user = await User.findOne({ where: { email } });

	if (!user) {
		throw new UserError('Email not registered.', 'Email not registered.', 400);
	}

	const instance = new OtpController(email, 'forgot_password');

	const verify = await instance.verifyOtp(otp);
	if (!verify) {
		throw new UserError('Please enter valid OTP.', 'Please enter valid OTP.', 400);
	}
	return successResponseHandler(res, "/auth/forgot_password_verify_otp", 200, `OTP verified successfully.`);
}));

router.post('/forgot_password_resend_otp', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('forgot_password_resend_otp').validateAsync(req.body, {
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
	const { email } = req.body;

	const instance = new OtpController(email, 'forgot_password');
	const is_exist = await instance.isExist();
	if (!is_exist) {
		throw new UserError('Please send OTP first.', 'Please send OTP first.', 400);
	}
	const otp = await instance.getResendOtp();
	debug(otp);

	if (process.env.NODE_ENV !== 'development') {
		const data = pug.renderFile(path.join(process.cwd(), 'views', 'email', 'email.pug'), {
			otp: otp,
			text: `You requested to reset your password on ${PROJECT_NAME}. To proceed, please verify your account using the One-Time Password (OTP) we’ve sent you.`,
			subject: 'Password Reset',
		});

		const file = fs.readFileSync(logo);

		//TODO : ADD LOGO
		const message = {
			from: process.env.SMTP_USERNAME,
			to: req.body.email,
			subject: `Your ${PROJECT_NAME} Password Reset OTP`,
			text: 'Your One Time Password is ' + otp,
			html: data,
			attachments: [
				{
					filename: 'payment-logo.png',
					content: file,
					encoding: 'base64',
					cid: 'logo@edgegateway.in',
				},
			],
		};

		setImmediate(async (message) => {
			try {
				sendEmail(message);
			} catch (error) {
				console.error('[email]', error);
			}
		}, message);
	}
	return successResponseHandler(res, "/auth/forgot_password_resend_otp", 200, `OTP sent successfully to ${email}.`);
}));

router.post('/reset_password', asyncHandler(async function (req, res, next) {
	try {
		const value = await joiValidate('reset_password').validateAsync(req.body, {
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
	const { email, password, confirm_password } = req.body;

	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new UserError('Email not registered.', 'Email not registered.', 400);
	}

	const instance = new OtpController(email, 'forgot_password');
	const otp = await instance.isExist();

	if (!otp) {
		throw new UserError('Please verify your email first.', 'Please verify your email first.', 400);
	}
	await instance.resetOtp();

	if (password !== confirm_password) {
		throw new UserError('Password and confirm password does not match.', 'Password and confirm password does not match.', 400);
	}

	user.password = await user.generateHash(password);
	await user.save();
	return successResponseHandler(res, "/auth/reset_password", 200, `Password reset successfully.`, '/auth/login');
}));

router.get('/google', passport.authenticate('google', ['email']));

router.get('/google/callback', asyncHandler(async function (req, res, next) {
	passport.authenticate(
		'google',
		{
			successRedirect: `${process.env.GOOGLE_SUCCESS_REDIRECT}`,
			failureRedirect: process.env.GOOGLE_FAIL_REDIRECT,
		},
		function (err, user) {
			if (err || !user) {
				throw new UserError(err.message, err.message, 400);
			}

			if (user) {
				req.logIn(user, async function (err) {
					if (err) {
						throw new UserError(err.message, err.message, 400);
					}
					setImmediate(
						async (useragent_str, user_id, ip) => {
							const agent = useragent.parse(useragent_str);
							await History.create({
								user_id: user_id,
								type: 'Google Login',
								text: `${agent.browser} ${agent.version} on ${agent.os} of ${agent.platform}`,
								useragent: agent.source,
								ip: ip,
								browser: agent.browser,
								browser_version: agent.version,
							});
						},
						req.headers['user-agent'],
						user.id,
						req.headers['x-forwarded-for'] ||
						req.headers['x-real-ip'] ||
						req.connection.remoteAddress ||
						req.ip,
					);

					return res.redirect('/users/dashboard');
				});
			}
		},
	)(req, res, next);
}));

export default router;
