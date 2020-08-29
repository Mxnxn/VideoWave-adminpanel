import React, { useState } from "react";
import Constants from "../../Constants/Constants";
import Register from "./components/Register";
import Login from "./components/Login";

const AuthLayout = (props) => {
	const [view, setView] = useState(Constants.LOGIN);

	return (
		<div class="auth-wrapper">
			<div class="auth-content">
				<div class="auth-bg">
					<span class="r"></span>
					<span class="r s"></span>
					<span class="r s"></span>
					<span class="r"></span>
				</div>
				{view === "LOGIN" ? <Login setView={setView} /> : null}
				{view === "REGISTER" ? <Register setView={setView} /> : null}
			</div>
		</div>
	);
};

export default AuthLayout;
