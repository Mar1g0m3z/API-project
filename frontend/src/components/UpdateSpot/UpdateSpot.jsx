import CreateSpotForm from "../CreateSpot/CreateSpotForm";
import { fetchOneSpot } from "../../store/spots";
import { useParams } from "react";

const UpdateSpot = () => {
	return (
		<>
			<h1> Update Spot </h1>
			<CreateSpotForm title="Update Form" spot={spot} />
		</>
	);
};

export default UpdateSpot;
