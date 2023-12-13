import { useState } from "react";

interface FolderMenuProps {
	deleteFolder: () => void;
}

function FolderMenu(props: FolderMenuProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenuOpen = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const deleteFolder = () => {
		props.deleteFolder();
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
				className="absolute bg-[#C0C0C0] w-fit p-1 rounded-md"
				style={{ display: isMenuOpen ? "block" : "none" }}
			>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-md">Add Deadline</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-md">Add Labels</li>
				<li className="px-1 cursor-pointer hover:bg-white hover:rounded-md" onClick={deleteFolder}>
					Delete
				</li>
			</ul>
		</div>
	);
}

export default FolderMenu;
