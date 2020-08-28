import React from "react";
import { Button } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons"
const ItemsTypes = ({ items,setModal }) => {
    return (<div className="col pl-4 pr-0 bg-white rounded shadow mt-2" style={{ height: "48%" }} >
        <div className="row p-2 mr-4 border-bottom">
            <div className="col-sm-10 col-lg-10 geb text-uppercase fs-20 ls-1">
                <span className="ls-1">Types</span>
            </div>

        </div>
        <div className="d-flex flex-wrap item-area pt-3" style={{ height: "82%", overflowY: "auto", overflowX: "none", alignContent: "start" }}>
            {items.map((el, index) => <div style={{ maxWidth: "280px", width: "auto" }} className="d-flex h-60 m-2 b-bgx shadow-1 fira fs-14 cursor-pointer" ><span className="px-4 m-auto">{el}</span></div>)}
            <Button onClick={e=>setModal("addType")} className="h-60 m-2 rounded text-white shadow-1" varient="cotained" style={{ background: "#04a9f5", outline: "none", borderRadius: 10 }} ><AddRounded /></Button>
        </div>
    </div>)
};

export default ItemsTypes;