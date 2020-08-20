import React, { useState } from "react";
import Constants from "../../../Constants/Constants";
import { authBackend } from "../auth_backend";
import { AlertOctagon, CheckCircle } from "react-feather";
const Register = ({ setView }) => {
	const [form, setForm] = useState({
		email: "",
		name: "",
		phone: "",
		address: "",
		password: "",
		cPassword: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const onRegisterHandler = () => {
		setSuccess("");
		setError("");
		if (!form.name) return setError("Name can't be empty.");
		if (!form.email.includes("@")) return setError("Email is invalid.");
		if (!form.email) return setError("Email can't be empty.");
		if (!form.address) return setError("Address can't be empty.");
		if (!form.phone) return setError("Phone can't be empty.");
		if (!form.password) return setError("Password can't be empty");
		if (form.password.length < 8) return setError("Min. 8 character Password");
		if (form.cPassword.length < 8) return setError("Please confirm Password");
		if (form.password !== form.cPassword)
			return setError("Password do not match");

		const formDate = new FormData();
		formDate.set("email", form.email);
		formDate.set("name", form.name);
		formDate.set("phone", form.phone);
		formDate.set("address", form.address);
		formDate.set("password", form.password);
		formDate.set("password_confirmation", form.cPassword);

		authBackend
			.registerWithEmailAndPassword(formDate)
			.then((res) => {
				if (res) setSuccess("Successfully Register");
			})
			.catch((err) => {
				setError("Something went wrong");
			});
	};

	const inputChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
	};

	return (
		<div class="card">
			<div class="card-body text-center">
				<div class="mb-4">
					<i class="feather icon-user-plus auth-icon"></i>
				</div>
				<h3 class="mb-4">Register</h3>
				{error ? (
					<div className="alert alert-danger text-left">
						<AlertOctagon
							size="18"
							className="mr-3"
							style={{ verticalAlign: "sub" }}
						/>
						{error}
					</div>
				) : null}
				{success ? (
					<div className="alert alert-danger">
						<CheckCircle
							size="18"
							className="mr-3"
							style={{ verticalAlign: "sub" }}
						/>
						{success}
					</div>
				) : null}

				<div class="input-group mb-3">
					<input
						type="text"
						class={
							error.includes("Name")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Name"
						name="name"
						value={form.name}
						onChange={inputChangeHandler}
					/>
				</div>
				<div class="input-group mb-3">
					<input
						type="email"
						class={
							error.includes("Email")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Email"
						name="email"
						value={form.email}
						onChange={inputChangeHandler}
					/>
				</div>
				<div class="input-group mb-3">
					<input
						type="text"
						class={
							error.includes("Address")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="address"
						name="address"
						value={form.address}
						onChange={inputChangeHandler}
					/>
				</div>
				<div class="input-group mb-3">
					<input
						type="text"
						class={
							error.includes("Phone")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Phone Number"
						name="phone"
						value={form.phone}
						onChange={inputChangeHandler}
					/>
				</div>
				<div class="input-group mb-3">
					<input
						type="password"
						class={
							error.includes("Password")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Password"
						name="password"
						value={form.password}
						onChange={inputChangeHandler}
					/>
				</div>
				<div class="input-group mb-4">
					<input
						type="password"
						class={
							error.includes("Password")
								? "form-control is-invalid"
								: "form-control"
						}
						placeholder="Confirm Password"
						name="cPassword"
						value={form.cPassword}
						onChange={inputChangeHandler}
					/>
				</div>
				<button
					class="btn btn-primary shadow-2 mb-4"
					onClick={onRegisterHandler}
				>
					Sign Up
				</button>
				<p class="mb-0 text-muted">
					Already have an account?{" "}
					<p
						className="cursor-pointer"
						onClick={(e) => setView(Constants.LOGIN)}
					>
						Login
					</p>
				</p>
			</div>
		</div>
	);
};

export default Register;
