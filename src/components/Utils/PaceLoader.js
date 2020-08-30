import React from "react";

const PaceLoader = ({ progress, view }) => {
	return (
		<div
			className="pace-loader"
			style={{
				width: progress > 0 ? `${progress}vw` : "0vw",
				display: !view ? "none" : "block",
			}}
		></div>
	);
};

export default PaceLoader;
