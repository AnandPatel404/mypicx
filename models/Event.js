'use strict';
import event_type from '../data/event_type.js';
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
			cover_image: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			starting_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			ending_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			event_type: {
				type: DataTypes.ENUM(...event_type),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('published', 'unpublished', 'expired'),
				allowNull: false,
				defaultValue: 'unpublished',
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			bulk_download: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			single_download: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			whatsapp_notification: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			email_notification: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			guest_access_pin:{
				type: DataTypes.INTEGER(4),
				allowNull: false,
			},
			full_access_pin:{
				type: DataTypes.INTEGER(4),
				allowNull: false,
			},
			photo_selection_with_full_access_pin:{
				type: DataTypes.INTEGER(4),
				allowNull: false,
			},
			vip_guest_access_pin:{
				type: DataTypes.INTEGER(4),
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
