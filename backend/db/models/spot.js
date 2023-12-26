"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Spot extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Spot.belongsTo(models.User, { foreignKey: "ownerId" });
			// define association here
			Spot.hasMany(models.Review, {
				foreignKey: "spotId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	Spot.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				references: { model: "User", key: "id" },
			},
			address: DataTypes.TEXT,
			city: DataTypes.TEXT,
			state: DataTypes.TEXT,
			country: DataTypes.TEXT,
			lat: DataTypes.DECIMAL,
			lng: DataTypes.DECIMAL,
			name: DataTypes.TEXT,
			description: DataTypes.TEXT,
			price: DataTypes.DECIMAL,
		},
		{
			sequelize,
			modelName: "Spot",
		}
	);
	return Spot;
};
