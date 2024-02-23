import { useState } from "react";

interface KebabMenuProps {
	deleteFile: () => void;
}

function KebabMenu(props: KebabMenuProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

	const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);

	const toggleDeleteAlert = (): void => {
		setIsDeleteAlertOpen((prev) => !prev);
	};

	const closeMenu = (): void => setIsMenuOpen(false);
	const closeDeleteAlert = (): void => setIsDeleteAlertOpen(false);

	return (
		<>
			{/* Kebab Menu Icon */}
			<div className="p-1 cursor-pointer w-fit " onClick={toggleMenu}>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
			</div>

			{/* Menu Options */}
			<ul
				className="absolute bg-[#eff1f3] p-1 rounded-md z-10 border border-black w-max"
				style={{ display: isMenuOpen ? "block" : "none" }}
				onMouseLeave={closeMenu}
			>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDeleteAlert}>
					Delete
				</li>
			</ul>

			{/* Delete Warning */}
			<div
				className="absolute right-[-14px] top-[90px] z-10 border border-black p-3 rounded-lg bg-[#eff1f3] w-max"
				style={{ display: isDeleteAlertOpen ? "block" : "none" }}
			>
				<div className="flex flex-col items-center gap-2">
					<h3 className="text-lg font-semibold w-max">Delete Case File?</h3>
					<p className="w-full">This process cannot be undone.</p>
					<div className="flex flex-row w-full justify-evenly">
						<button className="w-20 bg-[#c1c1c1] text-white rounded-md py-1" type="button" onClick={closeDeleteAlert}>
							Cancel
						</button>
						<button className="w-20 bg-[#f15e5e] text-white rounded-md py-1" type="button" onClick={props.deleteFile}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default KebabMenu;
