import React from "react";
import Types from "./Types";

const Category = ({
	items,
	onTapCategoryToggle,
	onTapTypeToggle,
	selected,
	searchList,
	setSelected,
}) => {
	return Object.keys(items).map((cat,index) => {
		return Object.keys(items[cat]).length > 0 ? (
			items.open ? (
				<ul key={index}>
					<li
						className={
							items[cat].open
								? `head font-weight-bold cursor-pointer active-head`
								: `head font-weight-bold cursor-pointer`
						}
						onClick={(e) => onTapCategoryToggle(cat,searchList)}
					>
						{cat}
					</li>

					<Types
						items={items[cat]}
						setSelected={setSelected}
						selected={selected}
						searchList={searchList}
						onTapTypeToggle={onTapTypeToggle}
						switchCategory={items[cat]}
					/>
				</ul>
			) : null
		) : null;
	});
};

export default Category;
