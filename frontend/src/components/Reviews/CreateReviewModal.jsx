import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import * as reviewActions from "../../store/review";

function CreateReviewModal({ spot }) {
	const dispatch = useDispatch();
	const [review, setReview] = useState("");
	const [stars, setStars] = useState(0);
	const [errors, setErrors] = useState({});
	const fiveStars = [1, 2, 3, 4, 5];
	const { closeModal } = useModal();
	const buttonEnable = review.length >= 10 && stars > 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		return dispatch(
			reviewActions.createReview({
				review: review,
				stars,
				spotId: spot.id,
			})
		)
			.then(closeModal)
			.catch(async (response) => {
				const data = await response.json();
				console.log(response);
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<>
			<h2>How was your stay?</h2>
			{errors?.review}
			{errors?.stars}
			<form className='submit-review' onSubmit={handleSubmit}>
				<textarea
					value={review}
					placeholder='leave your review here...'
					onChange={(e) => setReview(e.target.value)}
				></textarea>
				{fiveStars.map((num) => (
					<i
						className={num <= stars ? "fas fa-star" : "fa-regular fa-star"}
						key={num}
						onClick={() => {
							setStars(num);
						}}
					></i>
				))}
				{
					<button
						className='submit-review-button'
						type='submit'
						disabled={!buttonEnable}
					>
						Submit Your Review
					</button>
				}
			</form>
		</>
	);
}

export default CreateReviewModal;
