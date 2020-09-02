import React from "react";
import { IconButton } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
const DeleteFAB = ({ onTapDeleteListener }) => {
      return (
            <div className="del-fab">
                  <IconButton style={{ color: "white" }} className="bg-danger shadow-2" onClick={onTapDeleteListener}>
                        <DeleteRounded />
                  </IconButton>
            </div>
      );
};

export default DeleteFAB;
