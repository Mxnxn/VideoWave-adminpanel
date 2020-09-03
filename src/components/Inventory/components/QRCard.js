import React from "react";

const QRCard = ({
	serials,
	setSelectedQRCard,
	setAnchorEl,
	selectedQRCard,
}) => {
	return serials.map((el, index) => (
		<div
			className="d-flex  card-ivntry shadow-sm cursor-pointer"
			onClick={(e) => {
				setAnchorEl(e.currentTarget);
				setSelectedQRCard({ ...selectedQRCard, hold: el, view: true });
			}}
			key={index}
		>
			<div className="details d-flex flex-column">
				<div className="d-flex  w-100 fira">Serial : {el.serial_number}</div>
				<div className="d-flex f-row w-100 " style={{ margin: 0 }}>
					{/* <span className="fira mt-3">Name : {selected.name}</span> */}
				</div>
				{Number(el.is_available) === 1 ? (
					<span className="badge badge-success mt-auto mr-auto fira">
						Available
					</span>
				) : (
					<div className="d-flex f-row w-100 mt-auto " style={{ margin: 0 }}>
						{/* <span className="badge badge-warning  mr-1">
							event: will be displayed
						</span> */}
						{el.is_lost ? (
							<span className="badge badge-danger  mr-auto">Lost</span>
						) : (
							<span className="badge badge-warning  mr-1">Engaged</span>
						)}
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
	));
};

export default QRCard;
