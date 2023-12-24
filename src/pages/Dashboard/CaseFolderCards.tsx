import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FolderMenu from "./FolderMenu";
import StorageArray from "../../services/local-storage/storage-array";
import CaseFolder from "../../services/local-storage/case-folder";
import CaseDeadline from "../../services/local-storage/case-deadline";
import CaseLabel from "../../services/local-storage/case-label";
import { formatDateInput } from "../../utils/format";
import type { FolderItem } from "../../utils/types";

function CaseFolderCards() {
	const navigate = useNavigate();
	const [cases, setCases] = useState<FolderItem[]>();

	/**
	 * On initial load, retrieves case array from local storage.
	 * Then, sets case array to cases state.
	 * Empty dependency array since it should only run once on initial load.
	 */
	useEffect(() => {
		const caseArrayExists = StorageArray.exists();
		if (caseArrayExists) {
			setCases(StorageArray.get());
		} else {
			setCases([]);
		}
	}, []);

	const handleAddFolderDeadline = (
		folderId: string,
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const { value: newDeadline } = event.target;
		const updatedArray = CaseDeadline.add(folderId, newDeadline);
		setCases(updatedArray);
	};

	const handleAddFolderLabel = (
		folderId: string,
		event: React.MouseEvent<HTMLButtonElement>
	): void => {
		event.preventDefault();
		const { value: newLabel } = (event.target as HTMLFormElement).form[0];
		const updatedArray = CaseLabel.add(folderId, newLabel);
		setCases(updatedArray);
	};

	const handleDeleteFolderLabel = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		const { id: folderId, innerText: selectedLabel } = event.target as HTMLParagraphElement;
		const updatedArray = CaseLabel.delete(folderId, selectedLabel);
		setCases(updatedArray);
	};

	const handleDeleteFolder = (folderId: string): void => {
		const updatedArray = CaseFolder.delete(folderId);
		setCases(updatedArray);
	};

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{/**
			 * TODO:
			 * Rename this file to Case Folder Card for specificity.
			 * Move the grid layout to dashboard.
			 * Dashboard should be in charge of displaying case folder cards.
			 */}
			{cases?.map((caseInfo) => (
				<div
					className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-5 flex flex-col"
					key={caseInfo.id}
					id={caseInfo.id.toString()}
				>
					{/* Kebab Menu */}
					<div className="relative left-[200px] w-28">
						<FolderMenu
							addDeadline={(event) => handleAddFolderDeadline(caseInfo.id, event)}
							addLabel={(event) => handleAddFolderLabel(caseInfo.id, event)}
							deleteFolder={() => handleDeleteFolder(caseInfo.id)}
						/>
					</div>

					{/* Case Deadline */}
					<div className="relative flex flex-row items-center gap-4 w-fit bottom-[26px]">
						<p>Deadline: {formatDateInput(caseInfo.deadline)}</p>
						<div
							className="w-4 h-4 rounded-full"
							style={{ backgroundColor: `${caseInfo.status}` }}
						></div>
					</div>

					{/* Case Folder Labels */}
					<div className="relative flex flex-row flex-wrap w-[85%] h-6 gap-2 bottom-[24px]">
						{caseInfo.labels.map((label) => (
							<p
								className="px-3 text-sm pb-[3px] pt-[2px] text-white bg-black rounded-full cursor-pointer"
								key={caseInfo.id}
								id={caseInfo.id.toString()}
								onClick={handleDeleteFolderLabel}
							>
								{label}
							</p>
						))}
					</div>

					{/* Case Folder Name */}
					<p
						className="relative top-[120px] w-fit cursor-pointer font-semibold hover:text-blue-500"
						onClick={() => navigate(caseInfo.id)}
					>
						{caseInfo.name}
					</p>
				</div>
			))}
		</div>
	);
}

export default CaseFolderCards;
