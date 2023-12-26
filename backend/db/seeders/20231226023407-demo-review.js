"use strict";
const { Review } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate([
			{
				spotId: 1,
				userId: 1,
				review:
					"I am not sure what I expected, but certainly not the awakening of Calamity Ganon",
				stars: 5,
			},
			{
				spotId: 2, // Existing spot ID
				userId: 2, // Existing user ID
				review: "W-what are they making mushroom soup out of?",
				stars: 2,
			},
			{
				spotId: 3,
				userId: 3,
				review:
					"Whiterun was nice, but the dragon attacks were obsurd..also a orphan girl kept asking me to adopt her??",
				stars: 3,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable();
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
