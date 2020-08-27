import React from "react";

const ItemsTypes = ({items}) =>{ return (<div className="col pl-4 pr-0 bg-white rounded shadow mt-2" style={{height:"48%"}} >
<div className="row py-2 pl-2 border-bottom">
    <div className="col-sm-10 col-lg-10 geb text-uppercase fs-20 ls-1">
        <span className="ls-1">Types</span>
    </div>
    <div className="col-sm-2 col-lg-2 d-flex">
        <button className="ml-auto my-auto btn btn-primary btn-sm shadow-1">Add</button>
    </div>
</div>
<div className="d-flex flex-wrap item-area"  style={{height:"82%",overflowY:"auto",overflowX:"none"}}>
    {items.map((el,index)=><div className="d-flex h-60 m-2 b-bgx shadow-1 fira fs-16" ><span className="m-auto">Switcher</span></div>)}
</div>
</div>)};

export default ItemsTypes;