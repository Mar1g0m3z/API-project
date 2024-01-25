import { getUserSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SpotTile from "../LandingPage/SpotTile";
import { NavLink, useNavigate } from "react-router-dom";

function ManageSpots() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const spots = useSelector((state) => {
		return state.spots.spots;
	});
	useEffect(() => {
		dispatch(getUserSpots());
	}, [dispatch]);
	console.log("MANAGE SPOTS SPOTS", spots);
	return (
		<div className="user-spots">
			<h1>Manage Spots</h1>
			{spots.length >= 1 ? (
				<div className="user-spots-list">
					{spots.map((spot) => (
						<>
							<SpotTile key={spot.id} spot={spot} />
							<button
								onClick={() => {
									navigate(`/spots/${spot.id}/edit`);
								}}
							>
								Update
							</button>
							<button>Delete</button>
						</>
					))}
				</div>
			) : (
				<NavLink to="/spots/new">Create New Spot</NavLink>
			)}
		</div>
	);
}

export default ManageSpots;
