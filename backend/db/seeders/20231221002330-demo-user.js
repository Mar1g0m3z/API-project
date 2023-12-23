"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					email: "zelda@hyrule.com",
					username: "PrincessZelda",
					hashedPassword: bcrypt.hashSync("Triforce123"),
					firstName: "Zelda",
					lastName: "Hyrule",
				},
				{
					email: "mario@mushroomkingdom.com",
					username: "SuperMario",
					hashedPassword: bcrypt.hashSync("Its-aMeMario"),
					firstName: "Mario",
					lastName: "Bros",
				},
				{
					email: "dragonborn@skyrim.com",
					username: "Dragonborn",
					hashedPassword: bcrypt.hashSync("FusRoDah456"),
					firstName: "Dragon",
					lastName: "Born",
				},
			],
			{ validate: true }
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["PrincessZelda", "SuperMario", "Dragonborn"] },
			},
			{}
		);
	},
};
