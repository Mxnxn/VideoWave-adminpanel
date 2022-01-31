import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../inventoryManagementBackend";
import Modal from "../../Utils/SingleFieldModal";
import DeleteModal from "../../Utils/DeleteModal";
import PopoverOptions from "../../Utils/PopoverOptions";

const TagItems = ({ items, setModal, setExistingItems, title, toOpen }) => {
	const [selected, setSelected] = useState({
		view: false,
		hold: {},
	});
	const [editField, setEditField] = useState("");
	const [modals, setModals] = useState({ edit: false, delete: false });
	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState(false);

	const onCancelHandler = () => {
		setError(false);
		setEditField("");
		setAnchorEl(null);
		setSelected({ open: false, hold: {} });
		setModals({ edit: false, delete: false });
	};

	const onTapEditHandler = async () => {
		try {
			const formData = new FormData();
			formData.set("tag_name", editField);
			const res = await inventoryManagementBackend.updateTag(
				formData,
				selected.hold.id
			);
			console.log(res.code);
			if (res.code === 200) {
				const selectedIndex = items.findIndex(
					(el) => el.id === selected.hold.id
				);
				if (selectedIndex !== -1) {
					let taaag = { ...items[selectedIndex] };
					taaag.tag_name = editField;
					items.splice(selectedIndex, 1);
					items.splice(selectedIndex, 0, taaag);
					setExistingItems((prev) => {
						return { ...prev, [title.toLowerCase()]: items };
					});
					onCancelHandler();
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const onTapDeleteHandler = async () => {
		try {
			await inventoryManagementBackend.deleteTag(selected.hold.id);
			const selectedIndex = items.findIndex((el) => el.id === selected.hold.id);
			if (selectedIndex !== -1) {
				console.log(selectedIndex, items[selectedIndex]);
				items.splice(selectedIndex, 1);
				setExistingItems((prev) => {
					return { ...prev, [title.toLowerCase()]: items };
				});
			}
			onCancelHandler();
		} catch (error) {
			setError(error);
		}
	};

	const classes =
		title === "Types"
			? "col pr-0 pl-4 h-100 bg-white rounded shadow mt-2 pb-2"
			: "col pr-0 pl-4 h-100 bg-white rounded shadow pb-2";

	const openOrigin = {
		vertical: "bottom",
		horizontal: "right",
	};
	const transOrigin = {
		vertical: "top",
		horizontal: "right",
	};

	return (
		<div className={classes}>
			<div className="row p-2 mr-4 border-bottom">
				<div className="col-sm-6 col-lg-6 geb text-uppercase fs-20 ls-1">
					<span className="ls-1">{title}</span>
				</div>
			</div>
			<div
				className=" d-flex pt-3 flex-wrap item-area "
				style={{ overflowX: "auto", height: "90%", alignContent: "start" }}
			>
				{items.map((el, index) => (
					<div
						id={`simple-popover-${el.id}`}
						onClick={(e) => {
							setSelected({ hold: { ...el }, view: true });
							setAnchorEl(e.currentTarget);
							setEditField(el.tag_name);
						}}
						key={el.id}
						style={{ maxWidth: "280px", width: "auto" }}
						className="cursor-pointer d-flex h-60 m-2 b-bgx shadow-1 fira fs-14"
					>
						<span className="m-auto px-4">{el.tag_name}</span>
					</div>
				))}
				<PopoverOptions
					item={selected}
					onCancelHandler={onCancelHandler}
					anchorEl={anchorEl}
					setAnchorEl={setAnchorEl}
					transOrigin={transOrigin}
					openOrigin={openOrigin}
					onEditListener={(e) => {setModals({ ...modals, edit: true });setAnchorEl(null);setSelected({...selected,view:false})}}
					onDeleteListener={(e) => {setModals({ ...modals, delete: true });setAnchorEl(null);setSelected({...selected,view:false})}}
				/>
				<Button
					onClick={(e) => setModal(toOpen)}
					className="h-60 m-2 rounded text-white shadow-1"
					varient="cotained"
					style={{ background: "#04a9f5", outline: "none" }}
				>
					<AddRounded />
				</Button>
				<Modal
					modal={modals.edit}
					setValue={setEditField}
					value={editField}
					error={error}
					submitHandler={onTapEditHandler}
					title="Edit"
					onCancelHandler={onCancelHandler}
				/>
				<DeleteModal
					error={error}
					onCancelHandler={onCancelHandler}
					modal={modals.delete}
					submitHandler={onTapDeleteHandler}
				/>
			</div>
		</div>
	);
};

export default TagItems;
