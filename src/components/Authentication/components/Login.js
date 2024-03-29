import React, {  useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "react-feather";
import Constants from "../../../Constants/Constants";
import useKeyPress from "../../Utils/useKeyPress";
import { authBackend } from "../auth_backend";

const Login = ({ setView, admin }) => {
	const [email, setEmail] = useState(admin ? "admin@admin.admin":"abc@xyz.com");
	const [password, setPassword] = useState(admin ? "adminadmin":"cleartext");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const onLoginHandler = () => {
		setSuccess("");
		setError("");
		if (!email || !email.includes("@")) return setError("Email is invalid.");
		if (!password) return setError("Password is invalid");
		if (password.length < 8) return setError("Minimum 8 character");

		const formData = new FormData();
		formData.set("email", email);
		formData.set("password", password);
		authBackend
			.loginWithEmailAndPassword(formData)
			.then((res) => {
				if (res) {
					window.localStorage.setItem("session_token", res.data.session_token);
					window.localStorage.setItem("id", res.data.id);
					window.localStorage.setItem("nu", true);
					setSuccess(res.message);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const onAdminLogin = () => {
		setSuccess("");
		setError("");
		if (!email || !email.includes("@")) return setError("Email is invalid.");
		if (!password) return setError("Password is invalid");
		if (password.length < 8) return setError("Minimum 8 character");

		const formData = new FormData();
		formData.set("email", email);
		formData.set("password", password);
		authBackend
			.adminLoginWithEmailAndPassword(formData)
			.then((res) => {
				if (res) {
					window.localStorage.setItem("session_token", res.data.session_token);
					window.localStorage.setItem("id", res.data.id);
					window.localStorage.setItem("email", res.data.email);
					window.localStorage.setItem("su", true);
					setSuccess(res.message);
					window.location.reload();
				}
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const enterListener = useKeyPress("Enter");

	useEffect(()=>{
		if(enterListener && admin){
			onAdminLogin();
			return;
		}else if(enterListener){
			onLoginHandler();
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[enterListener])
	
	return (
		<div className="card">
			<div className="card-body text-center">
				<div className="mb-4">
					<i className="feather icon-unlock auth-icon"></i>
				</div>
				<h3 className="mb-4 geb ls-1">{admin ? "Administrator" : "Login"}</h3>
				{error ? (
					<div className="alert alert-danger mb-3 rounded text-left text-sm">
						<AlertCircle size="18" className="mr-2" style={{ verticalAlign: "sub" }} />
						{error}
					</div>
				) : null}
				{success ? (
					<div className="alert alert-success mb-3 rounded text-left ">
						<CheckCircle size="18" className="mr-2" style={{ verticalAlign: "sub" }} />
						{success}
					</div>
				) : null}
				<div className="input-group mb-3">
					<input
						type="email"
						className={
							error.includes("Email") || error.includes("Credentials") ? "form-control is-invalid" : "form-control"
						}
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input-group mb-4">
					<input
						type="password"
						className={
							error.includes("Password") || error.includes("Credentials") ? "form-control is-invalid" : "form-control"
						}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={(evt)=>{
							console.log(evt.key)
							if(evt.key === "Enter"){
								if(admin){
									onAdminLogin();
								}else{
									onLoginHandler();
								}
							}
						}}
					/>
				</div>

				{admin ? (
					<button className="btn btn-primary shadow-2 mb-4" onClick={onAdminLogin}>
						Login
					</button>
				) : (
					<button className="btn btn-primary shadow-2 mb-4" onClick={onLoginHandler}>
						Login
					</button>
				)}

				<p className="mb-0 text-muted">
					Warehouse User
					<p className="cursor-pointer text-primary" onClick={(e) => setView(Constants.WHLOGIN)}>
						Login
					</p>
				</p>
			</div>
		</div>
	);
};

export default Login;
