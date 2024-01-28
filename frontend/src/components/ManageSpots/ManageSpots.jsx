import { getUserSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SpotTile from "../LandingPage/SpotTile";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../ManageSpots/DeleteSpotModal";
import "./ManageSpots.css"
function ManageSpots() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const spots = useSelector((state) => {
		return state.spots.spots;
	});
	useEffect(() => {
		dispatch(getUserSpots());
	}, [dispatch]);
	
	return (
		<div className="large-boxes">
		<div className="user-spots">
			<h1>Manage Spots</h1>
			{spots.length >= 1 ? (
				<div className="user-spots-list">
					{spots.map((spot) => (
						<>
							<SpotTile key={spot.id} spot={spot} />
							<div className="button-list">
							<button className="update"
								onClick={() => {
									navigate(`/spots/${spot.id}/edit`);
								}}
							>
								Update
							</button>
							<OpenModalButton
								buttonText="Delete"
								modalComponent={<DeleteSpotModal spotId={spot.id} />}
							></OpenModalButton>
							</div>
						</>
					))}
				</div>
			) : (
				<NavLink className="create-spot"to="/spots/new">Create New Spot</NavLink>
			)}
			</div>
		</div>
	);
}

export default ManageSpots;
