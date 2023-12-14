import { useState, useRef } from "react";
import closeIcon from "../../assets/close.png";
import checkIcon from "../../assets/check.png";

interface FolderMenuProps {
	deleteFolder: () => void;
}

function FolderMenu(props: FolderMenuProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const selectedDate = useRef();



	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	const openMenu = () => {
		setIsMenuOpen(true);
	};
	const closeMenu = () => {
		setIsMenuOpen(false);
	};
	const toggleDatePicker = () => {
		setIsDatePickerOpen((prev) => !prev);
	};
	const openDatePicker = () => {
		setIsDatePickerOpen(true);
	};
	const closeDatePicker = () => {
		setIsDatePickerOpen(false);
	};

	const setDate = (event) => {
    const { value } = event.target;
    selectedDate.current = value;
	};

	const deleteFolder = () => {
		props.deleteFolder();
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<div className="relative left-[175px] bottom-[84px] w-28">
			<div className="p-1 cursor-pointer w-fit " onClick={toggleMenu}>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
			</div>

			<ul
				className="absolute bg-[#C0C0C0] w-fit p-1 rounded-md"
				style={{ display: isMenuOpen ? "block" : "none" }}
				onMouseLeave={toggleMenu}
			>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm" onClick={toggleDatePicker}>
					Add Deadline
				</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm">Add Labels</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-sm" onClick={deleteFolder}>
					Delete
				</li>
			</ul>

			<div className="absolute right-[150px]" style={{ display: isDatePickerOpen ? "block" : "none" }}>
				<input className="left-[5px] rounded-sm cursor-pointer" type="date" onChange={setDate} />
				<img
					className="relative w-5 left-[140px] bottom-[35px] cursor-pointer hover:bg-gray-400 rounded-full"
					src={checkIcon}
					onClick={closeDatePicker}
				/>
				<img
					className="relative w-5 left-[140px] bottom-[33px] cursor-pointer hover:bg-gray-400 rounded-full"
					src={closeIcon}
					onClick={closeDatePicker}
				/>
			</div>
		</div>
	);
}

export default FolderMenu;
