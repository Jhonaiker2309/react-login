import React, {useContext} from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Navigation = ({ logOutCallback }) => {
    const [user] = useContext(UserContext);
    console.log(user)
    return (
			<ul className="navbar">
				<li>
					<Link to="/">Protected</Link>
				</li>
				{!user.accesstoken && (
					<span>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>{" "}
					</span>
				)}
				{user.accesstoken && (<li>
					<button onClick={logOutCallback}>Log Out</button>
				</li>)}
			</ul>
		);
};

export default Navigation;
