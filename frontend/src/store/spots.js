import { csrfFetch } from "./csrf";

const DELETE_SPOTS = "spots/deleteSpot";
const deleteSpot = (spotId) => ({
	type: DELETE_SPOTS,
	spotId: spotId,
});

export const deleteUserSpot = (spotId) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/spots/${spotId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		if (data) {
			dispatch(deleteSpot(spotId));
		}
	} catch (error) {
		console.error("Failed to delete spot,error");
	}
};

const UPDATE_SPOT = "spots/updateSpot";
const updateOneSpot = (spot) => ({
	type: UPDATE_SPOT,
	payload: spot,
});

export const updateSpot = (spot, oldSpot) => async (dispatch) => {
	const {
		country,
		address,
		city,
		state,
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
	try {
		const response = await csrfFetch(`/api/spots/${spot.id}/`, {
			method: "PUT",
			body: JSON.stringify({
				country,
				address,
				city,
				state,
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
		if (data) {
			dispatch(updateOneSpot(data));
		}
		if (previewImage) { oldSpot.SpotImages.forEach(async(image) => {
				
				await csrfFetch(`/api/spot-images/${image.id}`, {
					method: "DELETE",
				});
			});
			await csrfFetch(`/api/spots/${data.id}/images`, {
				method: "POST",
				body: JSON.stringify({
					url: previewImage,
					preview: true,
				}),
			});
		}
		const images = [image2, image3, image4, image5];
		images.forEach(async (image) => {
			if (image) {
				await csrfFetch(`/api/spots/${data.id}/images`, {
					method: "POST",
					body: JSON.stringify({
						url: image,
						preview: false,
					}),
				});
			}
		});

		return data;
	} catch (error) {
		console.error("Failed up update spot", error);
	}
};

const GET_USER_SPOTS = "spots/userSpots";

const userSpot = (spots) => ({
	type: GET_USER_SPOTS,
	payload: spots,
});

export const getUserSpots = () => async (dispatch) => {
	try {
		const response = await fetch(`/api/spots/current`, {});
		const data = await response.json();
		if (data) {
			dispatch(userSpot(data.Spots));
		}
	} catch (error) {
		console.error("Failed to fetch spots");
	}
};
const SET_SPOT = "spots/setSpot";
//action
const getSpot = (spot) => ({
	type: SET_SPOT,
	payload: spot,
});
export const fetchOneSpot = (spotId) => async (dispatch) => {
	try {
		const response = await fetch(`/api/spots/${spotId}`, {
			method: "GET",
		});
		const data = await response.json();
		if (data) {
			dispatch(getSpot(data));
		}
	} catch (error) {
		console.error("Failed to fetch spot:", error);
	}
};

const SET_SPOTS = "spots/getSpot";
export const getSpots = (spots) => ({
	type: SET_SPOTS,
	payload: spots,
});
//thunk action
export const fetchGetSpots =
	({ spots }) =>
	async (dispatch) => {
		const response = await csrfFetch("api/spots", {
			method: "GET",
			body: JSON.stringify({ spots }),
		});
		const data = await response.json();
		dispatch(getSpots(data));
		return data;
	};

export const createSpot = (spot) => async (dispatch) => {
	const {
		country,
		address,
		city,
		state,
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
			address,
			city,
			state,
			lat,
			lng,
			description,
			name,
			price,
		}),
	});
	const data = await response.json();
	dispatch(getSpot(data.spot));
	await csrfFetch(`/api/spots/${data.id}/images`, {
		method: "POST",
		body: JSON.stringify({
			url: previewImage,
			preview: true,
		}),
	});
	if (image2) {
		await csrfFetch(`/api/spots/${data.id}/images`, {
			method: "POST",
			body: JSON.stringify({
				url: image2,
				preview: false,
			}),
		});
	}
	if (image3) {
		await csrfFetch(`/api/spots/${data.id}/images`, {
			method: "POST",
			body: JSON.stringify({
				url: image3,
				preview: false,
			}),
		});
	}
	if (image4) {
		await csrfFetch(`/api/spots/${data.id}/images`, {
			method: "POST",
			body: JSON.stringify({
				url: image4,
				preview: false,
			}),
		});
	}
	if (image5) {
		await csrfFetch(`/api/spots/${data.id}/images`, {
			method: "POST",
			body: JSON.stringify({
				url: image5,
				preview: false,
			}),
		});
	}
	return data;
};

const initialState = { spot: null, spots: [] };

function spotReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SPOT:
			return { ...state, spot: action.payload };
		case GET_USER_SPOTS:
			return { ...state, spots: action.payload };
		case UPDATE_SPOT:
			return { ...state, spot: action.payload };
		case DELETE_SPOTS:
			return {
				...state,
				spots: state.spots.filter((spot) =>
					spot.id === action.spotId ? false : true
				),
			};
		default:
			return state;
	}
}
export default spotReducer;
