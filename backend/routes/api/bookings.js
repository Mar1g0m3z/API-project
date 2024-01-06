const express = require("express");
const { Sequelize } = require("sequelize");
const { Booking, Spot, User, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
	const userId = req.user.id;

	const bookings = await Booking.findAll({
		where: { userId },
	});

	const bookingsWithSpotDetails = [];
	for (const booking of bookings) {
		let spot = await Spot.findByPk(booking.spotId, {
			attributes: [
				"id",
				"ownerId",
				"address",
				"city",
				"state",
				"country",
				"lat",
				"lng",
				"name",
				"price",
			],
		});

		const spotImage = await SpotImage.findOne({
			where: { spotId: booking.spotId },
			attributes: ["url"],
		});

		spot = spot.toJSON();

		spot.previewImage = spotImage ? spotImage.url : null;

		bookingsWithSpotDetails.push({
			id: booking.id,
			spotId: booking.spotId,
			Spot: spot,
			userId: booking.userId,
			startDate: booking.startDate,
			endDate: booking.endDate,
			createdAt: booking.createdAt,
			updatedAt: booking.updatedAt,
		});
	}

	res.status(200).json({ Bookings: bookingsWithSpotDetails });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
	const { bookingId } = req.params;
	const { startDate, endDate } = req.body;
	const userId = req.user.id;

	try {
		const booking = await Booking.findByPk(bookingId);

		if (!booking) {
			return res.status(404).json({ message: "Booking couldn't be found" });
		}

		if (booking.userId !== userId) {
			return res
				.status(403)
				.json({ message: "Unauthorized access to edit this booking" });
		}

		const currentDate = new Date();
		const selectedStartDate = new Date(startDate);
		const selectedEndDate = new Date(endDate);

		if (selectedStartDate < currentDate) {
			const existingBooking = await Booking.findOne({
				where: {
					id: { [Op.ne]: bookingId },
					spotId: booking.spotId,
					[Op.or]: [
						{
							startDate: { [Op.between]: [selectedStartDate, selectedEndDate] },
						},
						{ endDate: { [Op.between]: [selectedStartDate, selectedEndDate] } },
						{
							[Op.and]: [
								{ startDate: { [Op.lte]: selectedStartDate } },
								{ endDate: { [Op.gte]: selectedEndDate } },
							],
						},
					],
				},
			});

			if (existingBooking) {
				return res.status(403).json({
					message: "Sorry, this spot is already booked for the specified dates",
					errors: {
						startDate: "Start date conflicts with an existing booking",
						endDate: "End date conflicts with an existing booking",
					},
				});
			}
			return res
				.status(400)
				.json({ errors: { startDate: "Start date cannot be in the past" } });
		}

		if (selectedEndDate <= selectedStartDate) {
			return res
				.status(400)
				.json({ errors: { endDate: "End date must be after the start date" } });
		}

		if (booking.endDate < currentDate) {
			return res
				.status(403)
				.json({ message: "Past bookings can't be modified" });
		}

		booking.startDate = selectedStartDate;
		booking.endDate = selectedEndDate;
		await booking.save();

		res.status(200).json(booking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
	const { bookingId } = req.params;
	const userId = req.user.id;

	const booking = await Booking.findByPk(bookingId);

	if (!booking) {
		return res.status(404).json({ message: "Booking couldn't be found" });
	}

	const spot = await booking.getSpot();

	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	if (booking.userId !== userId && spot.ownerId !== userId) {
		return res.status(403).json({ message: "Unauthorized access" });
	}

	const currentDate = new Date();
	const bookingStartDate = new Date(booking.startDate);
	if (currentDate > bookingStartDate) {
		return res
			.status(403)
			.json({ message: "Bookings that have been started can't be deleted" });
	}

	await booking.destroy();

	res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
