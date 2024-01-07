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
			{
				ownerId: 1,
				name: "Zebes",
				description:
					"Planet from Metroid series. Explore ancient ruins and encounter dangerous creatures.",
				address: "Brinstar",
				city: "Zebes",
				state: "Unknown",
				country: "Galactic Federation",
				lat: 34.23,
				lng: -67.45,
				price: 200,
			},
			{
				ownerId: 2,
				name: "Raccoon City",
				description:
					"A city plagued by the T-virus outbreak in the Resident Evil series.",
				address: "Uptown",
				city: "Raccoon City",
				state: "Arklay Mountains",
				country: "USA",
				lat: 40.75,
				lng: -74.0,
				price: 300,
			},
			{
				ownerId: 3,
				name: "Midgar",
				description:
					"The city dominating Final Fantasy VII's world. Home to the Shinra Electric Power Company.",
				address: "Sector 1",
				city: "Midgar",
				state: "Unknown",
				country: "Gaia",
				lat: 35.68,
				lng: 139.76,
				price: 450,
			},
			{
				ownerId: 1,
				name: "Silent Hill",
				description:
					"A mysterious town shrouded in fog and supernatural events from the Silent Hill series.",
				address: "Alchemilla Hospital",
				city: "Silent Hill",
				state: "Maine",
				country: "USA",
				lat: 44.95,
				lng: -93.09,
				price: 350,
			},
			{
				ownerId: 2,
				name: "Majula",
				description:
					"A melancholic town in Dark Souls II. Seek the cure for the curse among the ruins.",
				address: "Far Fire",
				city: "Majula",
				state: "Drangleic",
				country: "Unknown",
				lat: 50.23,
				lng: -1.48,
				price: 280,
			},
			{
				ownerId: 3,
				name: "Rapture",
				description:
					"An underwater utopia turned dystopia in BioShock series. Would you kindly rent a spot?",
				address: "Neptune's Bounty",
				city: "Rapture",
				state: "Unknown",
				country: "Atlantic Ocean",
				lat: 63.42,
				lng: -21.95,
				price: 500,
			},
			{
				ownerId: 1,
				name: "Kanto Region",
				description: "Home to the original Pokémon games. Gotta catch 'em all!",
				address: "Pallet Town",
				city: "Kanto",
				state: "Unknown",
				country: "Pokémon World",
				lat: 36.77,
				lng: -108.15,
				price: 250,
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
		return queryInterface.bulkDelete(
			options,
			{
				name: { [Op.in]: ["Hyrule Castle", "Mushroom Kingdom", "Whiterun"] },
			},
			{}
		);
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
