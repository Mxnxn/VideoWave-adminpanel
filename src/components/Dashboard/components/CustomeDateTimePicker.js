import React from "react";
import { TextField } from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomeDateTimePicker = ({ value, setValue, classes, label }) => {
	const TextFieldComponent = (props) => {
		return <TextField {...props} disabled={true} />;
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDateTimePicker
				fullWidth
				className={classes}
				inputVariant="outlined"
				format="dd/MM/yyyy, HH:mm a"
				KeyboardButtonProps={{
					"aria-label": "change date",
				}}
				label={label}
				InputAdornmentProps={{ position: "end" }}
				value={value}
				onChange={setValue}
				TextFieldComponent={TextFieldComponent}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default CustomeDateTimePicker;
