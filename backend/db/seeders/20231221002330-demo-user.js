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
				{
					email: "masterchief@unsc.com",
					username: "MasterChief",
					hashedPassword: bcrypt.hashSync("Cortana117"),
					firstName: "John",
					lastName: "117",
				},
				{
					email: "lara@croftmanor.com",
					username: "LaraCroft",
					hashedPassword: bcrypt.hashSync("TombRaider"),
					firstName: "Lara",
					lastName: "Croft",
				},
				{
					email: "sonic@sega.com",
					username: "SonicTheHedgehog",
					hashedPassword: bcrypt.hashSync("GottaGoFast"),
					firstName: "Sonic",
					lastName: "Hedgehog",
				},
				{
					email: "kratos@olympus.com",
					username: "GhostOfSparta",
					hashedPassword: bcrypt.hashSync("BladesOfChaos"),
					firstName: "Kratos",
					lastName: "God",
				},
				{
					email: "samus@chozo.com",
					username: "SamusAran",
					hashedPassword: bcrypt.hashSync("MetroidHunter"),
					firstName: "Samus",
					lastName: "Aran",
				},
				{
					email: "link@hyrule.com",
					username: "HeroOfTime",
					hashedPassword: bcrypt.hashSync("Epona123"),
					firstName: "Link",
					lastName: "Hero",
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
