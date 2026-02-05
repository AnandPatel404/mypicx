'use strict';
export default function (sequelize, DataTypes) {
	const Media = sequelize.define(
		'Media',
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
			event_id: {
				type: DataTypes.BIGINT(11),
				allowNull: false,
			},
			collection_id: {
				type: DataTypes.BIGINT(11),
				allowNull: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			generated_name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			path: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			thumbnail_path: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			resolution_size: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			//this is size of media like in mb or gb
			size: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			note: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			type: {
				type: DataTypes.ENUM('image', 'video'),
				allowNull: false,
				defaultValue: 'image',
			},
			data:{
				type: DataTypes.JSON,
				allowNull: true,
			}
		},
		{
			timestamps: true,
		},
	);

	Media.associate = function (models) {
		Media.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Media.belongsTo(models.Event, {
			foreignKey: 'event_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Media.belongsTo(models.Collection, {
			foreignKey: 'collection_id',
		});
	};

	return Media;
}
