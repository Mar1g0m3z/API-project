import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import { getReviews } from "../../store/review";
import DeleteReviewModal from "./DeleteReviewModal";

function Reviews({ spot }) {
	const dispatch = useDispatch();
	console.log("this is the spot:", spot);
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
	const reviews = useSelector((state) => {
		// console.log("state in reviews component", state);
		return state.reviews.reviews;
	});
	useEffect(() => {
		dispatch(getReviews(spot.id));
	}, [spot.id, dispatch]);
	// 	const fetchReviews = async () => {
	// 		try {
	// 			const response = await fetch(`/api/spots/${spot.id}/reviews`);
	// 			const data = await response.json();
	// 			if (data) {
	// 				setReviews(
	// 					data.Reviews.map((review) => {
	// 						return { ...review, createdAtDate: new Date(review.createdAt) };
	// 					}).sort((review1, review2) => {
	// 						const firstDate = Date.parse(review1.createdAt);
	// 						const secondDate = Date.parse(review2.createdAt);
	// 						const subtractionTotal = secondDate - firstDate;
	// 						return subtractionTotal;
	// 					})
	// 				);
	// 			}
	// 		} catch (error) {
	// 			console.error("Failed to fetch reviews:", error);
	// 		}
	// 	};
	// 	fetchReviews();
	// }, [spot.id]);

	return (
		<>
			{console.log(reviews)}
			{reviews !== null ? (
				<div className="reviews">
					<h3>Reviews</h3>
					{user &&
					reviews.every((review) => review.userId !== user.id) &&
					user.id !== spot.ownerId ? (
						<OpenModalButton
							buttonText="Write Your Review"
							modalComponent={<CreateReviewModal spot={spot} />}
						/>
					) : null}

					<ul className="review-list">
						{reviews.length === 0 &&
						user !== null &&
						user.id !== spot.ownerId ? (
							<p>be the first to review!</p>
						) : (
							reviews.map((review) => {
								return (
									<>
										<li key={review.id}>
											{`${review.User.firstName}
								${review.User.lastName}:
								 ${review.review}

                                 ${monthNames[review.createdAtDate.getMonth()]}
                                 ${review.createdAtDate.getFullYear()}`}
										</li>
										{user.id === review.userId ? (
											<OpenModalButton
												buttonText="Delete Review"
												modalComponent={
													<DeleteReviewModal reviewId={review.id} />
												}
											/>
										) : null}
									</>
								);
							})
						)}
					</ul>
				</div>
			) : (
				<h1>Reviews not found</h1>
			)}
		</>
	);
}

export default Reviews;
