import React from "react";
import DashboardLayout from "../Dashboard/Layout";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "../Authentication/ProtectiveRoute";
import InventoryLayout from "../Inventory/Layout";
const App = (props) => {
	return (
		<BrowserRouter>
			<ProtectiveRoute path="/" component={DashboardLayout} />

			<ProtectiveRoute path="/inventory" component={InventoryLayout} />
		</BrowserRouter>
	);
};

export default App;
