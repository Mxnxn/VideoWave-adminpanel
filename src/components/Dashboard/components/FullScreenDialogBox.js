import React from "react";
import {
	Dialog,
	AppBar,
	Toolbar,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	Typography,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

const FullScreenDialogBox = ({ open, setOpen }) => {
	return (
		<div>
			<Dialog fullScreen open={open}>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="close"
							onClick={(e) => setOpen(false)}
						>
							<CloseRounded />
						</IconButton>
						<Typography variant="h6">Sound</Typography>
						<Button autoFocus color="inherit">
							save
						</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem button>
						<ListItemText primary="Phone ringtone" secondary="Titania" />
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText
							primary="Default notification ringtone"
							secondary="Tethys"
						/>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default FullScreenDialogBox;
