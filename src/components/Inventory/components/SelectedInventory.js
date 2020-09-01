import React, { useState } from "react";
import { EditRounded, DeleteRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../../InventoryManagement/inventoryManagementBackend";
import { IconButton } from "@material-ui/core";
import DeleteModal from "../../Utils/DeleteModal";
import AddItemModal from "../../InventoryManagement/components/AddItemModal";

const SelectedInventory = ({ selected, availableQty, tags }) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const [itemId, setItemId] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const onTapDeleteListener = (id) => {
		setItemId(id);
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
	};

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
						</span>
						<span className="ml-auto" style={{ marginRight: "5%" }}>
							Available Quantity: {availableQty}
						</span>
					</div>
					<div className="d-flex flex-wrap w-100 ">
						{selected.serials.map((el, index) => (
							<div className="d-flex  card-ivntry shadow-sm" key={index}>
								<div className="details d-flex flex-column">
									<div className="d-flex  w-100 fira">
										Serial : {el.serial_number}
									</div>
									<div className="d-flex f-row w-100 " style={{ margin: 0 }}>
										<span className="fira mt-3">Name : {selected.name}</span>
									</div>
									{Number(el.is_available) === 1 ? (
										<span className="badge badge-success mt-auto mr-auto fira">
											Available
										</span>
									) : (
										<div
											className="d-flex f-row w-100 mt-auto "
											style={{ margin: 0 }}
										>
											<span className="badge badge-warning  mr-1">Engaged</span>
											<span className="badge badge-warning  mr-auto">
												event: will be displayed
											</span>
										</div>
									)}
								</div>
								<div className="qr-area">
									<img
										src={`${process.env.REACT_APP_QR_PREFIX}${el.qrcode_path}`}
										alt="qr"
									/>
								</div>
							</div>
						))}
						<div className="del-fab">
							<IconButton
								style={{ color: "white" }}
								className="bg-danger shadow-2"
								onClick={(e) => onTapDeleteListener(selected.id)}
							>
								<DeleteRounded />
							</IconButton>
						</div>
						<DeleteModal
							modal={deleteModal}
							onCancelHandler={onCancelHandler}
							submitHandler={onSubmitDeleteHandler}
						/>
					</div>
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
