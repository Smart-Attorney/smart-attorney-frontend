import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "../../assets/misc";
import { FileStatus } from "../../utils/types";

interface KebabMenuProps {
	fileName: string;
	updateFileStatus: (newFileStatus: FileStatus) => void;
	updateFileName: (newFileName: string) => void;
	setDeadline: (event: React.ChangeEvent<HTMLInputElement>) => void;
	deleteFile: () => void;
}

function KebabMenu({ fileName, updateFileStatus, updateFileName, setDeadline, deleteFile }: KebabMenuProps) {
	const name = useRef<string>("");
	const extension = useRef<string>("");

	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [statusModalOpen, setStatusModalOpen] = useState(false);
	const [deadlineModalOpen, setDeadlineModalOpen] = useState(false);
	const [editNameModalIsOpen, setEditNameModalIsOpen] = useState(false);
	const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false);

	useEffect(() => {
		const fileNameArray = fileName.split(".");
		name.current = fileNameArray[0];
		extension.current = fileNameArray[1];
	}, []);

	const toggleMenu = (): void => setMenuIsOpen((prev) => !prev);
	const toggleStatusModal = (): void => setStatusModalOpen((prev) => !prev);
	const toggleDeadlineModal = (): void => setDeadlineModalOpen((prev) => !prev);
	const toggleEditModal = (): void => setEditNameModalIsOpen((prev) => !prev);
	const toggleDeleteAlert = (): void => setDeleteAlertIsOpen((prev) => !prev);

	const closeMenu = (): void => setMenuIsOpen(false);
	const closeStatusModal = (): void => setStatusModalOpen(false);
	const closeDeadlineModal = (): void => setDeadlineModalOpen(false);
	const closeEditModal = (): void => setEditNameModalIsOpen(false);
	const closeDeleteAlert = (): void => setDeleteAlertIsOpen(false);

	const handleStatusClick = (event: React.MouseEvent<HTMLLIElement>) => {
		const selectedStatus = event.target as HTMLLIElement;
		const newStatus = selectedStatus.id as FileStatus;
		updateFileStatus(newStatus);
		closeStatusModal();
	};

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
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleStatusModal}>
					Update Status
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleEditModal}>
					Edit Name
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDeadlineModal}>
					Set Deadline
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDeleteAlert}>
					Delete
				</li>
			</ul>

			{/* Update Status Modal*/}
			<div
				className="absolute right-[15px] top-[30px] z-[5] border border-black p-2 rounded-lg bg-[#eff1f3] w-32"
				style={{ display: statusModalOpen ? "block" : "none" }}
				onMouseLeave={closeStatusModal}
			>
				<div>
					<ul>
						<li
							id="In Progress"
							className="cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm px-2"
							onClick={(event) => handleStatusClick(event)}
						>
							In Progress
						</li>
						<li
							id="In Review"
							className="cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm px-2"
							onClick={(event) => handleStatusClick(event)}
						>
							In Review
						</li>
						<li
							id="Submitted"
							className="cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm px-2"
							onClick={(event) => handleStatusClick(event)}
						>
							Submitted
						</li>
					</ul>
				</div>
			</div>

			{/* Edit Name Modal */}
			<div
				className="absolute right-[-6px] top-[80px] z-[5] border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: editNameModalIsOpen ? "block" : "none" }}
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

			{/* Date Picker */}
			<div
				className="absolute right-[-6px] top-[80px] z-10 border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: deadlineModalOpen ? "block" : "none" }}
			>
				<label htmlFor="date-picker">Set Deadline:</label>
				<div className="flex flex-row items-center w-full gap-4">
					<input
						className="left-[5px] rounded-sm cursor-pointer w-full px-2 border border-black"
						id="date-picker"
						type="date"
						onChange={setDeadline}
					/>
					<img
						className="w-6 h-6 rounded-full cursor-pointer hover:bg-gray-400"
						src={CloseIcon}
						onClick={closeDeadlineModal}
					/>
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
