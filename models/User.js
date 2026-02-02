'use strict';
import bcrypt from 'bcrypt';
export default function (sequelize, DataTypes) {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT(11),
			},
			name: {
				type: DataTypes.STRING(25),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(95),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			user_type: {
				type: DataTypes.ENUM('user', 'admin', 'reseller'),
				defaultValue: 'user',
			},
			sso: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			status: {
				type: DataTypes.ENUM('active', 'deactivate', 'block'),
				defaultValue: 'active',
			},
			business_name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: true,
			paranoid: true
		},
	);

	User.beforeCreate(async (user) => {
		if (user.sso) return;
		return bcrypt
			.hash(user.password, 10)
			.then((hash) => {
				user.password = hash;
			})
			.catch((err) => {
				console.error('userLoginError', err);
				throw new Error("Something went wrong.");
			});
	});

	// TODO : after user create send welcome email
	User.prototype.generateHash = function (password) {
		return bcrypt.hashSync(password, 10);
	};

	User.prototype.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.History, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Transaction, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Subscription, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Event, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Collection, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Branding, {
			foreignKey: 'user_id',
		});
		User.hasMany(models.Media, {
			foreignKey: 'user_id',
		});
	};


	return User;
}
