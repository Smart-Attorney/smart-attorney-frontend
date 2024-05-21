import { useState } from "react";
import { CloseIcon } from "../../assets/misc";

interface KebabMenuProps {
	id: string;
	updateStatus: () => void;
	addDeadline: (event: React.ChangeEvent<HTMLInputElement>) => void;
	addLabel: (event: React.FormEvent<HTMLFormElement>) => void;
	deleteFolder: () => void;
}

function KebabMenu({ id, updateStatus, addDeadline, addLabel, deleteFolder }: KebabMenuProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [isLabelInputOpen, setIsLabelInputOpen] = useState(false);
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

	const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);

	const toggleDatePicker = (): void => {
		closeLabelInput();
		closeDeleteAlert();
		setIsDatePickerOpen((prev) => !prev);
	};

	const toggleLabelInput = (): void => {
		closeDatePicker();
		closeDeleteAlert();
		setIsLabelInputOpen((prev) => !prev);
	};

	const toggleDeleteAlert = (): void => {
		closeDatePicker();
		closeLabelInput();
		setIsDeleteAlertOpen((prev) => !prev);
	};

	const closeMenu = (): void => setIsMenuOpen(false);
	const closeDatePicker = (): void => setIsDatePickerOpen(false);
	const closeLabelInput = (): void => setIsLabelInputOpen(false);
	const closeDeleteAlert = (): void => setIsDeleteAlertOpen(false);

	return (
		<>
			{/* Kebab Menu Icon */}
			<div id={id} className="p-1 cursor-pointer w-fit " onClick={toggleMenu}>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
				<span className="block w-1 h-1 bg-[#9C9DA4] m-[2px] rounded-full"></span>
			</div>

			{/* Menu Options */}
			<ul
				className="absolute bg-[#eff1f3] p-1 rounded-md z-20 border border-black w-max"
				style={{ display: isMenuOpen ? "block" : "none" }}
				onMouseLeave={closeMenu}
			>
				<li
					className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm"
					onClick={() => {
						updateStatus();
						closeMenu();
					}}
				>
					Update Status
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDatePicker}>
					Add Deadline
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleLabelInput}>
					Add Labels
				</li>
				<li className="px-1 cursor-pointer hover:bg-[#C0C0C0] hover:rounded-sm" onClick={toggleDeleteAlert}>
					Delete
				</li>
			</ul>

			{/* Date Picker */}
			<div
				className="absolute right-[-6px] top-[80px] z-10 border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: isDatePickerOpen ? "block" : "none" }}
			>
				<label htmlFor="date-picker">Set Deadline:</label>
				<div className="flex flex-row items-center w-full gap-4">
					<input
						className="left-[5px] rounded-sm cursor-pointer w-full px-2 border border-black"
						id="date-picker"
						type="date"
						onChange={addDeadline}
					/>
					<img
						className="w-6 h-6 rounded-full cursor-pointer hover:bg-gray-400"
						src={CloseIcon}
						onClick={closeDatePicker}
					/>
				</div>
			</div>

			{/* Label Assigner */}
			<div
				className="absolute right-[-6px] top-[80px] z-10 border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: isLabelInputOpen ? "block" : "none" }}
			>
				<form className="flex flex-col gap-2" name="label-form" onSubmit={addLabel}>
					<label htmlFor="label-input">New Label:</label>
					<input className="w-full px-2 pb-[2px] border border-black rounded-sm" id="label-input" type="text" />
					<div className="flex flex-row justify-between w-full">
						<button
							className="w-28 bg-[#77dd77] rounded-md py-1"
							type="submit"
							// onClick={props.addLabel}
						>
							Add
						</button>
						<button className="w-28 rounded-md bg-[#c1c1c1] py-1" type="button" onClick={closeLabelInput}>
							Close
						</button>
					</div>
				</form>
			</div>

			{/* Delete Warning */}
			<div
				className="absolute right-[-6px] top-[80px] z-10 border border-black p-3 rounded-lg bg-[#eff1f3] w-64"
				style={{ display: isDeleteAlertOpen ? "block" : "none" }}
			>
				<div className="flex flex-col items-center gap-2">
					<h3 className="text-lg font-semibold w-max">Delete Case Folder?</h3>
					<p className="w-full">This process cannot be undone.</p>
					<div className="flex flex-row justify-between w-full">
						<button className="w-28 bg-[#c1c1c1] text-white rounded-md py-1" type="button" onClick={closeDeleteAlert}>
							Cancel
						</button>
						<button className="w-28 bg-[#f15e5e] text-white rounded-md py-1" type="button" onClick={deleteFolder}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default KebabMenu;
