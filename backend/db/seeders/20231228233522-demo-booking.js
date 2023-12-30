"use strict";

const { Booking } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Booking.bulkCreate([
			{
				spotId: 1,
				userId: 2,
				startDate: new Date("2023-01-01"),
				endDate: new Date("2023-01-05"),
			},
			{
				spotId: 3,
				userId: 1,
				startDate: new Date("2023-02-01"),
				endDate: new Date("2023-03-05"),
			},
			{
				spotId: 2,
				userId: 3,
				startDate: new Date("2023-01-07"),
				endDate: new Date("2023-03-05"),
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
		await queryInterface.bulkDelete("Bookings", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
