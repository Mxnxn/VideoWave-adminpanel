import React, { useState } from "react";
import { EditRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../../InventoryManagement/inventoryManagementBackend";
import { IconButton } from "@material-ui/core";
import DeleteModal from "../../Utils/DeleteModal";
import AddItemModal from "../../InventoryManagement/components/AddItemModal";
import QRCard from "./QRCard";
import PopoverOptions from "../../Utils/PopoverOptions";
import DeleteFAB from "../../Utils/DeleteFAB";
import EditSerial from "./EditSerial";
import { PlusCircle } from "react-feather";
import StoreLedModal from "./StoreLedModal";

const SelectedInventory = ({ selected, availableQty, tags, setSelected }) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const [itemId, setItemId] = useState(false);
	const [editModal, setEditModal] = useState(false);

	const [additionalLedModal,setAdditionalLedModal] = useState(false);

	const onTapDeleteListener = () => {
		setItemId(selected.id);
		setDeleteModal(true);
	};

	const onSubmitDeleteHandler = async () => {
		try {
			const res = await inventoryManagementBackend.deleteEntireItem(itemId);
			if (res.code === 200) {
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onCancelHandler = () => {
		setItemId(false);
		setDeleteModal(false);
		setEditModal(false);
		setAnchorEl(null);
		setSelectedQRCard({
			...selectedQRCard,
			edit: false,
			delete: false,
			hold: {},
			view: false,
		});
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedQRCard, setSelectedQRCard] = useState({
		edit: false,
		delete: false,
		hold: {},
		view: false,
	});

	const openOrigin = {
		vertical: "center",
		horizontal: "center",
	};
	const transOrigin = {
		vertical: "top",
		horizontal: "right",
	};

	const onSubmitTagDeleteHandler = async () => {
		try {
			await inventoryManagementBackend.removeSerialData(selectedQRCard.hold.id);
			let data = { ...selected };
			const filteredSerials = data.serials.filter(
				(el) => el.id !== selectedQRCard.hold.id
			);
			data.serials = filteredSerials;
			setSelectedQRCard({
				...selectedQRCard,
				hold: {},
				delete: false,
				view: false,
			});
			setSelected({ ...data });
			setAnchorEl(null);
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	console.log(selectedQRCard);
	// }, [selectedQRCard]);

	return (
		<div className="detail-view">
			{selected ? (
				<div className="d-flex flex-column  h-100 margin-20px ">
					<div className="d-flex geb fs-24 mt-3 mb-3">
						<span className="d-flex align-items-center">
							{selected.name}{" "}
							<IconButton
								className="ml-2"
								onClick={(evt) => setEditModal(true)}
							>
								<EditRounded />
							</IconButton>
							{selected.item_type_code === 2 && (<IconButton
								className="ml-2"
								onClick={(evt) => setAdditionalLedModal(true)}
							>
								<PlusCircle />
							</IconButton>)}
						</span>
						<span className="ml-auto" style={{ marginRight: "5%" }}>
							Available Quantity: {availableQty}
						</span>
					</div>
					<div className="d-flex flex-wrap w-100 ">
						<QRCard
							serials={selected.serials}
							selectedQRCard={selectedQRCard}
							setSelectedQRCard={setSelectedQRCard}
							setAnchorEl={setAnchorEl}
						/>
						<DeleteFAB onTapDeleteListener={onTapDeleteListener} />
						<DeleteModal
							modal={deleteModal}
							flag={"true"}
							onCancelHandler={onCancelHandler}
							submitHandler={onSubmitDeleteHandler}
						/>
						<DeleteModal
							modal={selectedQRCard.delete}
							onCancelHandler={onCancelHandler}
							submitHandler={onSubmitTagDeleteHandler}
						/>
						<StoreLedModal modal={additionalLedModal} itemId={selected.id} setModal={setAdditionalLedModal}/>
					</div>
					<EditSerial
						modal={selectedQRCard.edit}
						preData={selectedQRCard.hold}
						selected={selected}
						setSelected={setSelected}
						setSelectedQRCard={setSelectedQRCard}
						onCancelHandler={onCancelHandler}
					/>
					<PopoverOptions
						item={selectedQRCard}
						setSelectedQRCard={setSelectedQRCard}
						onCancelHandler={onCancelHandler}
						onEditListener={(e) =>
							setSelectedQRCard({ ...selectedQRCard, edit: true })
						}
						onDeleteListener={(e) =>
							setSelectedQRCard({ ...selectedQRCard, delete: true })
						}
						anchorEl={anchorEl}
						setAnchorEl={setAnchorEl}
						transOrigin={transOrigin}
						openOrigin={openOrigin}
					/>
					<AddItemModal
						stuffs={tags}
						modal={editModal}
						state={selected}
						onCancelHandler={onCancelHandler}
						title={"Edit Item"}
					/>
				</div>
			) : (
				<div
					className="d-flex align-items-center justify-content-center h-100 geb text-uppercase ls-1"
					style={{
						flex: 1,
						letterSpacing: "2px",
						fontSize: "14px",
					}}
				>
					Please select item
				</div>
			)}
		</div>
	);
};

export default SelectedInventory;
