import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../Header/CommonHeader";
import Navbar from "../Navbar/Navbar";
import PaceLoader from "../Utils/PaceLoader";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Toolbar,
	Paper,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import moment from "moment";
import Dialog from "./components/Dialog";
import { dashboardBackend } from "../Dashboard/dashboard_backend";
const Layout = (props) => {
	const [progress, setProgress] = useState({
		count: 0,
		view: false,
	});

	const [endedEvents, setEndedEvents] = useState([]);
	const [selectEvent, setSelectEvent] = useState({});

	const getEndedEvents = useCallback(async () => {
		try {
			setProgress({ count: 50, view: true });
			const res = await dashboardBackend.getEndedEvents();
			setEndedEvents([...res.data]);
			setProgress({ count: 100, view: false });
			setTimeout(() => {
				setProgress({ count: 0, view: false });
			}, 200);
		} catch (error) {
			setProgress({ count: 100, view: false });
			setTimeout(() => {
				setProgress({ count: 0, view: false });
			}, 200);
		}
	}, []);

	useEffect(() => {
		getEndedEvents();
	}, [getEndedEvents]);

	const getDate = (arg) => {
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		const date = new Date(moment(arg));
		let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${dd} ${month} ${year}`;
	};

	const [modal, setModal] = useState(false);

	return (
		<>
			<PaceLoader progress={progress.count} view={progress.view} />
			<div className="fullscreen">
				<Navbar />
				<CommonHeader heading={"History"} />
				<div className="pcoded-main-container">
					<div className="pcoded-wrapper ">
						<div className="pcoded-content pt-0">
							<div className="pcoded-inner-content">
								<div className="main-body">
									<div className="row">
										<div className="col-xl-12 col-sm-12 py-4">
											{modal ? (
												<Dialog
													event={selectEvent}
													modal={modal}
													onCancelHandler={() => {
														setModal(false);
														setSelectEvent({});
													}}
												/>
											) : null}
											<Paper variant="outlined" className="shadow">
												<Toolbar>
													<span id="tableTitle" component="div" className="geb fs-24">
														Events
													</span>
												</Toolbar>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell className="nn fs-18" align="center">
																In
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Event name
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Location
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Client name
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Client email
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Tech. name
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Tech. phone
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																Start Date
															</TableCell>
															<TableCell className="nn fs-18" align="center">
																End Date
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{endedEvents.map((el) => (
															<TableRow
																hover
																key={el.invoice_number}
																onClick={(e) => {
																	setSelectEvent(el);
																	setModal(true);
																}}
															>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.invoice_number}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.name}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.location}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.client_company}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.client_email}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.technician_name}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{el.technician_phone}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{getDate(el.start_date)}
																</TableCell>
																<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
																	{getDate(el.end_date)}
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</Paper>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
