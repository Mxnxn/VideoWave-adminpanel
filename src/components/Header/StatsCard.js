import React from "react";
import { ArrowUp } from "react-feather";
const StatsCard = (props) => {
	return (
		<div class="card">
			<div class="card-body">
				<h6 class="mb-4">Daily Sales</h6>
				<div class="row d-flex align-items-center">
					<div class="col-9">
						<h3 class="f-w-300 d-flex align-items-center m-b-0">
							<ArrowUp size="30" className="text-c-green" />
							$249.95
						</h3>
					</div>
					<div class="col-3 text-right">
						<p class="m-b-0">50%</p>
					</div>
				</div>
				<div class="progress m-t-30" style={{ height: "7px" }}>
					<div
						class="progress-bar progress-c-theme"
						role="progressbar"
						aria-valuenow="50"
						aria-valuemin="0"
						aria-valuemax="100"
						style={{ width: "50%" }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
