import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";


const ChangePassword = () => {
	
	const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const {token, id} = useParams();


    let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();

		

		if (password.length > 0 && password === password2) {
			 await (
				await fetch(`${process.env.REACT_APP_BACK_END_URL}/recover`, {
					method: "PUT",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						password: password,
						id,
						token,
					}),
				})
			).json();

			navigate("/login");
		} else {
			console.log("Passwords are not the same");
		}
	};

	const handleChange = (e) => {
		if (e.currentTarget.name === "password") {
			setPassword(e.currentTarget.value);
		} else {
			setPassword2(e.currentTarget.value);
		}
	};
    

	return (
		<div className="login-wrapper">
			<form onSubmit={handleSubmit}>
				<div>New password</div>
				<div className="login-input">
					<input
						value={password2}
						onChange={handleChange}
						type="password"
						name="password2"
						autoComplete="current-password"
						placeholder="Password"
					/>
					<input
						value={password}
						onChange={handleChange}
						type="password"
						name="password"
						autoComplete="current-password"
						placeholder="Confirm password"
					/>
					<button type="submit">Reset</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
