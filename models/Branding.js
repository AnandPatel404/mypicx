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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			brand_logo: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			tagline: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			about_us: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			contact_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			contact_email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			website: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			facebook: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			instagram: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			youtube: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			linkedin: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			whatsapp: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			x: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			snapchat: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			tiktok: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			default: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			}
		},
		{
			timestamps: true,
		},
	);

	Branding.associate = function (models) {
		Branding.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Branding.hasMany(models.Event, {
			foreignKey: 'brand_id',
		});
	};

	return Branding;
}
