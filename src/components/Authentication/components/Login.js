import React, { useState } from "react";
import Constants from "../../../Constants/Constants";
import { AlertCircle, CheckCircle } from "react-feather";
import { authBackend } from "../auth_backend";

const Login = ({ setView }) => {
	const [email, setEmail] = useState("abc@xyz.com");
	const [password, setPassword] = useState("cleartext");
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

	return (
		<div class="card">
			<div class="card-body text-center">
				<div class="mb-4">
					<i class="feather icon-unlock auth-icon"></i>
				</div>
				<h3 class="mb-4">Login</h3>
				{error ? (
					<div class="alert alert-danger mb-3 rounded text-left text-sm">
						<AlertCircle
							size="18"
							className="mr-2"
							style={{ verticalAlign: "sub" }}
						/>
						{error}
					</div>
				) : null}
				{success ? (
					<div class="alert alert-success mb-3 rounded text-left ">
						<CheckCircle
							size="18"
							className="mr-2"
							style={{ verticalAlign: "sub" }}
						/>
						{success}
					</div>
				) : null}
				<div class="input-group mb-3">
					<input
						type="email"
						class={
							error.includes("Email") || error.includes("Credentials")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div class="input-group mb-4">
					<input
						type="password"
						class={
							error.includes("Password") || error.includes("Credentials")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button class="btn btn-primary shadow-2 mb-4" onClick={onLoginHandler}>
					Login
				</button>

				<p class="mb-0 text-muted">
					Don’t have an account?{" "}
					<p
						className="cursor-pointer"
						onClick={(e) => setView(Constants.REGISTER)}
					>
						Signup
					</p>
				</p>
			</div>
		</div>
	);
};

export default Login;
