import { csrfFetch } from "./csrf";
const CREATE_SPOT = "spots/setSpot";

const setSpot = (spot) => ({
	type: CREATE_SPOT,
	payload: spot,
});

export const createSpot = (spot) => async (dispatch) => {
	const {
		country,
		street,
		city,
		lat,
		lng,
		description,
		name,
		price,
		previewImage,
		image2,
		image3,
		image4,
		image5,
	} = spot;
	const response = await csrfFetch("/api/spots", {
		method: "POST",
		body: JSON.stringify({
			country,
			street,
			city,
			lat,
			lng,
			description,
			name,
			price,
			previewImage,
			image2,
			image3,
			image4,
			image5,
		}),
	});
	const data = await response.json();
	dispatch(setSpot(data.spot));
	return spot;
};

const initialState = { spot: null };

function spotReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_SPOT:
			return { ...state, spot: action.payload };
		default:
			return state;
	}
}
export default spotReducer;

// //action
// export const getSpots = (spots) => ({
// 	type: GET_SPOTS,
// 	payload: spots,
// });

// //thunk action
// export const fetchGetSpots =
// 	({ spots }) =>
// 	async (dispatch) => {
// 		const response = await csrfFetch("api/spots", {
// 			method: "GET",
// 			body: JSON.stringify({ spots }),
// 		});
// 		const data = await response.json();
// 		dispatch(getSpots(data));
// 		return data;
// 	};
// const initialState = { spot: [] };

// function getAllSpotReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case GET_SPOTS: {
// 			return { ...state, spots: action.payload };
// 		}
// 		default:
// 			return state;
// 	}
// }
