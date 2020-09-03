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
	...rest
}) => {
	return error ? (
		<TextField
			id={"title"}
			error
			label={label}
			{...rest}
			className={`mb-16 ${classes}`}
			name={keyName}
			variant="outlined"
			fullWidth
			value={value}
			onChange={(e) => onValueChange(e, keyName, index)}
		/>
	) : (
		<TextField
			id={"title"}
			label={label}
			className={`mb-16 ${classes}`}
			name={keyName}
			{...rest}
			variant="outlined"
			fullWidth
			value={value}
			onChange={(e) => onValueChange(e, keyName, index)}
		/>
	);
};

export default CustomeTextField;
