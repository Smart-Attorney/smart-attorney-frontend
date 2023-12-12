import { useState } from "react";

function KebabMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenuOpen = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<div className="relative left-[175px] bottom-[84px] w-28">
			<div className="p-1 cursor-pointer w-fit " onClick={toggleMenuOpen}>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
			</div>

			<ul
				className="absolute bg-[#C0C0C0] w-fit p-1 rounded-sm"
				style={{ display: isMenuOpen ? "block" : "none" }}
			>
				<li className="cursor-pointer">Add Deadline</li>
				<li className="cursor-pointer">Add Labels</li>
				<li className="cursor-pointer">Delete</li>
			</ul>
		</div>
	);
}

export default KebabMenu;
