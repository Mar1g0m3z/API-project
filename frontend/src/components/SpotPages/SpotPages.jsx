import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SpotPages.css";
function SpotPages() {
	const { spotId } = useParams();
	console.log(spotId);
	const [spot, setSpot] = useState(null);

	useEffect(() => {
		const fetchSpots = async () => {
			try {
				const response = await fetch(`/api/spots/${spotId}`);
				const data = await response.json();
				if (data) {
					setSpot(data);
				}
			} catch (error) {
				console.error("Failed to fetch spot:", error);
			}
		};
		fetchSpots();
	}, [spotId]);

	return spot ? (
		<>
			<h1>{spot.name}</h1>
			<div className='spot-info'>
				<div className='large-box'>
					<img
						src={spot.SpotImages[0]?.url}
						alt={spot.name}
						className='spot-image-large'
					/>
					<p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
					<p>Hosted by {spot.Owner?.firstName}</p>
					<p>{spot.description}</p>
					<button
						className='Reserve'
						onClick={() => alert("Feature coming soon!")}
					>
						Reserve
					</button>
				</div>
				{spot.SpotImages.length > 1 && (
					<ul className='image-list'>
						{spot.SpotImages.slice(1, 5).map((image) => (
							<li key={image.id}>
								<img
									src={image.url}
									alt={spot.name}
									className='spot-image-small'
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	) : (
		<div>Loading</div>
	);
}

export default SpotPages;
