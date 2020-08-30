import React from "react";
import { AlertCircle } from "react-feather";

const AlertDanger = ({ error }) => {
	return error ? (
		<div className="row mt-3">
			<div className="col-sm-12">
				<div className="alert alert-danger rounded">
					<span className="text-danger ">
						<AlertCircle
							size="18"
							className="text-danger mr-2"
							style={{ verticalAlign: "sub" }}
						/>
						{error}
					</span>
				</div>
			</div>
		</div>
	) : null;
};

export default AlertDanger;
