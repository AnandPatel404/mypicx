// Imports
import Sequelize from 'sequelize';

// App Imports
import connection from '../config/db.js';

// Load models
// Note: on adding new model, add it here
import History from './History.js';
import Settings from './Settings.js';
import Plan from './Plan.js';
import Subscription from './Subscription.js';
import Transaction from './Transaction.js';
import User from './User.js';
import Branding from './Branding.js';
import Event from './Event.js';
import Collection from './Collection.js';
import Media from './Media.js';

const db = {
	User: User(connection, Sequelize.DataTypes),
	History: History(connection, Sequelize.DataTypes),
	Settings: Settings(connection, Sequelize.DataTypes),
	Transaction: Transaction(connection, Sequelize.DataTypes),
	Plan: Plan(connection, Sequelize.DataTypes),
	Subscription: Subscription(connection, Sequelize.DataTypes),
	Branding: Branding(connection, Sequelize.DataTypes),
	Event: Event(connection, Sequelize.DataTypes),
	Collection: Collection(connection, Sequelize.DataTypes),
	Media: Media(connection, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = connection;
db.Sequelize = Sequelize;
export { db as default };
