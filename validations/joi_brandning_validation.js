import Joi from "joi";
export const joiValidate = (method) => {
	switch (method) {
		case "create_branding": {
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
					tagline: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid tagline.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					about_us: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid about us.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					contact_number: Joi.string()
						.optional()
						.allow("", null)
						.pattern(/^[+]?[0-9\s\-()]+$/)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.pattern.base":
									case "string.base":
										err.message = "Please enter valid contact number.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					contact_email: Joi.string()
						.optional()
						.allow("", null)
						.email()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.email":
										err.message = "Please enter valid email address.";
										break;
									case "string.base":
										err.message = "Please enter valid email address.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					website: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid website URL.";
										break;
									case "string.base":
										err.message = "Please enter valid website URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					facebook: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Facebook URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Facebook URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					instagram: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Instagram URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Instagram URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					youtube: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid YouTube URL.";
										break;
									case "string.base":
										err.message = "Please enter valid YouTube URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					linkedin: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid LinkedIn URL.";
										break;
									case "string.base":
										err.message = "Please enter valid LinkedIn URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					whatsapp: Joi.string()
						.optional()
						.allow("", null)
						.pattern(/^[+]?[0-9\s\-()]+$/)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.pattern.base":
										err.message = "Please enter valid WhatsApp number.";
										break;
									case "string.base":
										err.message = "Please enter valid WhatsApp number.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					x: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid X (Twitter) URL.";
										break;
									case "string.base":
										err.message = "Please enter valid X (Twitter) URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					snapchat: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Snapchat URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Snapchat URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					tiktok: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid TikTok URL.";
										break;
									case "string.base":
										err.message = "Please enter valid TikTok URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					address: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid address.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					default: Joi.string().allow(null, '')
						.optional()
						.default(false)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Default must check or uncheck.";
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

		case "delete_branding_by_id": {
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
		case "update_branding": {
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
					brand_logo: Joi.string()
						.optional().allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid brand logo.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					tagline: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid tagline.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					about_us: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid about us.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					contact_number: Joi.string()
						.optional()
						.allow("", null)
						.pattern(/^[+]?[0-9\s\-()]+$/)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.pattern.base":
									case "string.base":
										err.message = "Please enter valid contact number.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					contact_email: Joi.string()
						.optional()
						.allow("", null)
						.email()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.email":
										err.message = "Please enter valid email address.";
										break;
									case "string.base":
										err.message = "Please enter valid email address.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					website: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid website URL.";
										break;
									case "string.base":
										err.message = "Please enter valid website URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					facebook: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Facebook URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Facebook URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					instagram: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Instagram URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Instagram URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					youtube: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid YouTube URL.";
										break;
									case "string.base":
										err.message = "Please enter valid YouTube URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					linkedin: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid LinkedIn URL.";
										break;
									case "string.base":
										err.message = "Please enter valid LinkedIn URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					whatsapp: Joi.string()
						.optional()
						.allow("", null)
						.pattern(/^[+]?[0-9\s\-()]+$/)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.pattern.base":
										err.message = "Please enter valid WhatsApp number.";
										break;
									case "string.base":
										err.message = "Please enter valid WhatsApp number.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					x: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid X (Twitter) URL.";
										break;
									case "string.base":
										err.message = "Please enter valid X (Twitter) URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					snapchat: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid Snapchat URL.";
										break;
									case "string.base":
										err.message = "Please enter valid Snapchat URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					tiktok: Joi.string()
						.optional()
						.allow("", null)
						.uri()
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.uri":
										err.message = "Please enter valid TikTok URL.";
										break;
									case "string.base":
										err.message = "Please enter valid TikTok URL.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					address: Joi.string()
						.optional()
						.allow("", null)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Please enter valid address.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
					default: Joi.string().allow(null, '')
						.optional()
						.default(false)
						.error((errors) => {
							errors.forEach((err) => {
								switch (err.code) {
									case "string.base":
										err.message = "Default must check or uncheck.";
										break;
									default:
										break;
								}
							});
							return errors;
						}),
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
