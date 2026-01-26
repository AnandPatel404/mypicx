// custom error class
class UserError extends Error {
	constructor(message, user_message, code, type = 'general') {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.user_message = user_message;
		this.type = type;
	}
}

export default UserError;
