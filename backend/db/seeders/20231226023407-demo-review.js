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
				userId: 1,
				review:
					"I am not sure what I expected, but certainly not the awakening of Calamity Ganon",
				stars: 5,
			},
			{
				spotId: 2,
				userId: 2,
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
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {
			stars: { [Op.in]: [5, 2, 3] },
		});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
