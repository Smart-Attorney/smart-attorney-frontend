import { useState } from "react";
import removeIcon from "../../assets/remove.png";

interface FolderMenuProps {
	addDeadline: (event: React.ChangeEvent<HTMLInputElement>) => void;
	deleteFolder: () => void;
}

function FolderMenu(props: FolderMenuProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	// const openMenu = () => {
	// 	setIsMenuOpen(true);
	// };
	const closeMenu = () => {
		setIsMenuOpen(false);
	};
	const toggleDatePicker = () => {
		setIsDatePickerOpen((prev) => !prev);
	};
	// const openDatePicker = () => {
	// 	setIsDatePickerOpen(true);
	// };
	const closeDatePicker = () => {
		setIsDatePickerOpen(false);
	};

	const deleteFolder = () => {
		closeMenu();
		props.deleteFolder();
	};

	return (
		<div className="relative left-[195px] bottom-[84px] w-28">
			<div className="p-1 cursor-pointer w-fit " onClick={toggleMenu}>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
			</div>

			<ul
				className="absolute bg-[#C0C0C0] w-fit p-1 rounded-md"
				style={{ display: isMenuOpen ? "block" : "none" }}
				onMouseLeave={closeMenu}
			>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm" onClick={toggleDatePicker}>
					Add Deadline
				</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm">Add Labels</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm" onClick={deleteFolder}>
					Delete
				</li>
			</ul>

			<div className="absolute right-[127px]" style={{ display: isDatePickerOpen ? "block" : "none" }}>
				<div className="flex flex-row items-center w-40 gap-1">
					<input
						className="left-[5px] rounded-sm cursor-pointer px-2"
						type="date"
						name="deadline"
						onChange={props.addDeadline}
					/>
					<img
						className="w-6 h-6 rounded-md cursor-pointer hover:bg-gray-400"
						src={removeIcon}
						onClick={closeDatePicker}
					/>
				</div>
			</div>
		</div>
	);
}

export default FolderMenu;
