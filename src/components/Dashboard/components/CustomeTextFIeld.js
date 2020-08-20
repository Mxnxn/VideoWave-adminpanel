import React from "react";
import { TextField } from "@material-ui/core";

const CustomeTextField = ({
	error,
	value,
	label,
	index,
	name,
	keyName,
	disable,
	classes,
	onValueChange,
}) => {
	return error ? (
		<TextField
			id={"title"}
			error
			label={label}
			className={`mb-16 ${classes}`}
			InputLabelProps={{
				shrink: true,
			}}
			name={keyName}
			variant="outlined"
			autoFocus
			required
			fullWidth
			value={value}
			onChange={(e) => onValueChange(e, keyName, index)}
		/>
	) : (
		<TextField
			id={"title"}
			label={label}
			className={`mb-16 ${classes}`}
			InputLabelProps={{
				shrink: true,
			}}
			name={keyName}
			variant="outlined"
			autoFocus
			required
			fullWidth
			value={value}
			onChange={(e) => onValueChange(e, keyName, index)}
		/>
	);
};

export default CustomeTextField;
