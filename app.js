import env from 'dotenv';
env.config();
import express from 'express';
import paginate from 'express-paginate';
import RedisStore from 'connect-redis';
import session from 'express-session';
import helmet from 'helmet';
import { notFound } from './middlewares/errorMiddleware.js';
import errorMiddleware from './utils/responseErrorHandler.js';
import Redis from 'ioredis';
import moment from 'moment';
import cors from 'cors';
import useragent from 'express-useragent';
import path from 'path';
import passport from 'passport';
import googleAuth from './controllers/googleAuth.js';
import passportConfig from './controllers/passport.js';
import { isUserAuth } from './middlewares/userAuthMiddleware.js';

passportConfig(passport);
googleAuth(passport);

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';

// recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);
const redisClient = new Redis();

app.locals.moment = moment;

app.use(
	session({
		store: new RedisStore({
			client: redisClient,
			ttl: 3200,
			prefix: 'my_pic:',
			db: 1,
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(
	cors({
		origin: process.env.NODE_ENV === 'development' ? true : process.env.CORS_ORIGIN,
	}),
);

app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			directives: {
				...helmet.contentSecurityPolicy.getDefaultDirectives(),
				'img-src': ["'self'", 'https://*', 'data:'],
				'script-src': [
					"'self'",
					'https://*',
					"'unsafe-inline'",
					"'unsafe-eval'",
					'https://www.google-analytics.com/analytics.js',
					'https://connect.facebook.net/en_US/fbevents.js',
				],
				'default-src': ["'self'", 'https://*', 'data:'],
				'form-action': [
					"'self'",
					process.env.NODE_ENV === 'development'
						? 'https://sandbox.cashfree.com'
						: 'https://api.cashfree.com',
				],
			},
		},
	}),
);

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(paginate.middleware(20, 50));
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());

app.use('/', indexRouter);
app.use('/users', isUserAuth, usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// 404 handler (no route matched)
app.use(notFound);

// GLOBAL ERROR HANDLER (asyncHandler errors come here)
app.use(errorMiddleware); // <-- ADD THIS
// error handler
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

export default app;
