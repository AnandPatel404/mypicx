import Joi from 'joi';
export const joiValidate = (method) => {
	switch (method) {
		case 'update_profile': {
			return Joi.object()
				.keys({
					name: Joi.string()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter name.';
										break;
									case 'string.base':
										err.message = 'Please enter valid name.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					business_name: Joi.string()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter business name.';
										break;
									case 'string.base':
										err.message = 'Please enter valid business name.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
				})
				.options({ abortEarly: true, allowUnknown: false, convert: true }).messages({
					'object.unknown': 'Invalid field provided.',
				});
		}
		case 'get_event_by_id': {
			return Joi.object()
				.keys({
					id: Joi.number()
						.required()
						.positive()
						.integer()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'number.empty':
									case 'number.required':
										err.message = 'Please enter event id';
										break;
									case 'number.base':
										err.message = 'Event id should be number';
										break;
									case 'number.positive':
										err.message = 'Event id should be positive';
										break;
									case 'number.integer':
										err.message = 'Event id should be integer';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
				})
				.options({ abortEarly: true, allowUnknown: false, convert: true }).messages({
					'object.unknown': 'Invalid field provided.',
				});
		}
		case 'change_password': {
			return Joi.object()
				.keys({
					current_password: Joi.string()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'string.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter password';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					new_password: Joi.string()
						.required()
						.pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$.!%*#?&]{8,}$'))
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.required':
									case 'string.empty':
										err.message = 'Please enter password';
										break;
									case 'string.pattern.base':
										err.message =
											'Password must be at least 8 characters long and contain at least one letter, one number, and one special character';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					confirm_password: Joi.string()
						.required()
						.pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$.!%*#?&]{8,}$'))
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.required':
									case 'string.empty':
										err.message = 'Please enter password';
										break;
									case 'string.pattern.base':
										err.message =
											'Password must be at least 8 characters long and contain at least one letter, one number, and one special character';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
				})
				.options({ abortEarly: true, allowUnknown: false, convert: true });
		}
		case "get_branding_by_id": {
			return Joi.object()
				.keys({
					id: Joi.number()
						.required()
						.positive()
						.integer()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'number.empty':
									case 'number.required':
										err.message = 'Please enter branding id';
										break;
									case 'number.base':
										err.message = 'Branding id should be number';
										break;
									case 'number.positive':
										err.message = 'Branding id should be positive';
										break;
									case 'number.integer':
										err.message = 'Branding id should be integer';
										break;
									default:
										break;
								}
							});
							return errors;
						}),

				})
				.options({ abortEarly: true, allowUnknown: false, convert: true }).messages({
					'object.unknown': 'Invalid field provided.',
				});
		}
	}
};
