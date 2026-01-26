'use strict';
export default function (sequelize, DataTypes) {
	const Plan = sequelize.define(
		'Plan',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT(11),
			},
			icon: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			note: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			discount_amount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			currency: {
				type: DataTypes.ENUM('INR', 'USD'),
				defaultValue: 'INR',
			},
			type: {
				type: DataTypes.ENUM('monthly', 'annually', 'trial', 'private'),
				defaultValue: 'monthly',
			},
			status: {
				type: DataTypes.ENUM('active', 'deactivate'),
				defaultValue: 'active',
			},
			event_limit: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			//in mb
			storage: {
				type: DataTypes.INTEGER,	
				allowNull: false,
				defaultValue: 100,
			},
			validity: {
				type: DataTypes.INTEGER,
				defaultValue: 7,
			},
			data: {
				type: DataTypes.JSON,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		},
	);

	Plan.associate = function (models) {
		Plan.hasMany(models.Transaction, {
			foreignKey: 'plan_id',
		});
	};

	return Plan;
}
