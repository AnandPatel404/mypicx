'use strict';
export default function (sequelize, DataTypes) {
	const Transaction = sequelize.define(
		'Transaction',
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
			currency: {
				type: DataTypes.ENUM('INR', 'USD'),
				defaultValue: 'INR',
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			txn_id: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			gateway_txn_id: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('pending', 'failure', 'success'),
				defaultValue: 'pending',
			},
			note:{
				type: DataTypes.STRING,
				allowNull: true,
			},
			txnAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			data:{
				type: DataTypes.JSON,
				allowNull: true,
			},
		},
		{
			timestamps: true,
			paranoid: true
		},
	);

	Transaction.associate = function (models) {
		Transaction.belongsTo(models.User, {
			foreignKey: 'user_id',
			onDelete: 'cascade',
			hooks: true,
		});
		Transaction.belongsTo(models.Plan, {
			foreignKey: 'plan_id',
		});
	};

	return Transaction;
}
