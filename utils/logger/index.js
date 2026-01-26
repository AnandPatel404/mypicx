import winston from 'winston';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(), // keep files clean
	defaultMeta: { service: 'user-service' },
	//transports: [
	//	new winston.transports.File({
	//		filename: 'error.log',
	//		level: 'error',
	//	}),
	//],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),   // 🎨 colors
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message, ...meta }) => {
					const metaStr = Object.keys(meta).length
						? JSON.stringify(meta)
						: '';
					return `${timestamp} ${level}: ${message} ${metaStr}`;
				})
			),
		})
	);
}

export default logger;
