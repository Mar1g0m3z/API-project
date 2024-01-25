import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		navigate("/");
		closeMenu();
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button className="profile-button" onClick={toggleMenu}>
				<i className="fas fa-user-circle fa-2xl" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>Hello, {user.firstName}</li>
						<li>{user.email}</li>
						<li>
							<NavLink to="/spots/current">Manage Spots</NavLink>
						</li>
						<li>
							<button onClick={logout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						<OpenModalMenuItem
							itemText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalMenuItem
							itemText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
