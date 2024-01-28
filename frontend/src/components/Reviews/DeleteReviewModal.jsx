import { useModal } from "../../context/Modal";
import { deleteUserReview } from "../../store/review";
import { useDispatch } from "react-redux";
import "./Reviews.css"
function DeleteReviewModal({ reviewId,spotId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const handleSubmit = (e) => {
		e.preventDefault();
		return dispatch(deleteUserReview(reviewId,spotId)).then(closeModal);
	};
	return (
		<>
			<div className="delete-review-modal">
				<h3>Confirm Delete</h3>
				<p> Are you sure you want to delete this review?</p>
				<button className="yes-delete" onClick={handleSubmit}>
					Yes(Delete Review)
				</button>
				<button
					onClick={() => {
						closeModal();
					}}
				>
					No (Keep Review)
				</button>
			</div>
		</>
	);
}

export default DeleteReviewModal;
