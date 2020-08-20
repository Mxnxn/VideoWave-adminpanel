import React from "react";

const Item = ({ items, selected, setSelected }) => {
	return items.open ? (
		<li>
			{Object.keys(items).map((el) =>
				el !== "open" ? (
					<span
						className={
							selected.name === items[el].name
								? "item nav-link active-itm"
								: "item nav-link"
						}
						onClick={(e) => setSelected(items[el])}
					>
						<span className="icon">›</span>
						<span className="mtext">{items[el].name}</span>
					</span>
				) : null
			)}
		</li>
	) : null;
};

export default Item;
