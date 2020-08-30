import React, { useState } from "react";
import { Button, Popover, ButtonBase } from "@material-ui/core";
import { AddRounded, DeleteRounded, EditRounded } from "@material-ui/icons";
import { inventoryManagementBackend } from "../inventoryManagementBackend";
import Modal from "../../Utils/SingleFieldModal";
import DeleteModal from "../../Utils/DeleteModal";

const TagItems = ({ items, setModal, setExistingItems, title,toOpen }) => {
      const [selected, setSelected] = useState({
            open: false,
            object: {},
      });
      const [editField, setEditField] = useState("");
      const [modals, setModals] = useState({ edit: false, delete: false });
      const [anchorEl, setanchorEl] = useState(null);
      const [error, setError] = useState(false);
      const onCancelHandler = () => {
            setError(false);
            setEditField("");
            setanchorEl(null);
            setSelected({ open: false, object: {} });
            setModals({ edit: false, delete: false });
      };

      const onTapEditHandler = async () => {
            try {
                  const res = await inventoryManagementBackend.updateTag(selected.object.id);
            } catch (error) {
                  setError(error.message);
            }
      };

      const onTapDeleteHandler = async () => {
            try {

                  const res = await inventoryManagementBackend.deleteTag(selected.object.id);
                  const selectedIndex = items.findIndex((el) => el.id === selected.object.id);
                  if (selectedIndex !== -1) {
                        console.log(selectedIndex,items[selectedIndex])
                        items.splice(selectedIndex, 1);
                        setExistingItems((prev) => {
                              return { ...prev, [title.toLowerCase()]: items };
                        });
                  }
                  onCancelHandler();
            } catch (error) {
                  setError(error.message);
            }
      };

      return (
            <div className="col pr-0 pl-4 h-100 bg-white rounded shadow">
                  <div className="row p-2 mr-4 border-bottom">
                        <div className="col-sm-6 col-lg-6 geb text-uppercase fs-20 ls-1">
                              <span className="ls-1">{title}</span>
                        </div>
                  </div>
                  <div className=" d-flex pt-3 flex-wrap item-area " style={{ overflowX: "auto", height: "90%", alignContent: "start" }}>
                        {items.map((el, index) => (
                              <div
                                    id={`simple-popover-${el.id}`}
                                    onClick={(e) => {
                                          setSelected({ object: { ...el }, open: true });
                                          setanchorEl(e.currentTarget);
                                          setEditField(el.tag_name);
                                    }}
                                    key={el.id}
                                    style={{ maxWidth: "280px", width: "auto" }}
                                    className="cursor-pointer d-flex h-60 m-2 b-bgx shadow-1 fira fs-14"
                              >
                                    <span className="m-auto px-4">{el.tag_name}</span>
                              </div>
                        ))}
                        <Popover
                              id={`simple-popover-${selected.object.id}`}
                              open={selected.open}
                              anchorEl={anchorEl}
                              onClose={onCancelHandler}
                              anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                              }}
                              transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                              }}
                        >
                              <div className="d-flex flex-column justify-content-center py-3 ">
                                    <span className="popover-list-head px-3 geb fs-20">Action</span>
                                    <ButtonBase style={{ outline: "none" }} onClick={(e) => setModals({ ...modals, edit: true })}>
                                          <span className="popover-list-items px-3 fira ">
                                                <span>Edit</span>
                                                <span className="ml-auto">
                                                      <EditRounded size="small" className="text-purple" />
                                                </span>
                                          </span>
                                    </ButtonBase>
                                    <ButtonBase style={{ outline: "none" }} onClick={(e) => setModals({ ...modals, delete: true })}>
                                          <span className="popover-list-items px-3 fira ">
                                                <span>Delete</span>
                                                <span className="ml-auto">
                                                      <DeleteRounded size="small" className="text-danger" />
                                                </span>
                                          </span>
                                    </ButtonBase>
                              </div>
                        </Popover>
                        <Button
                              onClick={(e) => setModal(toOpen)}
                              className="h-60 m-2 rounded text-white shadow-1"
                              varient="cotained"
                              style={{ background: "#04a9f5", outline: "none" }}
                        >
                              <AddRounded />
                        </Button>
                        <Modal
                              modal={modals.edit}
                              setValue={setEditField}
                              value={editField}
                              error={error}
                              submitHandler={onTapEditHandler}
                              title="Edit"
                              onCancelHandler={onCancelHandler}
                        />
                        <DeleteModal onCancelHandler={onCancelHandler} modal={modals.delete} submitHandler={onTapDeleteHandler} />
                  </div>
            </div>
      );
};

export default TagItems;
