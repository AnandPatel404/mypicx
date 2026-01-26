/* eslint-disable no-unused-vars */
import moment from 'moment';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../models/index.js';
const { User, Plan, Subscription } = db;

export default function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_SECRET_ID,
				callbackURL: `${process.env.GOOGLE_CALLBACK}/auth/google/callback`,
				scope: ['email', 'profile'],
				passReqToCallback: true,
			},
			async function (req, accessToken, refreshToken, profile, cb) {
				try {
					const email = profile.emails[0].value;
					const user_exist = await User.findOne({
						where: {
							email,
						},
						attributes: ['id', 'name', 'email', 'sso', 'createdAt', 'user_type', 'status', 'updatedAt', 'timezone'],
						order: [['id', 'DESC']],
					});

					if (user_exist) {
						if (!user_exist.sso) {
							return cb(
								'Your account does not support Google login. Please login your account with enter your email address and password. if you enable Google login, please contact customer care for assistance.',
								false,
							);
						}
						return cb(null, user_exist);
					}

					const user = await User.create({
						email,
						name: profile.name.givenName,
						sso: true,
						user_type: 'user',
					});

					const is_trial_plan_exist = await Plan.findOne({
						where: {
							type: 'trial',
							status: 'active',
						},
					});

					if (is_trial_plan_exist) {
						await Subscription.create({
							user_id: user.id,
							plan_id: is_trial_plan_exist.id,
							session_limit: is_trial_plan_exist.session_limit,
							staring_period: moment(),
							ending_period: moment().add(is_trial_plan_exist.validity, 'days'),
							api: is_trial_plan_exist.api || false,
							webhook: is_trial_plan_exist.webhook || false,
							message_schedule: is_trial_plan_exist.message_schedule || false,
						});
					}

					return cb(null, user);
				} catch (error) {
					console.error('Google Login Error====>', error);
					return cb(error, false, {
						message: 'Unknown Response !',
					});
				}
			},
		),
	);
	passport.serializeUser(function (user, done) {
		// user.api_token = null;
		// user.password = null;
		done(null, user);
	});
	passport.deserializeUser(function (user, done) {});
}
