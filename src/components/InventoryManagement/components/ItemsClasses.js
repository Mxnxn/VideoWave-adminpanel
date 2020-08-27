import React from "react";

const ItemsClasses = ({items}) => (<div className="col pr-0 pl-4 h-100 bg-white rounded shadow"  >
<div className="row py-2 pl-2 border-bottom">
    <div className="col-sm-6 col-lg-6 geb text-uppercase fs-20 ls-1">
        <span className="ls-1">Classes</span>
    </div>
    <div className="col-sm-6 col-lg-6 d-flex">
        <button className="ml-auto my-auto btn btn-primary btn-sm shadow-1">Add</button>
    </div>
</div>
<div className=" d-flex flex-wrap item-area " style={{overflowX:"auto",height:"90%"}}  >
    {items.map((el,index)=><div className="d-flex h-60 m-2 b-bgx shadow-1 fira fs-16" ><span className="m-auto">Switcher</span></div>)}
</div>
</div>);

export default ItemsClasses