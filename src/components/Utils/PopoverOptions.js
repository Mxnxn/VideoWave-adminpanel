import React from "react";
import { Popover, ButtonBase } from "@material-ui/core";
import { EditRounded, DeleteRounded } from "@material-ui/icons";


const PopoverOptions = ({
    anchorEl,
    onCancelHandler,
    item,
    onEditListener,
    onDeleteListener,
    openOrigin,
    transOrigin,
}) => {
    return (
    <Popover
        id={`simple-popover-${item.hold.id}`}
        open={item.view}
        anchorEl={anchorEl}
        onClose={onCancelHandler}
        anchorOrigin={openOrigin}
        transformOrigin={transOrigin}
    >
        <div className="d-flex flex-column justify-content-center py-3 ">
            <span className="popover-list-head px-3 geb fs-20">Action</span>
            <ButtonBase
                style={{ outline: "none" }}
                onClick={onEditListener}
            >
                <span className="popover-list-items px-3 fira " >
                    <span>Edit</span>
                    <span className="ml-auto">
                        <EditRounded size="small" className="text-purple" />
                    </span>
                </span>
            </ButtonBase>
            <ButtonBase
                style={{ outline: "none" }}
                onClick={onDeleteListener}
            >
                <span className="popover-list-items px-3 fira ">
                    <span>Delete</span>
                    <span className="ml-auto">
                        <DeleteRounded size="small" className="text-danger" />
                    </span>
                </span>
            </ButtonBase>
        </div>
    </Popover>)
}

export default PopoverOptions;