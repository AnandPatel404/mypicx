'use strict';
export default function (sequelize, DataTypes) {
	const Event = sequelize.define(
		'Event',
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
			brand_id: {
				type: DataTypes.BIGINT(11),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			starting_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			ending_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			event_type: {
				type: DataTypes.ENUM('wedding', 'engagement', 'prewedding', 'birthday', 'babby_shoot', 'anniversary', 'maternity', 'sport', 'corporate', 'other'),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		},
	);

	Event.associate = function (models) {
		Event.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Event.belongsTo(models.Branding, {
			foreignKey: 'brand_id',
		});
		Event.hasMany(models.Collection, {
			foreignKey: 'event_id',
		});
		Event.hasMany(models.Media, {
			foreignKey: 'event_id',
		});
	};

	return Event;
}
