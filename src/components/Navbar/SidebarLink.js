import React from 'react';
import { Home } from 'react-feather';
import { Link } from "react-router-dom"

const setActive = (path) => {
    const temp = window.location.pathname;
    if (temp === path) {
        return "nav-link active";
    }
    return "nav-link";
};

const SidebarLink = ({ icon: Icon, toggleNavBar, path, name }) => {
    return (<Link to={path} >
        <li className={toggleNavBar ? "my-2" : ""}>
            <a className={setActive(path)} aria-current="page">
                <span className="pcoded-micon" style={{ width: toggleNavBar ? "50px" : "30px" }}>
                    <Icon size={toggleNavBar ? "42" : "24"} />
                </span>
                <span className="pcoded-mtext fs-17" id="nav-link-mtext">{name}</span>
            </a>
        </li>
    </Link>);
}

export default SidebarLink;