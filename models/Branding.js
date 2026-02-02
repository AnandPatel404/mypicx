'use strict';
export default function (sequelize, DataTypes) {
	const Branding = sequelize.define(
		'Branding',
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
			insta_link:{
				type: DataTypes.STRING,
				allowNull: true,	
			}
		},
		{
			timestamps: true,
			paranoid: true
		},
	);

	Branding.associate = function (models) {
		Branding.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
	};

	return Branding;
}
