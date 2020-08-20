import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./assets/scss/style.scss";
require("dotenv").config();
ReactDOM.render(<App />, document.getElementById("app"));
