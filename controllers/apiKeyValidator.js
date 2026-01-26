import escapeStringRegexp from 'escape-string-regexp';
import db from '../models/index.js';
const User = db.User;

export const apiHandler = async (req, res, next) => {
	const api_key = req.body.api_key || req.query.api_key || req.headers['x-api-key'];
	const regex_api_key = /^([a-zA-Z0-9]{8}\\x2d[a-zA-Z0-9]{27})$/;
	console.log('api_key', api_key);
	console.log('api_key', escapeStringRegexp(api_key));
	if (!api_key || !regex_api_key.test(escapeStringRegexp(api_key))) {
		return res.status(401).json({
			success: false,
			message: 'invalid api key',
		});
	}

	const user = await User.findOne({
		where: {
			key: api_key,
			user_type: 'user',
		},
		attributes: ['name', 'id', 'email', 'country_code', 'mobile_no', 'key'],
		order: ['id'],
	});

	if (!user) {
		return res.status(401).json({
			success: false,
			message: 'invalid api key',
		});
	}

	req.user = user;
	next();
};
