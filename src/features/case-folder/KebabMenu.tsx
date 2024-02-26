import { useEffect, useRef, useState } from "react";

interface KebabMenuProps {
	fileName: string;
	updateFileName: (newFileName: string) => void;
	deleteFile: () => void;
}

function KebabMenu({ fileName, updateFileName, deleteFile }: KebabMenuProps) {
	const name = useRef<string>("");
	const extension = useRef<string>("");

	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false);

	useEffect(() => {
		const fileNameArray = fileName.split(".");
		name.current = fileNameArray[0];
		extension.current = fileNameArray[1];
	}, []);

	const toggleMenu = (): void => setMenuIsOpen((prev) => !prev);

	const toggleEditModal = (): void => {
		setEditModalIsOpen((prev) => !prev);
	};

	const toggleDeleteAlert = (): void => {
		setDeleteAlertIsOpen((prev) => !prev);
	};

	const closeMenu = (): void => setMenuIsOpen(false);
	const closeEditModal = (): void => setEditModalIsOpen(false);
	const closeDeleteAlert = (): void => setDeleteAlertIsOpen(false);

	const handleSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const buttonElement = event.target as HTMLButtonElement;
		const inputElement = buttonElement.parentNode?.previousSibling as HTMLInputElement;
		const { value: newName } = inputElement;
		if (newName === fileName) {
			closeEditModal();
			return;
		}
		const newFileName = `${newName}.${extension.current}`;
		updateFileName(newFileName);
		closeEditModal();
	};

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
				style={{ display: menuIsOpen ? "block" : "none" }}
				onMouseLeave={closeMenu}
			>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleEditModal}>
					Edit
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDeleteAlert}>
					Delete
				</li>
			</ul>

			{/* Edit Modal */}
			<div
				className="absolute right-[-6px] top-[80px] z-[5] border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: editModalIsOpen ? "block" : "none" }}
			>
				<div className="flex flex-col items-center gap-3">
					<h3 className="text-lg font-semibold w-max">Edit Document Name</h3>
					<input type="text" className="w-full px-2 py-1 border border-black rounded-md" defaultValue={name.current} />
					<div className="flex flex-row justify-between w-full">
						<button
							className="w-28 bg-[#77DD77] text-white rounded-md py-1"
							type="button"
							onClick={handleSaveButtonClick}
						>
							Save
						</button>
						<button className="w-28 bg-[#c1c1c1] text-white rounded-md py-1" type="button" onClick={closeEditModal}>
							Cancel
						</button>
					</div>
				</div>
			</div>

			{/* Delete Warning */}
			<div
				className="absolute right-[-6px] top-[80px] z-[5] border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: deleteAlertIsOpen ? "block" : "none" }}
			>
				<div className="flex flex-col items-center gap-2">
					<h3 className="text-lg font-semibold w-max">Delete Case File?</h3>
					<p className="w-[90%]">This process cannot be undone.</p>
					<div className="flex flex-row justify-between w-full">
						<button className="w-28 bg-[#c1c1c1] text-white rounded-md py-1" type="button" onClick={closeDeleteAlert}>
							Cancel
						</button>
						<button className="w-28 bg-[#f15e5e] text-white rounded-md py-1" type="button" onClick={deleteFile}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default KebabMenu;
