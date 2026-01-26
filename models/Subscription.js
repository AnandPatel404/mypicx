'use strict';
export default function (sequelize, DataTypes) {
	const Subscription = sequelize.define(
		'Subscription',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT(11),
			},
			user_id: {
				type: DataTypes.BIGINT(11),
				allowNull: false,
			},
			plan_id: {
				type: DataTypes.BIGINT(11),
				allowNull: false,
			},
			end: {
				type: DataTypes.DATE(),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('active', 'deactivate', 'expired'),
				defaultValue: 'active',
			},
			event_limit: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			storage: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			data: {
				type: DataTypes.JSON,
				allowNull: true,
			}
		},
		{
			timestamps: true,
			paranoid: true
		},
	);

	Subscription.associate = function (models) {
		// associations can be defined here
		Subscription.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Subscription.belongsTo(models.Plan, {
			foreignKey: 'plan_id',
		});
	};

	return Subscription;
}
