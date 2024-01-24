import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Reviews({ spot }) {
	const user = useSelector((state) => {
		console.log(state);
		return state.session.user;
	});

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(`/api/spots/${spot.id}/reviews`);
				const data = await response.json();
				if (data) {
					setReviews(
						data.Reviews.map((review) => {
							return { ...review, createdAtDate: new Date(review.createdAt) };
						}).sort((review1, review2) => {
							const firstDate = Date.parse(review1.createdAt);
							const secondDate = Date.parse(review2.createdAt);
							const subtractionTotal = secondDate - firstDate;
							return subtractionTotal;
						})
					);
				}
			} catch (error) {
				console.error("Failed to fetch reviews:", error);
			}
		};
		fetchReviews();
	}, [spot.id]);
	console.log(reviews);
	return (
		<>
			<div className='reviews'>
				<h3>Reviews</h3>
				<ul className='review-list'>
					{reviews.length === 0 && user.id !== spot.OwnerId ? (
						<p>be the first to review!</p>
					) : (
						reviews.map((review) => {
							return (
								<li key={review.id}>
									{`${review.User.firstName}
								${review.User.lastName}:
								 ${review.review}

                                 ${monthNames[review.createdAtDate.getMonth()]}
                                 ${review.createdAtDate.getFullYear()}`}
								</li>
							);
						})
					)}
				</ul>
			</div>
		</>
	);
}

export default Reviews;
