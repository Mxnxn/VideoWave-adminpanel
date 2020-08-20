import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import DialogBox from "./DialogBox";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { dashboardBackend } from "../dashboard_backend";

let ReactCalendar = (props) => {
	const [eventObj, setEvents] = useState([{}]);
	const [loading, setLoading] = useState(false);
	const localizer = momentLocalizer(moment);
	const DragAndDropCalendar = withDragAndDrop(Calendar);

	const eventStyleGetter = (event, start, end, isSelected) => {
		const bg = event.priority ? event.priority : "04a9f5";
		var backgroundColor = "#" + bg;
		var style = {
			backgroundColor: backgroundColor,
			height: "25px",
			marginTop: "3px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		};
		return {
			style: style,
		};
	};

	async function getAsyncAllEvents() {
		try {
			const res = await dashboardBackend.getAllEvents(
				window.localStorage.getItem("session_token")
			);
			if (res) {
				setEvents(res);
				setLoading(true);
			}
		} catch (err) {
			window.localStorage.removeItem("session_token");
			window.localStorage.removeItem("id");
			window.location.reload();
		}
	}

	const [itemsArr, setItemsArr] = useState([]);
	const [subItemsArr, setSubItemsArr] = useState([]);

	async function getAsyncAllItems() {
		try {
			const res = await dashboardBackend.getAllItems(
				window.localStorage.getItem("session_token")
			);
			if (res) {
				setItemsArr(res.data);
				const temp = [];
				for (let i = 0; i < res.data.length; i++) {
					res.data[i].serials.forEach((el) => {
						temp.push(el);
					});
				}
				setSubItemsArr(temp);
			}
		} catch (err) {
			// window.localStorage.removeItem("session_token");
			// window.localStorage.removeItem("id");
			// window.location.reload();
			console.log(err);
		}
	}

	//! items and event fetch
	useEffect(() => {
		getAsyncAllEvents();
		getAsyncAllItems();
	}, []);

	const [startDate, setStart] = useState(null);
	const [endDate, setEnd] = useState(null);

	const handleSelect = ({ start, end }) => {
		setStart(start);
		const end_date = moment(end).add(1, "minute").toDate();
		setEnd(end_date);
		setModal(true);
	};

	const moveEvent = ({ event, start, end }) => {
		const events = eventObj;
		const formData = new FormData();

		formData.set(
			"start_date",
			moment(start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
		);
		formData.set(
			"end_date",
			moment(end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
		);
		dashboardBackend
			.editEvent(
				event.id,
				formData,
				window.localStorage.getItem("session_token")
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		const nextEvents = events.map((existingEvent) => {
			return existingEvent.id === event.id
				? { ...existingEvent, start_date: start, end_date: end }
				: existingEvent;
		});
		setEvents(nextEvents);
	};

	const resizeEvent = ({ event, start, end }) => {
		const events = eventObj;
		const formData = new FormData();

		formData.set(
			"start_date",
			moment(start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
		);
		formData.set(
			"end_date",
			moment(end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
		);
		dashboardBackend
			.editEvent(
				event.id,
				formData,
				window.localStorage.getItem("session_token")
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		const nextEvents = events.map((existingEvent) => {
			return existingEvent.id === event.id
				? { ...existingEvent, start_date: start, end_date: end }
				: existingEvent;
		});
		setEvents(nextEvents);
	};

	const TextFieldComponent = (props) => {
		return <TextField {...props} disabled={true} />;
	};

	const [selectedDate] = React.useState(new Date());

	const getCustomeToolbar = (toolbar) => {
		const handleCTDate = (date) => {
			toolbar.date.setMonth(date.getMonth());
			toolbar.date.setYear(date.getFullYear());
			toolbar.onNavigate("custom");
		};

		const setToday = () => {
			const now = new Date();
			toolbar.date.setMonth(now.getMonth());
			toolbar.date.setYear(now.getFullYear());
			toolbar.onNavigate("current");
		};

		const setPrev = () => {
			toolbar.date.setMonth(toolbar.date.getMonth() - 1);
			toolbar.onNavigate("prev");
		};

		const setNext = () => {
			toolbar.date.setMonth(toolbar.date.getMonth() + 1);
			toolbar.onNavigate("next");
		};

		return (
			<div className="d-flex flex-row">
				<div className="col-xl-7 mt-2 mb-4">
					<div className="d-flex">
						<Button
							onClick={setPrev}
							className={"shadow-sm border btn-mui text-white"}
							style={{
								outline: "none",
							}}
						>
							<ChevronLeftRounded style={{ fontSize: "32px" }} />
						</Button>
						<Button
							onClick={setNext}
							className={"shadow-sm border btn-mui text-white"}
							style={{
								outline: "none",
							}}
						>
							<ChevronRightRounded style={{ fontSize: "32px" }} />
						</Button>

						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								className="ml-3"
								disableToolbar
								allowKeyboardControl={false}
								style={{ outline: "none", width: "150px" }}
								value={selectedDate}
								format="MMM yyyy"
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
								label="Select Date"
								InputAdornmentProps={{ position: "end" }}
								onChange={handleCTDate}
								TextFieldComponent={TextFieldComponent}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
				<div className="w-100 my-2 mx-2 d-flex justify-content-end">
					<Button
						onClick={setToday}
						className={"shadow-sm border ml-auto bg-primary text-white"}
						style={{
							height: "40px",
							width: "70px",
							outline: "none",
						}}
					>
						Today
					</Button>
				</div>
			</div>
		);
	};

	const [modal, setModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [singleObj, setSingleObj] = useState({});

	const onSlotSelect = (event) => {
		setSingleObj(event);
		setEditModal(true);
	};

	return loading ? (
		<div
			style={{ height: "100vh" }}
			className="border rounded px-2 py-2 bg-white"
		>
			<DragAndDropCalendar
				popup
				selectable
				resizable
				components={{
					toolbar: getCustomeToolbar,
				}}
				eventPropGetter={eventStyleGetter}
				events={eventObj}
				step={60}
				defaultDate={selectedDate}
				onEventDrop={moveEvent}
				onEventResize={resizeEvent}
				showMultiDayTimes
				onSelectEvent={(event) => onSlotSelect(event)}
				onSelectSlot={handleSelect}
				localizer={localizer}
				startAccessor="start_date"
				endAccessor="end_date"
				titleAccessor="name"
			/>
			{modal ? (
				<DialogBox
					open={modal}
					start={startDate}
					end={endDate}
					items={itemsArr}
					subItems={subItemsArr}
					edit={false}
					setModal={setModal}
				/>
			) : null}
			{editModal ? (
				<DialogBox
					open={editModal}
					start={singleObj.start_date}
					end={singleObj.end_date}
					report={singleObj.reporting_date}
					edit={singleObj}
					subItems={subItemsArr}
					items={itemsArr}
					setModal={setEditModal}
				/>
			) : null}
		</div>
	) : null;
};

export default ReactCalendar;
