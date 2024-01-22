import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
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

				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</header>
	);
}

export default Navigation;
