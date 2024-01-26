import CreateSpotForm from "../CreateSpot/CreateSpotForm";
import { fetchOneSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const UpdateSpot = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => {
		return state.spots.spot;
	});
	useEffect(() => {
		dispatch(fetchOneSpot(spotId));
	}, [dispatch, spotId]);

	return spot === null || spot.id.toString() !== spotId ? (
		<h3>Loading</h3>
	) : (
		<>
			<h1> Update Spot </h1>
			<CreateSpotForm title="Update Form" spot={spot} />
		</>
	);
};

export default UpdateSpot;
