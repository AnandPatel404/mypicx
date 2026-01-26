import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
	host: process.env.DATABASE_URL,
	port: process.env.DATABASE_PORT,
	dialect: 'mysql',
	logging: process.env.DATABASE_LOG == 'true' ? console.log : false,
	define: {
		// prevent sequelize from pluralizing table names
		freezeTableName: true,
	},
	//timezone: '+05:30',
});

export { connection as default };
