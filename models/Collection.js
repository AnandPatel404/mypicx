'use strict';
export default function (sequelize, DataTypes) {
	const Collection = sequelize.define(
		'Collection',
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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		},
	);

	Collection.associate = function (models) {
		Collection.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Collection.belongsTo(models.Event, {
			foreignKey: 'event_id',
		});
		Collection.hasMany(models.Media, {
			foreignKey: 'collection_id',
		});
	};

	return Collection;
}
