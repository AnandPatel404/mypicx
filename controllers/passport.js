import { Strategy as LocalStrategy } from 'passport-local';

import db from '../models/index.js';
const User = db.User;

export default function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			function (req, username, password, done) {
				User.findOne({
					where: {
						email: req.body.email,
						status: 'active',
						sso: false,
					},
				})
					.then((user) => {
						if (!user) {
							return done(null, false, {
								message: 'Invalid User Credential !',
							});
						}

						if (!user.validPassword(password)) {
							return done(null, false, {
								message: 'Invalid User Credential !',
							});
						}

						return done(null, user);
					})
					.catch((err) => {
						return done(err, false, {
							message: 'Unknown Response !',
						});
					});
			},
		),
	);
}
