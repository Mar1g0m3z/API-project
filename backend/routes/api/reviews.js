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
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
	const userId = req.user.id;
	try {
		const reviews = await Review.findAll({
			where: { userId: userId },
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

		const user = await User.findByPk(userId, {
			attributes: ["id", "firstName", "lastName"],
		});
		const reviewsWithDetails = await Promise.all(
			reviews.map(async (review) => {
				let spot = await Spot.findByPk(review.spotId, {
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

				const spotImages = await SpotImage.findAll({
					where: { spotId: review.spotId },
					attributes: ["url"],
				});

				const reviewImages = await ReviewImage.findAll({
					where: { reviewId: review.id },
					attributes: ["id", "url"],
				});

				spot = spot.toJSON();

				spot.previewImage = spotImages.length > 0 ? spotImages[0].url : null;

				return {
					id: review.id,
					userId: review.userId,
					spotId: review.spotId,
					review: review.review,
					stars: review.stars,
					createdAt: review.createdAt,
					updatedAt: review.updatedAt,
					User: user,
					Spot: spot,
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

router.post("/:reviewId/images", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { reviewId } = req.params;
	const { url, preview } = req.body;

	try {
		const review = await Review.findByPk(reviewId);

		if (!review) {
			return res.status(404).json({ message: "Review couldn't be found" });
		}

		if (review.userId !== userId) {
			return res.status(403).json({ message: "Unauthorized access to review" });
		}

		const existingImagesCount = await ReviewImage.count({
			where: { reviewId },
		});

		if (existingImagesCount >= 10) {
			return res.status(403).json({
				message: "Maximum number of images for this review was reached",
			});
		}

		const createdImage = await ReviewImage.create({
			reviewId,
			url,
			preview,
		});

		const response = {
			id: createdImage.id,
			url: createdImage.url,
			preview: createdImage.preview,
		};

		return res.status(200).json(response);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

router.put("/:reviewId", requireAuth, async (req, res) => {
	const { reviewId } = req.params;
	const userId = req.user.id;
	const existingReview = await Review.findByPk(reviewId);

	if (!existingReview) {
		return res.status(404).json({ message: "Review couldn't be found" });
	}

	if (existingReview.userId !== userId) {
		return res.status(403).json({ message: "Unauthorized access to review" });
	}
	const { review, stars } = req.body;

	const errors = {};
	if (!review) errors.review = "Review text is required";
	if (!Number.isInteger(stars) || stars < 1 || stars > 5)
		errors.stars = "Stars must be an integer from 1 to 5";
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ message: "Bad Request", errors });
	}

	existingReview.review = review;
	existingReview.stars = stars;

	await existingReview.save();
	res.json(existingReview);
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
	try {
		const { reviewId } = req.params;
		const userId = req.user.id;

		const existingReview = await Review.findByPk(reviewId);

		if (!existingReview) {
			return res.status(404).json({ message: "Review couldn't be found" });
		}

		if (existingReview.userId !== userId) {
			return res.status(403).json({ message: "Unauthorized access to review" });
		}

		await existingReview.destroy();

		res.status(200).json({ message: "Successfully deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
