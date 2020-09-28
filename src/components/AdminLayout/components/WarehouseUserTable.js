import React from "react";
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
import { DeleteRounded, PersonAddRounded } from "@material-ui/icons";

const WarehouseUserTable = ({ setModal, modal, users, setselected }) => {
	return (
		<Paper>
			<Toolbar>
				<span id="tableTitle" component="div" className="geb fs-24">
					App Users
				</span>
				<Tooltip title="Add a new Admin" className="ml-auto">
					<IconButton
						className="text-primary"
						onClick={(evt) => {
							console.log("clicked");
							setModal({ ...modal, userNew: true });
						}}
					>
						<PersonAddRounded />
					</IconButton>
				</Tooltip>
			</Toolbar>
			{/* <TableContainer component={Paper}> */}
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						{/* <TableCell>
            <Checkbox checked={false} />
        </TableCell> */}
						<TableCell className="nn fs-18" align="center">
							Name
						</TableCell>
						<TableCell className="nn fs-18" align="center">
							Phone
						</TableCell>
						<TableCell className="nn fs-18" align="center">
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((el) => (
						<TableRow hover key={el.id}>
							<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
								{el.name}
							</TableCell>
							<TableCell align="center" className="pp-600" style={{ fontSize: 14 }}>
								{el.email}
							</TableCell>
							<TableCell align="center" className="pp-600 fs-20">
								<IconButton
									size="small"
									onClick={(evt) => {
										setselected(el);
										setModal({ ...modal, userDelete: true });
									}}
								>
									<DeleteRounded />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{/* </TableContainer> */}
		</Paper>
	);
};

export default WarehouseUserTable;
