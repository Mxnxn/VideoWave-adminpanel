import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "../Authentication/ProtectiveRoute";
const DashboardLayout = React.lazy(() => import("../Dashboard/Layout"));
const InventoryLayout = React.lazy(() => import("../Inventory/Layout"));
const InventoryManagement = React.lazy(() => import("../InventoryManagement/Layout"));;

const App = (props) => {
	return (
		<BrowserRouter >
			<Suspense fallback="">
				<ProtectiveRoute path="/" component={DashboardLayout} />
				<ProtectiveRoute path="/inventory" component={InventoryLayout} />
				<ProtectiveRoute path="/manage/inventory" component={InventoryManagement} />
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
