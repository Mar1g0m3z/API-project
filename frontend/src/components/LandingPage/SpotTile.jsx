import { NavLink } from "react-router-dom";

const SpotTile = ({ spot }) => {
	const rating = spot.avgRating || spot.avgStars
	const displayRating = rating
		? parseFloat(rating).toFixed(1)
		: "New";
	return (
		<NavLink to={`/spots/${spot.id}`} className='spot-link' >
			<div className='spot-tile'>
			<div className="tooltip">{spot.name}</div>
				<img src={spot.previewImage} alt={spot.name} className='spot-image' />

				<div className='spot-info'>
					<p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
					<p className='spot-rating'>
						<i className='fas fa-star'></i>
						{displayRating}
					</p>
				</div>
				<p className='spot-price'>{`$${spot.price} / night`}</p>
			</div>
		</NavLink>
	);
};

// const SpotTile = ({ spot }) => {
// 	const displayRating = spot.avgStars ? spot.avgStars.toFixed(1) : "New";

// 	return (
// 		<NavLink to={`/spots/${spot.id}`} className='spot-tile' title={spot.name}>
// 			<img src={spot.previewImage} alt={spot.name} className='spot-thumbnail' />
// 			<div className='spot-info'>
// 				<p>{`${spot.city}, ${spot.state}`}</p>
// 				<p className='spot-rating'>
// 					<i className='fas fa-star'></i> {/* FontAwesome star icon */}
// 					{` Rating: ${displayRating}`}
// 				</p>
// 				<p className='spot-price'>{`$${spot.price} / night`}</p>
// 			</div>
// 		</NavLink>
// 	);
// };
export default SpotTile;
