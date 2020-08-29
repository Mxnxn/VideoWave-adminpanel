import React from "react";

import { Route } from "react-router-dom";
import AuthLayout from "./AuthLayout";
export const ProtectiveRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				if (window.localStorage.getItem("session_token")) {
					return (
						<Component {...rest} uid={window.localStorage.getItem("session_token")} />
					);
				} else {
					return <AuthLayout {...rest}/>;
				}
			}}
		/>
	);
};
