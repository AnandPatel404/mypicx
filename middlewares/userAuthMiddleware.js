function isUserAuth(req, res, next) {
	if (!req.user) return res.redirect('/auth/login');
	if (req.user.user_type == 'user' || req.user.user_type == 'perfex_user') {
		res.locals.user = req.user;
		next();
	} else {
		return res.redirect('/auth/login');
	}
}

function isAdminAuth(req, res, next) {
	if (!req.user) return res.redirect('/auth/login');
	if (req.user.user_type != 'admin') return res.redirect('/auth/login');
	res.locals.user = req.user;
	next();
}
export { isAdminAuth, isUserAuth };
