const express = require("express");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validationResult } = require("express-validator");
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
		console.log(spots);
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
module.exports = router;
