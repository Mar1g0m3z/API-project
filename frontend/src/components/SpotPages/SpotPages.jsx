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
		// console.log("HERE BE STARS", state);
		return state.spots.spot;
	});
	useEffect(() => {
		dispatch(fetchOneSpot(spotId));
	}, [spotId, dispatch]);

	return spot ? (
		<div className="spot-body">
			
				<h1>{spot.name}</h1>
				
				<div className="spot-info">
					<h3 className="spot-location">{`${spot.city}, ${spot.state}`}</h3>
				</div>

	
			
				<div className="large-box">
					<div className="large-picture">
						{spot.SpotImages !== undefined  && spot.SpotImages.length >= 1 ? (
							<img
								src={spot.SpotImages.find((image)=>{
								return image.preview === true 
								}).url}
								alt={spot.name}
								className="spot-image-large"
							/>
						) : null}
					</div>
					<div className="small-pictures">
						{spot.SpotImages && spot.SpotImages.length > 1 ? (
							<ul className="image-list">
								{spot.SpotImages.filter((image)=>image.preview === false).map((image) => (
									<li key={image.id}>
										<img
											src={image.url}
											alt={spot.name}
											className="spot-image-small"
										/>
										
									</li>
								))}
							</ul>
						) : null}
					</div>
					</div>
					<div className="positioner">
					<div className="host-and-desc">
						<h3>
							Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
						</h3>

						<p>{spot.description}</p>
					</div>
					<div className="right-box">
					<div className="rating-price">
						<p className="star-rating">
							<i className="fas fa-star"></i>
							{!spot.numReviews ? "New" : spot.avgStarRating.toFixed(1)}

							{spot.numReviews === 0
								? ""
								: spot.numReviews ===  1
								? `·${spot.numReviews} Review`
								: `·${spot.numReviews} Reviews`}
						</p>
						<p className="spot-price-single">{`$${spot.price} / night`}</p>
						</div>
						<button
							className="reserve"
							onClick={() => alert("Feature coming soon!")}
						>
							Reserve
						</button>
					</div>
					</div>
				
			
			<Reviews spot={spot} />
		</div>
	) : (
		<div>Loading</div>
	);
}

export default SpotPages;
