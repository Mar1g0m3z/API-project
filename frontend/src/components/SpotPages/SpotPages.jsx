import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Reviews from "../Reviews/Reviews";
import { fetchOneSpot } from "../../store/spots";
import "./SpotPages.css";
import { useDispatch, useSelector } from "react-redux";
function SpotPages() {
	const { spotId } = useParams();
	const dispatch = useDispatch();

	const spot = useSelector((state) => {
		console.log("HERE BE STARS", state);
		return state.spots.spot;
	});
	useEffect(() => {
		dispatch(fetchOneSpot(spotId));
	}, [spotId, dispatch]);

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
					<p className='star-rating'>
						<i className='fas fa-star'></i>
						{!spot.numReviews ? "New" : spot.avgStarRating.toFixed(1)}

						{spot.numReviews === 0
							? ""
							: spot.numReviews === 1
							? `·${spot.numReviews} Review`
							: `·${spot.numReviews} Reviews`}
					</p>
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
			<Reviews spot={spot} />
		</>
	) : (
		<div>Loading</div>
	);
}

export default SpotPages;
