import { csrfFetch } from "./csrf";
import { fetchOneSpot } from "./spots";

const DELETE_REVIEWS = "reviews/deleteReview";

const deleteReview = (reviewId) => ({
	type: DELETE_REVIEWS,
	reviewId: reviewId,
});

export const deleteUserReview = (reviewId) => async (dispatch) => {
	console.log(reviewId);
	try {
		const response = await csrfFetch(`/api/reviews/${reviewId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		if (data) {
			dispatch(deleteReview(reviewId));
		}
	} catch (error) {
		console.error("Failed to fetch reviews:", error);
	}
};
const GET_REVIEWS = "reviews/getReviews";

const getReview = (reviews) => ({
	type: GET_REVIEWS,
	payload: reviews,
});

export const getReviews = (spotId) => async (dispatch) => {
	try {
		const response = await fetch(`/api/spots/${spotId}/reviews`, {
			method: "GET",
		});

		const data = await response.json();
		if (data) {
			dispatch(
				getReview(
					data.Reviews.map((review) => {
						return { ...review, createdAtDate: new Date(review.createdAt) };
					}).sort((review1, review2) => {
						const firstDate = Date.parse(review1.createdAt);
						const secondDate = Date.parse(review2.createdAt);
						const subtractionTotal = secondDate - firstDate;
						return subtractionTotal;
					})
				)
			);
		}
	} catch (error) {
		console.error("Failed to fetch reviews:", error);
	}
};

// const createReviews = (reviews) => ({
// 	type: CREATE_REVIEW,
// 	payload: reviews,
// });

export const createReview = (reviews) => async (dispatch) => {
	const { review, stars, spotId } = reviews;
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: "POST",
		body: JSON.stringify({
			review,
			stars,
		}),
	});
	const data = await response.json();
	console.log(data);
	dispatch(getReviews(spotId));
	dispatch(fetchOneSpot(spotId));

	return data;
};

const initialState = { reviews: null };

function reviewReducer(state = initialState, action) {
	switch (action.type) {
		case GET_REVIEWS:
			return { ...state, reviews: action.payload };
		case DELETE_REVIEWS:
			return {
				...state,
				reviews: state.reviews.filter((review) =>
					review.id === action.reviewId ? false : true
				),
			};
		default:
			return state;
	}
}

export default reviewReducer;
