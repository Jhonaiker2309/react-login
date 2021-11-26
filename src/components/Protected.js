import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Protected = () => {
	// Could have something here to check for the time when the accesstoken expires
	// and then call the refresh_token endpoint to get a new accesstoken automatically
	const [user] = useContext(UserContext);
	const [content, setContent] = useState("You need to login");

   

	useEffect(() => {
		async function fetchProtected() {
			const result = await (
				await fetch(`${process.env.REACT_APP_BACK_END_URL}/protected`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.accesstoken}`,
					},
				})
			).json();

			if (result.data) setContent(result.data);
		}
		fetchProtected();
	}, [user.accesstoken]);

    	useEffect(() => {
				async function fetchProtected() {
					const result = await (
						await fetch(`${process.env.REACT_APP_BACK_END_URL}/protected`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								authorization: `Bearer ${user.accesstoken}`,
							},
						})
					).json();
					console.log(result);
					if (result.data) setContent(result.data);
				}
				fetchProtected();
			}, [user]);

     if (!user.accesstoken) return <Navigate replace to="/login" />;
	return <div>{content}</div>;
};

export default Protected;
