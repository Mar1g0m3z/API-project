import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import CreateSpot from "../CreateSpot/CreateSpot";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<header>
			<ul className='header-ul'>
				<li>
					<NavLink to='/'>
						<img className='logo' src='/logo-for-project.png' />
					</NavLink>
				</li>
				<li className="name-container">
					<h1 className="app-name"> LevelUp Lodgings </h1>
				</li>
				{sessionUser && (
				<li className="create-spot">
					<CreateSpot />
				</li>
				)}
				{isLoaded && (
					<li className="profile-button-container">
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</header>
	);
}

export default Navigation;
