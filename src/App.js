import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Protected from "./components/Protected";
import ChangePassword from "./components/ChangePassword"
import RecoverPassword from "./components/RecoverPassword"

console.log(process.env.REACT_APP_BACK_END_URL);
export const UserContext = React.createContext([]);

function App() {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
    

	const logOutCallback = async () => {
		await fetch(`${process.env.REACT_APP_BACK_END_URL}/logout`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${user.accesstoken}`,
			},
			// Needed to include the cookie
		});
		// Clear user from context
		setUser({});
		// Navigate back to startpage
		window.href="/login"
	};

	// First thing, check if a refreshtoken exist
	useEffect(() => {
		async function checkRefreshToken() {
			const result = await (
				await fetch(`${process.env.REACT_APP_BACK_END_URL}/refresh_token`, {
					method: "POST",
					credentials: "include", // Needed to include the cookie
					headers: {
						"Content-Type": "application/json",
					},
				})
			).json();
            
			setUser({
				accesstoken: result.accesstoken,
			});
			setLoading(false);
		}
		checkRefreshToken();
	}, []);

	if (loading) return <div>Loading ...</div>;

	return (
		<Router>
			<UserContext.Provider value={[user, setUser]}>
				<div className="app">
                    
					<Navigation logOutCallback={logOutCallback} />
					<Routes>
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/" element={<Protected />} />
						<Route
							exact
							path="/reset/:id/:token"
							element={<ChangePassword />}
						/>
						<Route exact path="/recover" element={<RecoverPassword />}/>
					</Routes>
				</div>
			</UserContext.Provider>
		</Router>
	);
}

export default App;
