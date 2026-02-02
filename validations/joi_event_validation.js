import Joi from "joi";
import event_types from "../data/event_type.js";
export const joiValidate = (method) => {
	switch (method) {
		case "create_event": {
			return Joi.object()
				.keys({
					name: Joi.string().max(255)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "any.required":
									case "any.empty":
									case "string.empty":
										err.message = "Please enter name.";
										break;
									case "string.base":
										err.message = "Please enter valid name.";
										break;
									case "string.max":
										err.message = "Name must be less than 255 characters.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					cover_image: Joi.string().optional().allow(null, '')
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									default:
										break;
								}
							});
							return errors;
						}),
					branding_id: Joi.number()
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
					type: Joi.string()
						.required().valid(...event_types)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please select event type';
										break;
									case 'string.base':
										err.message = 'Event type should be string';
										break;
									case 'any.only':
										err.message = 'Event type should be one of the following: ' + event_types.join(', ');
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					starting_date: Joi.date().required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'date.empty':
									case 'date.required':
										err.message = 'Please select starting date.';
										break;
									case 'date.base':
										err.message = 'Starting date should be date.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					ending_date: Joi.date().required().min(Joi.ref('starting_date'))
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'date.empty':
									case 'date.required':
										err.message = 'Please select ending date.';
										break;
									case 'date.base':
										err.message = 'Ending date should be date.';
										break;
									case 'date.min':
										err.message = 'Ending date should be greater than starting date.';
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
		case "update_event": {
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
					name: Joi.string().max(255)
						.required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "any.required":
									case "any.empty":
									case "string.empty":
										err.message = "Please enter name.";
										break;
									case "string.base":
										err.message = "Please enter valid name.";
										break;
									case "string.max":
										err.message = "Name must be less than 255 characters.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					branding_id: Joi.number()
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
					type: Joi.string()
						.required().valid(...event_types)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'string.empty':
									case 'string.required':
										err.message = 'Please select event type';
										break;
									case 'string.base':
										err.message = 'Event type should be string';
										break;
									case 'any.only':
										err.message = 'Event type should be one of the following: ' + event_types.join(', ');
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					starting_date: Joi.date().required()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'date.empty':
									case 'date.required':
										err.message = 'Please select starting date.';
										break;
									case 'date.base':
										err.message = 'Starting date should be date.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					ending_date: Joi.date().required().min(Joi.ref('starting_date'))
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case 'any.empty':
									case 'any.required':
									case 'date.empty':
									case 'date.required':
										err.message = 'Please select ending date.';
										break;
									case 'date.base':
										err.message = 'Ending date should be date.';
										break;
									case 'date.min':
										err.message = 'Ending date should be greater than starting date.';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					guest_access_pin: Joi.number().min(100000).max(999999)
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
										err.message = 'Please enter guest access pin';
										break;
									case 'number.base':
										err.message = 'Guest access pin should be number';
										break;
									case 'number.positive':
										err.message = 'Guest access pin should be positive';
										break;
									case 'number.integer':
										err.message = 'Guest access pin should be integer';
										break;
									case 'number.min':
										err.message = 'Guest access pin should be greater than 100000';
										break;
									case 'number.max':
										err.message = 'Guest access pin should be less than 999999';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					full_access_pin: Joi.number().min(100000).max(999999)
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
										err.message = 'Please enter full access pin';
										break;
									case 'number.base':
										err.message = 'Full access pin should be number';
										break;
									case 'number.positive':
										err.message = 'Full access pin should be positive';
										break;
									case 'number.integer':
										err.message = 'Full access pin should be integer';
										break;
									case 'number.min':
										err.message = 'Full access pin should be greater than 100000';
										break;
									case 'number.max':
										err.message = 'Full access pin should be less than 999999';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					photo_selection_with_full_access_pin: Joi.number().min(100000).max(999999)
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
										err.message = 'Please enter photo selection with full access pin';
										break;
									case 'number.base':
										err.message = 'Photo selection with full access pin should be number';
										break;
									case 'number.positive':
										err.message = 'Photo selection with full access pin should be positive';
										break;
									case 'number.integer':
										err.message = 'Photo selection with full access pin should be integer';
										break;
									case 'number.min':
										err.message = 'Photo selection with full access pin should be greater than 100000';
										break;
									case 'number.max':
										err.message = 'Photo selection with full access pin should be less than 999999';
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					vip_guest_access_pin: Joi.number().min(100000).max(999999)
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
										err.message = 'Please enter vip access pin';
										break;
									case 'number.base':
										err.message = 'Vip access pin should be number';
										break;
									case 'number.positive':
										err.message = 'Vip access pin should be positive';
										break;
									case 'number.integer':
										err.message = 'Vip access pin should be integer';
										break;
									case 'number.min':
										err.message = 'Vip access pin should be greater than 100000';
										break;
									case 'number.max':
										err.message = 'Vip access pin should be less than 999999';
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
		case "delete_event_by_id": {
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
	}
};
