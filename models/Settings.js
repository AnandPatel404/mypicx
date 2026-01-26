'use strict';
export default (sequelize, DataTypes) => {
	const Settings = sequelize.define(
		'Settings',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT(11),
			},
			key: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			value: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
	);

	return Settings;
};
