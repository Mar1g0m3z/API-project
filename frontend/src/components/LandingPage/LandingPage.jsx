import { useEffect, useState } from "react";
import SpotTile from "./SpotTile";
import "./LandingPage.css";

const LandingPage = () => {
	const [spots, setSpots] = useState([]);

	useEffect(() => {
		const fetchSpots = async () => {
			try {
				const response = await fetch("/api/spots");
				const data = await response.json();
				if (data && data.Spots) {
					setSpots(data.Spots);
				}
			} catch (error) {
				console.error("Failed to fetch spots:", error);
			}
		};
		fetchSpots();
	}, []);

	return (
		<div className='landing-page'>
			<h1 className='spots-title'>All Spots</h1>
			<div className='spot-list'>
				{spots.map((spot) => (
					<SpotTile key={spot.id} spot={spot} />
				))}
			</div>
		</div>
	);
};

export default LandingPage;
