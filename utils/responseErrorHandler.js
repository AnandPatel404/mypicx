// middleware/errorMiddleware.js
import UserError from './UserError.js';

export default function errorMiddleware(err, req, res, next) {
	const route = `${req.method} ${req.originalUrl}`;
	const type = err.type || 'general';

	if (process.env.NODE_ENV === 'development') {
		console.error(route, err);
	}

	if (type === 'validation') {
		return res.status(400).json({
			status: 'error',
			message: err.user_message || 'Validation error',
			success: false,
		});
	}

	if (err instanceof UserError) {
		return res.status(err.statusCode || 400).json({
			status: 'error',
			message: err.user_message,
			success: false,
		});
	}

	return res.status(err.statusCode || 400).json({
		status: 'error',
		message: err.message || 'Something went wrong',
		success: false,
	});
}
