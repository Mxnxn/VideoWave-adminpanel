import React from "react";
import Item from "./Item";

const Types = ({ items, setSelected, selected, switchCategory, onTapTypeToggle }) => {
      return Object.keys(items).map((type, index) => {
            return Object.keys(items[type]).length > 0 ? (
                  switchCategory.open ? (
                        <ul key={index}>
                              <li
                                    className={
                                          items[type].open
                                                ? `head font-weight-bold cursor-pointer active-head`
                                                : `head font-weight-bold cursor-pointer`
                                    }
                                    onClick={(e) => onTapTypeToggle(type)}
                              >
                                    {type}
                              </li>
                              <Item items={items[type]} selected={selected} setSelected={setSelected} />
                        </ul>
                  ) : null
            ) : null;
      });
};

export default Types;
