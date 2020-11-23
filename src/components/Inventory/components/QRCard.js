import { ButtonBase } from "@material-ui/core";
import React from "react";

const QRCard = ({ serials, setSelectedQRCard, setAnchorEl, selectedQRCard }) => {
	return serials.map((el, index) => (
		<ButtonBase style={{ outline: "none", margin: "10px 0" }} className="card-ivntry">
			<div
				className="d-flex  card-ivntry shadow-sm cursor-pointer"
				onClick={(e) => {
					setAnchorEl(e.currentTarget);
					setSelectedQRCard({ ...selectedQRCard, hold: el, view: true });
				}}
				key={index}
			>
				<div className="details d-flex flex-column">
			<div className="d-flex  w-100 fira">Serial:<span  style={{ color:"#000",fontWeight:600,marginLeft:6 }}>{el.serial_number}</span></div>
					
					{el.notes && (<div className="d-flex f-row w-100 " style={{ margin: 0 }}>
						<span className="fira mt-3">Note : {el.note}</span>
					</div>)}
					<div className="d-flex f-row mt-auto">
						{el.event_name && (<span className="badge badge-warning mt-auto mr-2 fira">Event: {el.event_name}</span>)}
						{Number(el.is_available) >= 1 && <span className="badge badge-success mt-auto mr-2 fira">Available</span>}
						{Number(el.is_lost) >= 1 && <span className="badge badge-success mt-auto mr-2 fira">Available</span>}
					</div>
					
				</div>
				<div className="qr-area">
					<img src={`${process.env.REACT_APP_QR_PREFIX}${el.qrcode_path}`} alt="qr" />
				</div>
			</div>
		</ButtonBase>
	));
};

export default QRCard;
