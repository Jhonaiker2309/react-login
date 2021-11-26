import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import validator from "validator";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validator.isEmail(email) || password.length === 0) return;
		const result = await (
			await fetch(`${process.env.REACT_APP_BACK_END_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
		).json();
		if (!result.error) {
			console.log(result);
			navigate("/login");
		} else {
			console.log(result.error);
		}
	};

	const handleChange = (e) => {
		if (e.currentTarget.name === "email") {
			setEmail(e.currentTarget.value);
		} else {
			setPassword(e.currentTarget.value);
		}
	};


    

	return (
		<div className="login-wrapper">
			<form onSubmit={handleSubmit}>
				<div>Register</div>
				<div className="login-input">
					<input
						value={email}
						onChange={handleChange}
						type="text"
						name="email"
						placeholder="Email"
						autoComplete="email"
					/>
					<input
						value={password}
						onChange={handleChange}
						type="password"
						name="password"
						autoComplete="current-password"
						placeholder="Password"
					/>

					<button type="submit">Register</button>
					<div>
						<Link style={{ color: "blue" }} to="/login">
							Already registered?
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
