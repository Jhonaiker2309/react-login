import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {isEmail} from "validator";
import Cookies from "js-cookie";
import { UserContext } from "../App";

const ChangePassword = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
    const [setUser] = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		    if(isEmail(email)){
			    const result = await (
						 fetch(`${process.env.REACT_APP_BACK_END_URL}/reset`, {
							method: "POST",
							credentials: "include",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email: email,
							}),
						})
					).then(result => result).catch(e => console.log(e))
            console.log(result)
			navigate("/login");	
            }    
	};

	const handleChange = (e) => {
		if (e.currentTarget.name === "email") {
			setEmail(e.currentTarget.value);
		} 
	};

        useEffect(() => {
					const accesstoken = Cookies.get("refreshtoken");
                     console.log(accesstoken);
					if (accesstoken) {
						setUser({ accesstoken });
						return <Navigate replace to="/" />;
					}
				}, [setUser]);

	return (
		<div className="login-wrapper">
			<form onSubmit={handleSubmit}>
				<div>Write your email</div>
				<div className="login-input">
					<input
						value={email}
						onChange={handleChange}
						type="text"
						name="email"
						placeholder="email"
					/>
					<button type="submit">Reset</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
