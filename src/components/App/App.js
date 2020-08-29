import React,{useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "../Authentication/ProtectiveRoute";
import PaceLoader from "../Utils/PaceLoader";
import DashboardLayout from "../Dashboard/Layout";
import InventoryLayout from "../Inventory/Layout";
import InventoryManagement from "../InventoryManagement/Layout";

const App = (props) => {

	const [progress, setProgress] = useState(0);

	return (
		<BrowserRouter >
				<PaceLoader progress={progress}/>
				<ProtectiveRoute path="/" setProgress={setProgress} component={DashboardLayout} />
				<ProtectiveRoute path="/inventory" setProgress={setProgress} component={InventoryLayout} />
				<ProtectiveRoute path="/manage/inventory" setProgress={setProgress} component={InventoryManagement} />
		</BrowserRouter>
	);
};

export default App;
