// import { csrfFetch } from "./csrf";

// const GET_SPOTS = "spot/getSpots";

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
