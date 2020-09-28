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

const AdminTable = ({ setModal, modal, users, setselected }) => {
	return (
		<Paper elevation={1}>
			<Toolbar>
				<span id="tableTitle" component="div" className="geb fs-24">
					Users
				</span>

				<Tooltip title="Add a new Admin" className="ml-auto">
					<IconButton
						className="text-primary"
						onClick={(evt) => {
							setModal({ ...modal, adminNew: true });
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
							Id
						</TableCell>
						<TableCell className="nn fs-18" align="center">
							Name
						</TableCell>
						<TableCell className="nn fs-18" align="center">
							Email
						</TableCell>
						<TableCell className="nn fs-18" align="center">
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((el) => (
						<TableRow hover key={el.id}>
							<TableCell align="center" component="th" scope="row" className="pp-600" style={{ fontSize: 14 }}>
								{el.id}
							</TableCell>
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
										setModal({ ...modal, adminDelete: true });
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

export default AdminTable;
