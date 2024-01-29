import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    const sessionLinks = sessionUser ? (
        <div className="profile-menu"> 
            <ProfileButton user={sessionUser} />
            <ul className="profile-dropdown">
                {/* Dropdown items here */}
            </ul>
        </div>
    ) : (
        <>
            <li className="log-in-but">
                <OpenModalButton
                    buttonText='Log In'
                    modalComponent={<LoginFormModal />}
                />
            </li>
            <li className="sign-up-but">
                <OpenModalButton
                    buttonText='Sign Up'
                    modalComponent={<SignupFormModal />}
                />
            </li>
        </>
    );

    return (
        <>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                {isLoaded && <li>{sessionLinks}</li>}
            </ul>
        </>
    );
}

export default Navigation;