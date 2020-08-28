import React from "react";
import { Button } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";

const ItemsClasses = ({ items,setModal }) => (<div className="col pr-0 pl-4 h-100 bg-white rounded shadow"  >
    <div className="row p-2 mr-4 border-bottom">
        <div className="col-sm-6 col-lg-6 geb text-uppercase fs-20 ls-1">
            <span className="ls-1">Classes</span>
        </div>
    </div>
    <div className=" d-flex pt-3 flex-wrap item-area " style={{ overflowX: "auto", height: "90%", alignContent: "start" }}  >
        {items.map((el, index) => <div key={index}style={{ maxWidth: "280px", width: "auto" }} className="cursor-pointer d-flex h-60 m-2 b-bgx shadow-1 fira fs-14" ><span className="m-auto px-4">{el}</span></div>)}
        <Button onClick={e=>setModal("addClass")} className="h-60 m-2 rounded text-white shadow-1" varient="cotained" style={{ background: "#04a9f5", outline: "none" }} ><AddRounded /></Button>
    </div>
</div >);

export default ItemsClasses