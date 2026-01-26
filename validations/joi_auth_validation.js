import Joi from 'joi';
export const joiValidate = (method) => {
	switch (method) {
		case 'login': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					password: Joi.string()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'string.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter password.';
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
		case 'send_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
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
		case 'resend_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
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
		case 'verify_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					otp: Joi.string()
						.pattern(/^\d{6}$/)
						.min(6)
						.max(6)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter OTP.';
										break;
									case 'string.pattern.base':
										err.message = 'OTP must be a 6-digit number.';
										break;
									case 'string.min':
									case 'string.max':
										err.message = 'OTP must be a 6-digit number.';
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
		case 'register': {
			return Joi.object()
				.keys({
					mobile_no: Joi.string()
						.pattern(/^[6-9]\d{9}$/)
						.min(10)
						.max(10)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter mobile number.';
										break;
									case 'string.pattern.base':
										err.message = 'Please enter valid mobile number.';
										break;
									case 'string.min':
									case 'string.max':
										err.message = 'Mobile number must be 10 digits long.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					country_code: Joi.string()
						.pattern(/^\+?[1-9]\d{0,3}$/)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter country code.';
										break;
									case 'string.pattern.base':
										err.message = 'Please enter a valid country code.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					name: Joi.string()
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.required':
									case 'string.empty':
										err.message = 'Name is required';
										break;
									case 'string.base':
										err.message = 'Name should be a string';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					password: Joi.string()
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
				.options({ abortEarly: true, allowUnknown: false, convert: true }).messages({
					'object.unknown': 'Invalid field provided.',
				});
		}
		case 'forgot_password_send_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
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
		case 'forgot_password_verify_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					otp: Joi.string()
						.pattern(/^\d{6}$/)
						.min(6)
						.max(6)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
										err.message = 'Please enter OTP.';
										break;
									case 'string.pattern.base':
										err.message = 'OTP must be a 6-digit number.';
										break;
									case 'string.min':
									case 'string.max':
										err.message = 'OTP must be a 6-digit number.';
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
		case 'reset_password': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					password: Joi.string()
						.pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!.%*#?&]{8,}$'))
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
										err.message = 'Please enter confirm password';
										break;
									case 'string.pattern.base':
										err.message =
											'Confirm Password must be at least 8 characters long and contain at least one letter, one number, and one special character';
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
		case 'forgot_password_resend_otp': {
			return Joi.object()
				.keys({
					email: Joi.string()
						.email({ tlds: { allow: false } })
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.required':
									case 'any.empty':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please enter email address.';
										break;
									case 'string.base':
										err.message = 'Email should be a string';
										break;
									case 'string.email':
										err.message = 'Please enter valid email address.';
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
