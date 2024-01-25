import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spots";
import "./CreateSpotForm.css";

function CreateSpotForm({ title, spot = null }) {
	const navigate = useNavigate();
	const validateImgURL = function (imageUrl) {
		if (
			imageUrl.slice(-3) !== "png" &&
			imageUrl.slice(-4) !== "jpeg" &&
			imageUrl.slice(-3) !== "jpg"
		) {
			return "Image URL must end in .png, .jpeg, .jpg";
		}
	};
	console.log("UPDATE SPOT======", spot);
	const dispatch = useDispatch();
	const [country, setCountry] = useState(spot === null ? "" : spot.country);
	const [address, setAddress] = useState(spot === null ? "" : spot.address);
	const [city, setCity] = useState(spot === null ? "" : spot.city);
	const [state, setState] = useState(spot === null ? "" : spot.state);
	const [lat, setLat] = useState(spot === null ? "" : spot.lat);
	const [lng, setLng] = useState(spot === null ? "" : spot.lng);
	const [description, setDescription] = useState(
		spot === null ? "" : spot.description
	);
	const [name, setName] = useState(spot === null ? "" : spot.name);
	const [price, setPrice] = useState(spot === null ? "" : spot.price);
	// console.log("THIS IS UPDATE SPOT NAME, spot.name);
	const [previewImage, setPreviewImage] = useState(
		spot === null ? "" : spot.previewImage
	);
	const [image2, setImage2] = useState("");
	const [image3, setImage3] = useState("");
	const [image4, setImage4] = useState("");
	const [image5, setImage5] = useState("");
	const [errors, setErrors] = useState({});
	// const sessionUser = useSelector((state) => {
	// 	return state.session.user;
	// });
	// const ownerId = sessionUser ? sessionUser.id : null;
	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {
			country: country === "" ? "country is required" : undefined,
			address: address === "" ? "address is required" : undefined,
			city: city === "" ? "city is required" : undefined,
			state: state === "" ? "state is required" : undefined,
			latitude: lat === "" ? "latitude is required" : undefined,
			lng: lng === "" ? "lng is required" : undefined,
			name: name === "" ? "Name is required" : undefined,
			price: price <= 0 || price === "" ? "Price is required" : undefined,
			previewImage:
				spot === null
					? previewImage === ""
						? "Preview image is required"
						: validateImgURL(previewImage)
					: undefined,
			description:
				description.length < 30
					? "Description needs a minimum of 30 characters"
					: undefined,
			image2: image2 === "" ? undefined : validateImgURL(image2),
			image3: image3 === "" ? undefined : validateImgURL(image3),
			image4: image4 === "" ? undefined : validateImgURL(image4),
			image5: image5 === "" ? undefined : validateImgURL(image5),
		};

		setErrors(newErrors);
		if (Object.values(newErrors).every((value) => value === undefined)) {
			return spot === null
				? dispatch(
						spotActions.createSpot({
							country,
							address,
							city,
							state,
							lat,
							lng,
							description,
							name,
							price,
							previewImage,
							image2,
							image3,
							image4,
							image5,
						})).then((spot) => {
						navigate(`/spots/${spot.id}`);})
				: dispatch(
						spotActions.updateSpot({
							id: spot.id,
							country,
							address,
							city,
							state,
							lat,
							lng,
							description,
							name,
							price,
							previewImage,
						})).then((spot) => {
						console.log("THIS IS UPDATE SPOT ================", spot);
						navigate(`/spots/${spot.id}`); });
		}
	};

	return (
		<form className="create-spot-form" onSubmit={handleSubmit}>
			<h2>{title} </h2>
			<h3> Where&apos;s your place located?</h3>
			<p>
				Guests will only get your exact location once they booked a reservation
			</p>
			<div className="create-form">
				<label htmlFor="name">Country </label>
				<input
					type="text"
					value={country}
					name="country"
					placeholder="Country"
					onChange={(e) => setCountry(e.target.value)}
				></input>
				{errors.country && <p className="error-messages">{errors.country}</p>}
			</div>
			<div className="create-form">
				<label htmlFor="name">Street Address </label>
				<input
					type="text"
					value={address}
					name="address"
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
				></input>
				{errors.address && <p className="error-messages">{errors.address}</p>}
			</div>
			<div className="create-form">
				<label htmlFor="name">City </label>
				<input
					type="text"
					value={city}
					name="city"
					placeholder="City"
					onChange={(e) => setCity(e.target.value)}
				></input>
				{errors.city && <p className="error-messages">{errors.city}</p>}
			</div>
			<div className="create-form">
				<label htmlFor="name">State </label>
				<input
					type="text"
					value={state}
					name="state"
					placeholder="STATE"
					onChange={(e) => setState(e.target.value)}
				></input>
				{errors.state && <p className="error-messages">{errors.state}</p>}
			</div>
			<div className="create-form">
				<label htmlFor="name">lat </label>
				<input
					type="text"
					value={lat}
					name="lat"
					placeholder="lat"
					onChange={(e) => setLat(e.target.value)}
				></input>
				{errors.lat && <p className="error-messages">{errors.lat}</p>}
			</div>
			<div className="create-form">
				<label htmlFor="name">lng </label>
				<input
					type="text"
					value={lng}
					name="lng"
					placeholder="lng"
					onChange={(e) => setLng(e.target.value)}
				></input>
				{errors.lng && <p className="error-messages">{errors.lng}</p>}
			</div>
			<h3>Describe your place to your guests</h3>
			<p>
				Mention the best features of your space, any special amenities like fast
				wifi or parking, and what you love about the neighborhood
			</p>
			<div className="description">
				<textarea
					value={description}
					placeholder="Please write at least 30 characters"
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				{errors.description && (
					<p className="error-messages">{errors.description}</p>
				)}
			</div>
			<h3>Create a title for your spot</h3>
			<p>
				Catch guests&apos; attention with a spot title that highlights what
				makes your place special
			</p>
			<div className="spot-name">
				<input
					type="text"
					value={name}
					name="spot-name"
					placeholder="Name your spot"
					onChange={(e) => setName(e.target.value)}
				></input>
				{errors.name && <p className="error-messages">{errors.name}</p>}
			</div>
			<h3> Set a base price for your spot</h3>
			<p>
				competitive pricing can help your listing stand out and rank higher in
				search results
			</p>
			<div className="price">
				$
				<input
					type="number"
					value={price}
					name="spot-price"
					placeholder="Price per night(USD)"
					onChange={(e) => setPrice(e.target.value)}
				></input>
				{errors.price && <p className="error-messages">{errors.price}</p>}
			</div>
			<h3>Liven up your spot with photos</h3>
			<p>Submit a link at least one photo to publish your spot</p>
			{spot === null ? (
				<div className="spot-photos">
					<div className="photos">
						<input
							type="url"
							value={previewImage}
							name="spot-image-1"
							placeholder="Preview Image URL"
							onChange={(e) => setPreviewImage(e.target.value)}
						></input>
						{errors.previewImage && (
							<p className="error-messages">{errors.previewImage}</p>
						)}
					</div>
					<div className="photos">
						<input
							type="url"
							name="spot-image-2"
							placeholder="Image URL"
							onChange={(e) => setImage2(e.target.value)}
						></input>
						{errors.image2 && <p className="error-messages">{errors.image2}</p>}
					</div>
					<div className="photos">
						<input
							type="url"
							name="spot-image-3"
							placeholder="Image URL"
							onChange={(e) => setImage3(e.target.value)}
						></input>
						{errors.image3 && <p className="error-messages">{errors.image3}</p>}
					</div>
					<div className="photos">
						<input
							type="url"
							name="spot-image-4"
							placeholder="Image URL"
							onChange={(e) => setImage4(e.target.value)}
						></input>
						{errors.image4 && <p className="error-messages">{errors.image4}</p>}
					</div>
					<div className="photos">
						<input
							type="url"
							name="spot-image-5"
							placeholder="Image URL"
							onChange={(e) => setImage5(e.target.value)}
						></input>
						{errors.image5 && <p className="error-messages">{errors.image5}</p>}
					</div>
				</div>
			) : null}
			{spot === null ? (
				<button>Create Spot</button>
			) : (
				<button>Update Your Spot</button>
			)}
		</form>
	);
}

export default CreateSpotForm;
