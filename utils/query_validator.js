const regex = /^[a-zA-Z0-9 _-]*$/;
// Define a middleware to validate req.query
const validateQuery = (req, res, next) => {
	// Check if req.query exists and is not empty
	if (req.query && Object.keys(req.query).length !== 0) {
		// Loop through each key in req.query
		for (const key in req.query) {
			// Check if the value matches the regular expression
			if (!regex.test(req.query[key])) {
				console.log('THIS IS THE KEY', key);
				return res.status(400).json({ status: 'error', title: 'Error', message: 'Invalid Query' });
			}
		}
		// If all values pass validation, proceed to the next middleware
		next();
	} else {
		// If req.query is empty or doesn't exist, proceed to the next middleware
		next();
	}
};

export default validateQuery;
