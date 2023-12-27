"use strict";
const { SpotImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate([
			{
				spotId: 1,
				url: "https://static.wikia.nocookie.net/nintendo/images/5/54/Hyrule_Castle.jpg/revision/latest/scale-to-width-down/1000?cb=20220929012524&path-prefix=en",
				preview: true,
			},
			{
				spotId: 2,
				url: "https://i.pinimg.com/originals/92/ad/c8/92adc8206053a61a127a0376ca3bfc07.jpg",
				preview: true,
			},
			{
				spotId: 3,
				url: "https://static.wikia.nocookie.net/elderscrolls/images/2/21/Whiterun_Skyrim.png/revision/latest/scale-to-width-down/1000?cb=20141014143530",
				preview: true,
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
		await queryInterface.bulkDelete("SpotImages", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
