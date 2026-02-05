import Joi from "joi";
export const joiValidate = (method) => {
	switch (method) {
		case "upload_media": {
			return Joi.object()
				.keys({
					event_id: Joi.number()
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
					collection_id: Joi.number()
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
										err.message = 'Please enter collection id';
										break;
									case 'number.base':
										err.message = 'Collection id should be number';
										break;
									case 'number.positive':
										err.message = 'Collection id should be positive';
										break;
									case 'number.integer':
										err.message = 'Collection id should be integer';
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
		case "delete_media": {
			return Joi.object()
				.keys({
					event_id: Joi.number()
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
					media_id_array: Joi.array()
						.items(Joi.number())
						.required().error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'array.empty':
									case 'array.required':
										err.message = 'Please enter media id array';
										break;
									case 'array.base':
										err.message = 'Media id array should be array';
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
