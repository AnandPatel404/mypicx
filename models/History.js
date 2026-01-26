'use strict';
export default function (sequelize, DataTypes) {
	const History = sequelize.define(
		'History',
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
			type: {
				type: DataTypes.STRING(25),
				allowNull: false,
			},
			text: {
				type: DataTypes.TEXT(),
				allowNull: false,
			},
			useragent: {
				type: DataTypes.TEXT(),
				allowNull: false,
			},
			ip: {
				type: DataTypes.STRING(95),
				allowNull: false,
			},
			browser: {
				type: DataTypes.STRING(95),
				allowNull: false,
			},
		},
		{ timestamps: true, paranoid: true },
	);

	History.associate = function (models) {
		// associations can be defined here
		History.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};

	return History;
}
