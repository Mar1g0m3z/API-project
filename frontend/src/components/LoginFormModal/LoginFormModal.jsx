import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const buttonEnable = credential.length >= 4 && password.length >= 6;
	const loginDemoUser = () => {
		setErrors({});
		const demoCredential = "PrincessZelda";
		const demoPassWord = "Triforce123";
		return dispatch(
			sessionActions.login({
				credential: demoCredential,
				password: demoPassWord,
			})
		)
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type='text'
						value={credential}
						placeholder='Username or Email'
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						type='password'
						value={password}
						placeholder='	Password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.message && <p>{errors.message}</p>}
				<button type='submit' disabled={!buttonEnable}>
					Log In
				</button>

				<button
					className='demo-user'
					onClick={() => {
						loginDemoUser();
					}}
				>
					Demo-User
				</button>
			</form>
		</>
	);
}

export default LoginFormModal;
