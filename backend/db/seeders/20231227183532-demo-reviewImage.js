"use strict";
const { ReviewImage } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await ReviewImage.bulkCreate([
			{
				reviewId: 1,
				url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/11/zelda-botw-blood-moon-calamity-ganon.jpg",
			},
			{
				reviewId: 2,
				url: "https://catwithmonocle.com/wp-content/uploads/2023/04/smb-movie-peach-castle-3840x2160-1.jpg",
			},
			{
				reviewId: 3,
				url: "https://static.wikia.nocookie.net/elderscrolls/images/2/21/Whiterun_Skyrim.png/revision/latest/scale-to-width-down/1200?cb=20141014143530",
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
		return queryInterface.bulkDelete("ReviewImages", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
