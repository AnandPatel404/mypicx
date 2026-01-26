export function successResponseHandler(res, route, status = 200, message, redirect = null, reload = false, data = {}) {
	if (process.env.NODE_ENV === 'development') console.log(route, message);
	return res.status(status).json({ status: 'success', message: message, success: true, data, reload, redirect });
}

export function renderSuccessResponseHandler(res, page, data = {}) {
	return res.render(page, data);
}
