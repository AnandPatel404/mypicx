import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const { SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, SMTP_PORT } = process.env;

const transport = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_USERNAME,
		pass: SMTP_PASSWORD,
	},
});

const sendEmail = (mail_obj) => {
	transport.sendMail(mail_obj, (err) => {
		if (err) {
			console.error('emailerror:', err);
			// check if htmlstream is still open and close it to clean up
			return;
		}
		console.log('Email Send');
	});
};

export default sendEmail;
