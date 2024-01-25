import { csrfFetch } from "./csrf";
import { fetchOneSpot } from "./spots";
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
	console.log("this is the action:", action);
	switch (action.type) {
		case GET_REVIEWS:
			return { ...state, reviews: action.payload };
		default:
			return state;
	}
}

export default reviewReducer;
