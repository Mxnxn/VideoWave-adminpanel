import React from "react";
import { CloseRounded, SearchRounded, CancelRounded } from "@material-ui/icons";
import {
	IconButton,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F4F7FA",
		},
		secondary: {
			main: "#F4F7FA",
		},
	},
});

const icnBtn = createMuiTheme({
	palette: {
		primary: {
			main: "#F4F7FA",
		},
	},
});
const InventorySidebarHeading = ({
	setSearch,
	search,
	onSearch,
	cancelSearch,
}) => {
	return (
		<>
			<li className="font-weight-bold sidebar-top geb d-flex align-items-center pr-0">
				Inventory{" "}
				<ThemeProvider theme={icnBtn}>
					<IconButton
						className="ml-auto"
						color="inherit"
						onClick={(e) => setSearch({ ...search, view: !search.view })}
					>
						{search.view ? <CloseRounded /> : <SearchRounded />}
					</IconButton>
				</ThemeProvider>
			</li>
			{search.view ? (
				<li className="search-inv">
					<ThemeProvider theme={theme}>
						<FormControl
							variant="outlined"
							className="mt-3 mb-3 "
							color="secondary"
							fullWidth
						>
							<InputLabel htmlFor="outlined-adornment-password">
								Search
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								value={search.query}
								onChange={onSearch}
								autoFocus
								placeholder="JBL Mic"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											edge="end"
											color="inherit"
											onClick={cancelSearch}
											style={{ outline: "none" }}
										>
											<CancelRounded />
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
					</ThemeProvider>
				</li>
			) : null}
		</>
	);
};

export default InventorySidebarHeading;
