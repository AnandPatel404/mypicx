import Redis from 'ioredis';
import UserError from '../utils/UserError.js';
const redis = new Redis();
const OTP_EXPIRY_SECONDS = 5 * 60; // 5 minutes

export default class OtpController {
	constructor(mobile_no, otp_type = 'register') {
		this.otp_key = `WHATSME:otp:${otp_type}:${mobile_no}`;
		this.otp_retry_key = `WHATSME:otp:${otp_type}:retry:${mobile_no}`;
		this.otp_resend_key = `WHATSME:otp:${otp_type}:resend:${mobile_no}`;
		this.otp_resend_timestamp = `WHATSME:otp:${otp_type}:resend:time:${mobile_no}`;
	}


	async getOtp() {
		let otp = await redis.get(this.otp_key);
		if (otp) {
			return this.getResendOtp();
		}

		otp = Math.floor(Math.random() * 899999 + 100000);

		await redis.set(this.otp_key, otp, 'EX', OTP_EXPIRY_SECONDS);
		await redis.set(this.otp_retry_key, 0, 'EX', OTP_EXPIRY_SECONDS);
		await redis.set(this.otp_resend_key, 0, 'EX', OTP_EXPIRY_SECONDS);
		await redis.set(this.otp_resend_timestamp, `${Date.now()}`, 'EX', OTP_EXPIRY_SECONDS);

		return otp;
	}


	async verifyOtp(otp) {
		const saved_otp = await redis.get(this.otp_key);
		const otp_retry_key = await redis.get(this.otp_retry_key);
		if (otp_retry_key >= 5 && otp_retry_key != null) {
			throw new UserError(
				'OTP retry limit exceeded try after 2 hours',
				'OTP retry limit exceeded try after 2 hours',
				400,
			);
		}
		if (saved_otp === otp) {
			return true;
		}
		await this.incrOtpTry();
		throw new UserError('OTP is incorrect', 'OTP is incorrect', 400);
	}

	async isExist() {
		const saved_otp = await redis.get(this.otp_key);
		if (!saved_otp) return false;
		return true;
	}

	async isOtpValid(otp) {
		const saved_otp = await redis.get(this.otp_key);
		if (!saved_otp) {
			throw new UserError('OTP is not generated', 'OTP is not generated, Start again', 400);
		}
		if (saved_otp !== otp) {
			throw new UserError('OTP is incorrect', 'OTP is incorrect', 400);
		}
		return true;
	}

	// async getResendOtp() {
	// 	const otp = await redis.get(this.otp_key);
	// 	if (!otp) {
	// 		throw new UserError('OTP is not generated', 'OTP is not generated, Start again', 400);
	// 	}
	// 	const retry = await redis.get(this.otp_resend_key);
	// 	if (retry >= 3) {
	// 		throw new UserError(
	// 			'OTP can be resend only 3 times, Try after 2 hour or contact customer care',
	// 			'OTP can be resend only 3 times, Try after 2 hour or contact customer care',
	// 			400,
	// 		);
	// 	}
	// 	const timestamp = await redis.get(this.otp_resend_timestamp);
	// 	const diff = new Date().getTime() - parseInt(timestamp);
	// 	if (diff < 60 * 2 * 1000) {
	// 		throw new UserError('OTP can be resend after 2 minutes', 'OTP can be resend after 2 minutes', 400);
	// 	}
	// 	await this.incrOtpResend();
	// 	await redis.set(this.otp_resend_timestamp, `${new Date().getTime()}`, 'EX', 60 * 60 * 24);
	// 	return otp;
	// }

	async getResendOtp() {
		const exists = await redis.get(this.otp_key);
		if (!exists) {
			throw new UserError(
				'OTP is expired or not generated',
				'OTP is expired or not generated, Start again',
				400
			);
		}

		const resendCount = Number(await redis.get(this.otp_resend_key));
		if (resendCount >= 3) {
			throw new UserError(
				'OTP can be resend only 3 times',
				'OTP can be resend only 3 times',
				400
			);
		}

		const timestamp = await redis.get(this.otp_resend_timestamp);
		const diff = Date.now() - Number(timestamp);

		if (diff < 2 * 60 * 1000) {
			throw new UserError(
				'OTP can be resend after 2 minutes',
				'OTP can be resend after 2 minutes',
				400
			);
		}

		// 🔑 Generate NEW OTP
		const newOtp = Math.floor(Math.random() * 899999 + 100000);

		// 🔄 Overwrite OTP with 5-minute expiry
		await redis.set(this.otp_key, newOtp, 'EX', OTP_EXPIRY_SECONDS);

		// 🔁 Reset retry attempts for new OTP
		await redis.set(this.otp_retry_key, 0, 'EX', OTP_EXPIRY_SECONDS);

		await this.incrOtpResend();
		await redis.set(
			this.otp_resend_timestamp,
			`${Date.now()}`,
			'EX',
			OTP_EXPIRY_SECONDS
		);

		return newOtp;
	}


	async resetOtp() {
		await redis.del(this.otp_key);
		await redis.del(this.otp_retry_key);
		await redis.del(this.otp_resend_key);
		await redis.del(this.otp_resend_timestamp);
		return true;
	}

	async incrOtpTry() {
		return await redis.incrby(this.otp_retry_key, 1);
	}
	async incrOtpResend() {
		return await redis.incrby(this.otp_resend_key, 1);
	}
}
