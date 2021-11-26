import React, { useState, useContext, useEffect,  } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

import { UserContext } from "../App";

const Login = () => {
	const [user, setUser] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
     let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await (
			await fetch(`${process.env.REACT_APP_BACK_END_URL}/login`, {
				method: "POST",
				credentials: "include", // Needed to include the cookie
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
		).json();
        console.log(result)
		if (result.accesstoken) {
			setUser({
				accesstoken: result.accesstoken,
			});
			navigate("/");;
		} else {
			console.log(result.error);
		}
	};

	useEffect(() => {
		console.log(user);
	}, [user]);




	const handleChange = (e) => {
		if (e.currentTarget.name === "email") {
			setEmail(e.currentTarget.value);
		} else {
			setPassword(e.currentTarget.value);
		}
	};

    if (user.accesstoken) return <Navigate replace to="/" />;
	return (
		<div className="login-wrapper">
			<form onSubmit={handleSubmit}>
				<div>Login</div>

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

					<button type="submit">Login</button>
					<div>
						<Link style={{ color: "blue" }} to="/recover">
							Recover Password
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
