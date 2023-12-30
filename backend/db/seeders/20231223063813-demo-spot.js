"use strict";
const { User } = require("../models");
const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate([
			{
				ownerId: 1,
				name: "Hyrule Castle",
				description:
					"The iconic castle from The Legend of Zelda series. Includes a Sword and Shield so you are not Alone. The price is in rupees",
				address: "Castle Town",
				city: "Hyrule",
				state: "Hyrule",
				country: "Hyrule",
				lat: 12.3456,
				lng: -78.9012,
				price: 100,
			},
			{
				ownerId: 2,
				name: "Mushroom Kingdom",
				description:
					"The beloved kingdom from the Super Mario series. Toads are included in room service!",
				address: "Peach's Castle",
				city: "Toad Town",
				state: "Mushroom Kingdom",
				country: "Mushroom Kingdom",
				lat: 34.5678,
				lng: -123.4567,
				price: 99,
			},
			{
				ownerId: 3,
				name: "Whiterun",
				description:
					"The central city in The Elder Scrolls V: Skyrim.I used to be a traveler like you until I took an arrow to the knee, now I own a rental spot...",
				address: "Dragonsreach",
				city: "Whiterun",
				state: "Skyrim",
				country: "Tamriel",
				lat: 45.0,
				lng: -110.0,
				price: 500,
			},
		]);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			name: { [Op.in]: ["Hyrule Castle", "Mushroom Kingdom", "Whiterun"] },
		});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
