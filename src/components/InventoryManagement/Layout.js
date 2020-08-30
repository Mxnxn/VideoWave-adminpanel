import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "./components/Header";
import TagItems from "./components/TagItems";
import AddModal from "./components/AddModal";
import AddItemModal from "./components/AddItemModal";
import PaceLoader from "../Utils/PaceLoader";
import { inventoryManagementBackend } from "./inventoryManagementBackend";

const InventoryManagement = (props) => {
  const items = [
    "SHARP 2500 LUMENS SR.NO5 WHITE",
    "SEAMLESS SWITCHER",
    "PROCESSOR & CONTROLLER",
    "CAT-6 TRANSMITTER",
    "VENUSX1PRO",
    "4K FIBER CABLE",
  ];

  const initModalsState = {
    addCategory: false,
    addType: false,
    addTag: false,
    addItem: false,
  };

  const initState = {
    category: "",
    class: "",
    type: "",
  };

  const initDelete = {
    category: false,
    item: false,
    type: false,
    class: false,
  };

  const [error, setError] = useState(initDelete);
  const [state, setState] = useState(initState);
  const [existingItems, setExistingItems] = useState({});

  const [loading, setLoading] = useState(false);

  const getTags = useCallback(async () => {
    try {
      const res = await inventoryManagementBackend.getTags();
      console.log([...new Set(res.data.class)][0]);
      setExistingItems({
        classes: [...new Set(res.data.class)],
        categories: [...new Set(res.data.category)],
        types: [...new Set(res.data.type)],
      });
      setLoading(true);
    } catch (error) {
      console.log("ERROR GETTING TAGs :", error);
    }
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const [modals, setModals] = useState(initModalsState);

  const onCancelHandler = () => {
    setModals(initModalsState);
  };

  const modalOpener = (which) => {
    setModals({ ...modals, [which]: true });
  };

  const onSubmitCategory = async () => {
    if (!state.category) {
      return setError({ ...error, category: "Please enter a category name!" });
    }
    try {
      const formData = new FormData();
      formData.set("tag_type", "category");
      formData.set("tag_name", state.category);
      const res = await inventoryManagementBackend.setTag(formData);
      const newCats = [
        ...new Set(existingItems.categories),
        { id: res.data.id, tag_name: res.data.tag_name },
      ];
      setExistingItems({ ...existingItems, categories: newCats });
      setModals({ ...modals, addCategory: false });
    } catch (error) {
      console.log("CLASS :", error);
      setModals({ ...modals, addCategory: false });
    }
  };

  // const onSubmitItems = () => {

  // }

  const onSubmitType = async () => {
    if (!state.type) {
      return setError({ ...error, type: "Please enter a type name!" });
    }
    try {
      const formData = new FormData();
      formData.set("tag_type", "type");
      formData.set("tag_name", state.type);
      const res = await inventoryManagementBackend.setTag(formData);
      const newTypes = [
        ...new Set(existingItems.types),
        { id: res.data.id, tag_name: res.data.tag_name },
      ];
      setExistingItems({ ...existingItems, types: newTypes });
      setModals({ ...modals, addType: false });
    } catch (error) {
      console.log("CLASS :", error);
      setModals({ ...modals, addType: false });
    }
  };

  const onSubmitClass = async () => {
    if (!state.class) {
      return setError({ ...error, class: "Please enter a class name!" });
    }
    try {
      const formData = new FormData();
      formData.set("tag_type", "class");
      formData.set("tag_name", state.class);
      const res = await inventoryManagementBackend.setTag(formData);
      const newClasses = [
        ...new Set(existingItems.classes),
        { id: res.data.id, tag_name: res.data.tag_name },
      ];
      setExistingItems({ ...existingItems, classes: newClasses });
      setModals({ ...modals, addClass: false });
    } catch (error) {
      console.log("CLASS :", error);
      setModals({ ...modals, addClass: false });
    }
  };

  const onValueChange = (e) => {
    console.log(e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [progress, setProgress] = useState(0);

  return (
    <>
      <PaceLoader progress={progress} />
      <div className="fullscreen">
        <Navbar />
        <Header heading={"Management"} setModal={modalOpener} />
        {loading ? (
          <div className="pcoded-main-container" style={{ minHeight: "unset" }}>
            <div className="pcoded-wrapper">
              <div
                className="pcoded-content"
                style={{ padding: "0 30px 30px 30px" }}
              >
                <div className="pcoded-inner-content">
                  <div className="main-body">
                    <div className="row fix-h-85">
                      <div className="col-lg-4 h-100 px-0 pr-2">
                        <TagItems
                          items={[...new Set(existingItems.classes)]}
                          setModal={modalOpener}
                          title={"Classes"}
                          toOpen={"addClass"}
                          setExistingItems={setExistingItems}
                          itemsType={"Classes"}
                        />
                      </div>
                      <div className="col-lg-8 h-100 px-0  d-flex flex-column ">
                        <TagItems
                          items={[...new Set(existingItems.categories)]}
                          setModal={modalOpener}
                          title={"Categories"}
                          toOpen={"addCategory"}
                          setExistingItems={setExistingItems}
                        />
                        <TagItems
                          title={"Types"}
                          items={[...new Set(existingItems.types)]}
                          setModal={modalOpener}
                          toOpen={"addType"}
                          setExistingItems={setExistingItems}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddItemModal
              modal={modals.addItem}
              stuffs={existingItems}
              title={"Add Item"}
              onCancelHandler={onCancelHandler}
            />
            <AddModal
              error={error.type}
              modal={modals.addType}
              onValueChange={onValueChange}
              state={state}
              keyName="type"
              submitHandler={onSubmitType}
              title="Add Type"
              onCancelHandler={onCancelHandler}
            />
            <AddModal
              error={error.category}
              modal={modals.addCategory}
              onValueChange={onValueChange}
              state={state}
              submitHandler={onSubmitCategory}
              keyName="category"
              title="Add Category"
              onCancelHandler={onCancelHandler}
            />
            <AddModal
              error={error.class}
              modal={modals.addClass}
              onValueChange={onValueChange}
              state={state}
              keyName="class"
              title="Add Class"
              submitHandler={onSubmitClass}
              onCancelHandler={onCancelHandler}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default InventoryManagement;
