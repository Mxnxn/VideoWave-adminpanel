import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "../Authentication/ProtectiveRoute";
import DashboardLayout from "../Dashboard/Layout";
import InventoryLayout from "../Inventory/Layout";
import InventoryManagement from "../InventoryManagement/Layout";
import PanelManagement from "../PanelManagement/Layout";

import AdminLayout from "../AdminLayout/Layout";
import EventHistoryLayout from "../EventHistory/Layout";

const App = (props) => {
	return (
		<BrowserRouter>
			<ProtectiveRoute path="/" component={DashboardLayout} />
			{!window.localStorage.getItem("wh") && <ProtectiveRoute path="/inventory" component={InventoryLayout} />}
			{!window.localStorage.getItem("wh") && (
				<ProtectiveRoute path="/manage/inventory" component={InventoryManagement} />
			)}
			{!window.localStorage.getItem("wh") && (
				<ProtectiveRoute path="/manage/panels" component={PanelManagement} />
			)}
			{!window.localStorage.getItem("wh") && <ProtectiveRoute path="/event/history" component={EventHistoryLayout} />}
			{(window.localStorage.getItem("su") || window.localStorage.getItem("nu")) && <ProtectiveRoute path="/users" component={AdminLayout} />}
		</BrowserRouter>
	);
};

export default App;
