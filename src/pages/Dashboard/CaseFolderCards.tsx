import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FolderMenu from "../../features/folder-menu/FolderMenu";
import { formatDateInput } from "../../utils/format";
import type { CaseFolderObj } from "../../utils/types";
import Database from "../../services/database";

function CaseFolderCards() {
	const db = new Database();
	const navigate = useNavigate();
	const [caseFolders, setCaseFolders] = useState<CaseFolderObj[]>();

	/**
	 * On initial load, retrieves case array from local storage.
	 * Then, sets case array to cases state.
	 * Empty dependency array since it should only run once on initial load.
	 */
	useEffect(() => {
		const caseArray = db.getCaseArray();
		if (caseArray !== null) {
			setCaseFolders(caseArray);
		} else {
			db.initNewArray();
			setCaseFolders([]);
		}
	}, []);

	const handleAddFolderDeadline = (folderId: string, event: React.ChangeEvent<HTMLInputElement>): void => {
		const { value: newDeadline } = event.target;
		const updatedArray = db.addCaseFolderDeadline(folderId, newDeadline);
		setCaseFolders(updatedArray);
	};

	const handleAddFolderLabel = (folderId: string, event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		const { value: newLabel } = (event.target as HTMLFormElement).form[0];
		const updatedArray = db.addCaseFolderLabel(folderId, newLabel);
		setCaseFolders(updatedArray);
	};

	const handleDeleteFolderLabel = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		const { id: folderId } = event.target as HTMLParagraphElement;
		const { id: labelId } = (event.target as HTMLDivElement).parentElement!;
		const updatedArray = db.deleteCaseFolderLabelById(folderId, labelId);
		setCaseFolders(updatedArray);
	};

	const handleDeleteFolder = (folderId: string): void => {
		const updatedArray = db.deleteCaseFolderById(folderId);
		setCaseFolders(updatedArray);
	};

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{/**
			 * TODO:
			 * Rename this file to Case Folder Card for specificity.
			 * Move the grid layout to dashboard.
			 * Dashboard should be in charge of displaying case folder cards.
			 */}
			{caseFolders?.map((caseFolder) => (
				<div
					className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-5 flex flex-col"
					key={caseFolder.id}
					id={caseFolder.id}
				>
					{/* Kebab Menu */}
					<div className="relative left-[200px] w-28">
						<FolderMenu
							addDeadline={(event) => handleAddFolderDeadline(caseFolder.id, event)}
							addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
							deleteFolder={() => handleDeleteFolder(caseFolder.id)}
						/>
					</div>

					{/* Case Deadline */}
					<div className="relative flex flex-row items-center gap-4 w-fit bottom-[26px]">
						<p>Deadline: {formatDateInput(caseFolder.deadline)}</p>
						<div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${caseFolder.status}` }}></div>
					</div>

					{/* Case Folder Labels */}
					<div className="relative flex flex-row flex-wrap w-[85%] h-6 gap-2 bottom-[24px]">
						{caseFolder.labels.map((label) => (
							<div key={label.id} id={label.id}>
								<p
									className="px-3 text-sm pb-[3px] pt-[2px] text-white bg-black rounded-full cursor-pointer"
									id={caseFolder.id}
									onClick={handleDeleteFolderLabel}
								>
									{label.name}
								</p>
							</div>
						))}
					</div>

					{/* Case Folder Name */}
					<p
						className="relative top-[120px] w-fit cursor-pointer font-semibold hover:text-blue-500"
						onClick={() => navigate(caseFolder.id)}
					>
						{caseFolder.name}
					</p>
				</div>
			))}
		</div>
	);
}

export default CaseFolderCards;
