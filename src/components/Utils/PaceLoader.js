import React from "react";

const PaceLoader = ({progress}) => {
    return (
        <div className="pace-loader" style={{width:progress > 0 ? `${progress}vw`:"0vw",display:progress === 0 ? "none":"block"}}></div>
    )
}

export default PaceLoader;