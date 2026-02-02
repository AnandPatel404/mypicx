import Joi from 'joi';
export const joiValidate = (method) => {
	switch (method) {
		case 'create_branding': {
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
				.options({ abortEarly: true, allowUnknown: false, convert: true });
		}

	}
};
