import React, { useState } from "react";
import Constants from "../../Constants/Constants";
// import Register from "./components/Register";
import Login from "./components/Login";
import WhLogin from "./components/WhLogin";

const AuthLayout = (props) => {
	const [view, setView] = useState(Constants.LOGIN);

	return (
		<div className="auth-wrapper">
			<div className="auth-content">
				<div className="auth-bg">
					<span className="r"></span>
					<span className="r s" onClick={(e) => setView(Constants.ADMIN)}></span>
					<span className="r s"></span>
					<span className="r"></span>
				</div>
				{view === Constants.LOGIN ? <Login setView={setView} /> : null}
				{view === Constants.ADMIN ? <Login admin={true} setView={setView} /> : null}
				{view === Constants.WHLOGIN ? <WhLogin admin={false} setView={setView} /> : null}
			</div>
		</div>
	);
};

export default AuthLayout;
