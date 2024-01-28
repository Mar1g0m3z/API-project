"use strict";
const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate([
			{
				spotId: 1,
				userId: 2,
				review:
					"I am not sure what I expected, but certainly not the awakening of Calamity Ganon",
				stars: 5,
			},
			{
				spotId: 2,
				userId: 1,
				review: "W-what are they making mushroom soup out of?",
				stars: 2,
			},
			{
				spotId: 3,
				userId: 2,
				review:
					"Whiterun was nice, but the dragon attacks were absurd..also a orphan girl kept asking me to adopt her??",
				stars: 3,
			},
			{
				spotId: 4,
				userId: 5,
				review: "Woaaah Zebes is kinda dangerous though- but I bet...many artifacts to steal- I MEAN discover!",
				stars: 4,
			},
			{
				spotId: 5,
				userId: 6,
				review: "What the heck?? WHERE are the Racoons?!?",
				stars: 1,
			},
			{
				spotId: 6,
				userId: 4,
				review: "WOAH!! Did anyone hear that giant explosion??",
				stars: 4,
			},
			{
				spotId: 7,
				userId: 2,
				review: "Big fan of the nurses!! :D",
				stars: 4,
			},
			{
				spotId: 8,
				userId: 1,
				review: "Honestly? Despite me continuously dying and popping back in through a fire, the view was great!",
				stars: 3,
			},
			{
				spotId: 9,
				userId: 7,
				review: "UNDER THE SEA UNDER THE SEA- I KILLED POSEIDON. ",
				stars: 5,
			},
			{
				spotId: 1,
				userId: 8,
				review: "Hyrule Castle was majestic! The local cuisine is a bit too exotic for my tastes, though.",
				stars: 4,
			},
			{
				spotId: 2,
				userId: 9,
				review: "Mushroom Kingdom has its charm, but those Goombas kept looking at me funny.",
				stars: 3,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				stars: { [Op.in]: [5, 2, 3] },
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
