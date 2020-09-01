import React from "react";
import Category from "./Category";

const Classes = ({
	items,
	onTapClassToggle,
	onTapTypeToggle,
	setSelected,
	selected,
	onTapCategoryToggle,
}) => {
	return Object.keys(items).map((cls,index) => (
		<span key={index}>
			<li
				className={
					items[cls].open
						? `head font-weight-bold cursor-pointer active-head`
						: `head font-weight-bold cursor-pointer `
				}
				onClick={(e) => onTapClassToggle(cls,items)}
			>
				{cls}
			</li>
			<Category
				items={items[cls]}
				onTapCategoryToggle={onTapCategoryToggle}
				onTapTypeToggle={onTapTypeToggle}
				selected={selected}
				cls={cls}
				searchList={items}
				setSelected={setSelected}
			/>
		</span>
	));
};

export default Classes;
