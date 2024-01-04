const express = require("express");
const { Sequelize } = require("sequelize");
const {
	Spot,
	SpotImage,
	Review,
	User,
	ReviewImage,
	Booking,
} = require("../../db/models");

const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const spots = await Spot.findAll();

		const spotsResponse = await Promise.all(
			spots.map(async (spot) => {
				const spotImages = await SpotImage.findAll({
					where: { spotId: spot.id },
					attributes: ["url"],
				});

				const reviewAvg = await Review.findOne({
					where: { spotId: spot.id },
					attributes: [
						[Sequelize.fn("AVG", Sequelize.col("stars")), "avgStars"],
					],
				});

				return {
					id: spot.id,
					ownerId: spot.ownerId,
					address: spot.address,
					city: spot.city,
					state: spot.state,
					country: spot.country,
					lat: spot.lat,
					lng: spot.lng,
					name: spot.name,
					description: spot.description,
					price: spot.price,
					createdAt: spot.createdAt,
					updatedAt: spot.updatedAt,
					spotImages,
					avgStars: reviewAvg ? reviewAvg.dataValues.avgStars : null,
				};
			})
		);

		res.status(200).json({ spots: spotsResponse });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/current", requireAuth, async (req, res) => {
	try {
		const userId = req.user.id;

		const spots = await Spot.findAll({
			where: { ownerId: userId },
			// attributes: [
			// 	"id",
			// 	"ownerId",
			// 	"address",
			// 	"city",
			// 	"state",
			// 	"country",
			// 	"lat",
			// 	"lng",
			// 	"name",
			// 	"description",
			// 	"price",
			// 	"createdAt",
			// 	"updatedAt",
			// ],
		});
		// console.log(spots);
		const spotsResponse = await Promise.all(
			spots.map(async (spot) => {
				const reviews = await Review.findAll({
					where: { spotId: spot.id },
					attributes: [
						[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
					],
					group: ["spotId"],
				});

				const spotImages = await SpotImage.findAll({
					where: { spotId: spot.id },
					attributes: ["url"],
				});

				return {
					id: spot.id,
					ownerId: spot.ownerId,
					address: spot.address,
					city: spot.city,
					state: spot.state,
					country: spot.country,
					lat: spot.lat,
					lng: spot.lng,
					name: spot.name,
					description: spot.description,
					price: spot.price,
					createdAt: spot.createdAt,
					updatedAt: spot.updatedAt,
					avgRating:
						reviews.length > 0 ? reviews[0].dataValues.avgRating : null,
					previewImage: spotImages.length > 0 ? spotImages[0].url : null,
				};
			})
		);

		return res.status(200).json({ Spots: spotsResponse });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/:spotId", async (req, res) => {
	try {
		const spotId = req.params.spotId;

		const spot = await Spot.findByPk(spotId, {
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
				"description",
				"price",
				"createdAt",
				"updatedAt",
			],
		});

		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}

		const spotImages = await SpotImage.findAll({
			where: { spotId },
			attributes: ["id", "url", "preview"],
		});

		const owner = await User.findByPk(spot.ownerId, {
			attributes: ["id", "firstName", "lastName"],
		});

		const reviewsCount = await Review.count({ where: { spotId } });

		const reviews = await Review.findAll({
			where: { spotId },
			attributes: ["stars"],
		});

		const numReviews = reviews.length;
		let avgStarRating = 0;
		if (numReviews > 0) {
			avgStarRating =
				reviews.reduce((acc, curr) => acc + curr.stars, 0) / numReviews;
		}

		const spotDetails = {
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: spot.lat,
			lng: spot.lng,
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: spot.createdAt,
			updatedAt: spot.updatedAt,
			numReviews: reviewsCount,
			avgStarRating,
			SpotImages: spotImages,
			Owner: owner,
		};

		res.status(200).json(spotDetails);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

const validateSpot = async (req, res) => {
	try {
		const {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		} = req.body;
		const errors = {};

		if (!address) {
			errors.address = "Street address is required";
		}
		if (!city) {
			errors.city = "City is required";
		}
		if (!state) {
			errors.state = "State is required";
		}
		if (!country) {
			errors.country = "Country is required";
		}
		if (lat < -90 || lat > 90) {
			errors.lat = "Latitude must be within -90 and 90";
		}
		if (lng < -180 || lng > 180) {
			errors.lng = "Longitude must be within -180 and 180";
		}
		if (name.length >= 50) {
			errors.name = "Name must be less than 50 characters";
		}
		if (!description) {
			errors.description = "Description is required";
		}
		if (price < 0) {
			errors.price = "Price per day must be a positive number";
		}

		if (Object.keys(errors).length > 0) {
			return res.status(400).json({ message: "Bad Request", errors });
		}

		return true;
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

router.get("/:spotId/reviews", async (req, res) => {
	const spotId = req.params.spotId;

	try {
		// Find reviews for the specified spot ID
		const reviews = await Review.findAll({
			where: { spotId: spotId },
			attributes: [
				"id",
				"userId",
				"spotId",
				"review",
				"stars",
				"createdAt",
				"updatedAt",
			],
		});

		if (!reviews || reviews.length === 0) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}

		const reviewsWithDetails = await Promise.all(
			reviews.map(async (review) => {
				const user = await User.findByPk(review.userId, {
					attributes: ["id", "firstName", "lastName"],
				});

				const reviewImages = await ReviewImage.findAll({
					where: { reviewId: review.id },
					attributes: ["id", "url"],
				});

				return {
					id: review.id,
					userId: review.userId,
					spotId: review.spotId,
					review: review.review,
					stars: review.stars,
					createdAt: review.createdAt,
					updatedAt: review.updatedAt,
					User: user,
					ReviewImages: reviewImages,
				};
			})
		);

		res.status(200).json({ Reviews: reviewsWithDetails });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
	try {
		const spotId = req.params.spotId;
		const userId = req.user.id;

		const spot = await Spot.findByPk(spotId);
		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}

		const isOwner = spot.ownerId === userId;

		const user = await User.findByPk(userId, {
			attributes: ["id", "firstName", "lastName"],
		});

		let formattedBookings = [];
		if (isOwner) {
			const bookings = await Booking.findAll({
				where: { spotId },
				include: {
					model: User,
					as: "User",
					attributes: ["id", "firstName", "lastName"],
				},
			});
			formattedBookings = bookings.map((booking) => ({
				User: {
					id: booking.User.id,
					firstName: booking.User.firstName,
					lastName: booking.User.lastName,
				},
				id: booking.id,
				spotId: booking.spotId,
				userId: booking.userId,
				startDate: booking.startDate,
				endDate: booking.endDate,
				createdAt: booking.createdAt,
				updatedAt: booking.updatedAt,
			}));
		} else {
			const bookings = await Booking.findAll({
				where: { spotId },
				attributes: ["spotId", "startDate", "endDate"],
			});
			formattedBookings = bookings.map((booking) => ({
				spotId: booking.spotId,
				startDate: booking.startDate,
				endDate: booking.endDate,
			}));
		}

		return res.status(200).json({ User: user, Bookings: formattedBookings });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/", requireAuth, async (req, res) => {
	const validation = await validateSpot(req, res);
	if (validation !== true) return;

	try {
		const userId = req.user.id;

		const {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		} = req.body;

		const newSpot = await Spot.create(
			{
				address,
				city,
				state,
				country,
				lat,
				lng,
				name,
				description,
				price,
				ownerId: userId,
			},
			{
				fields: [
					"address",
					"city",
					"state",
					"country",
					"lat",
					"lng",
					"name",
					"description",
					"price",
					"ownerId",
				],
			}
		);

		return res.status(201).json(newSpot);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const userId = req.user.id;
	const { url, preview } = req.body;

	const spot = await Spot.findByPk(spotId);
	if (spot.ownerId !== userId) {
		return res
			.status(403)
			.json({ message: "You are not authorized to add an image to this spot" });
	}
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}
	const newImage = await SpotImage.create({
		spotId,
		url,
		preview,
	});

	return res.status(200).json({
		id: newImage.id,
		url: newImage.url,
		preview: newImage.preview,
	});
});

router.post("/:spotId/reviews", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const userId = req.user.id;
	const { review, stars } = req.body;

	const spot = await Spot.findByPk(spotId);
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	const existingReview = await Review.findOne({
		where: { userId: userId, spotId: spotId },
	});
	if (existingReview) {
		return res
			.status(403)
			.json({ message: "User already has a review for this spot" });
	}

	const errors = {};
	if (!review) {
		errors.review = "Review text is required";
	}
	if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
		errors.stars = "Stars must be an integer from 1 to 5";
	}
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ message: "Bad Request", errors });
	}

	const newReview = await Review.create({
		userId,
		spotId,
		review,
		stars,
	});

	res.status(201).json(newReview);
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const { startDate, endDate } = req.body;
	const userId = req.user.id;

	try {
		const spot = await Spot.findByPk(spotId);

		if (!spot) {
			return res.status(404).json({ message: "Spot couldn't be found" });
		}

		if (spot.ownerId === userId) {
			return res.status(403).json({ message: "You can't book your own spot" });
		}

		const currentDate = new Date();
		const selectedStartDate = new Date(startDate);
		const selectedEndDate = new Date(endDate);

		if (selectedStartDate < currentDate) {
			return res
				.status(400)
				.json({ errors: { startDate: "Start date cannot be in the past" } });
		}

		if (selectedEndDate <= selectedStartDate) {
			return res
				.status(400)
				.json({ errors: { endDate: "End date must be after the start date" } });
		}

		const existingBooking = await Booking.findOne({
			where: {
				spotId,
				[Op.or]: [
					{
						[Op.and]: [
							{ startDate: { [Op.lte]: selectedStartDate } },
							{ endDate: { [Op.gt]: selectedStartDate } },
						],
					},
					{
						[Op.and]: [
							{ startDate: { [Op.lt]: selectedEndDate } },
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

		const newBooking = await Booking.create({
			spotId,
			userId,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
		});

		res.status(200).json(newBooking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.put("/:spotId", requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const userId = req.user.id;
	const spot = await Spot.findByPk(spotId);

	if (spot.ownerId !== userId) {
		return res
			.status(403)
			.json({ message: "You are not authorized to add an image to this spot" });
	}
	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const errors = {};
	if (!address) errors.address = "Street address is required";
	if (!city) errors.city = "City is required";
	if (!state) errors.state = "State is required";
	if (!country) errors.country = "Country is required";
	if (!lat || lat < -90 || lat > 90)
		errors.lat = "Latitude must be within -90 and 90";
	if (!lng || lng < -180 || lng > 180)
		errors.lng = "Longitude must be within -180 and 180";
	if (!name) errors.name = "Name is required";
	else if (name.length >= 50)
		errors.name = "Name must be less than 50 characters";
	if (!description) errors.description = "Description is required";
	if (price === undefined || price < 0)
		errors.price = "Price per day must be a positive number";

	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ message: "Bad Request", errors });
	}

	spot.address = address;
	spot.city = city || spot.city;
	spot.state = state || spot.state;
	spot.country = country || spot.country;
	spot.lat = lat || spot.lat;
	spot.lng = lng || spot.lng;
	spot.name = name || spot.name;
	spot.description = description || spot.description;
	spot.price = price || spot.price;

	await spot.save();
	res.json(spot);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const userId = req.user.id;

	const existingSpot = await Spot.findByPk(spotId);
	if (!existingSpot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}
	if (existingSpot.ownerId !== userId) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	await existingSpot.destroy();

	return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
