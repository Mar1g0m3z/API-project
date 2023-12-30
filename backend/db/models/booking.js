"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Booking.belongsTo(models.Spot, {
				foreignKey: "spotId",
			});
			Booking.belongsTo(models.User, {
				foreignKey: "userId",
			});
			// define association here
		}
	}
	Booking.init(
		{
			spotId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			startDate: { type: DataTypes.DATE, allowNull: false },
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isAfterStart() {
						if (this.endDate < this.startDate) {
							throw new Error("End date must be after the start date");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Booking",
		}
	);
	return Booking;
};
