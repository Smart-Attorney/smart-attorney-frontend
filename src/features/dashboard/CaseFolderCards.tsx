import { useNavigate } from "react-router-dom";
import CardGrid from "../../layouts/CardGrid";
import Database from "../../services/database";
import { formatDateInput } from "../../utils/format";
import type { CaseFolderObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { createFolderLabel } from "./api/create-folder-label";
import { deleteFolderLabel } from "./api/delete-folder-label";
import { updateDeadline } from "./api/update-deadline";

interface CaseFolderCardProps {
	caseFolders: CaseFolderObj[] | null;
	setCaseFolders: React.Dispatch<React.SetStateAction<CaseFolderObj[] | null>>;
}

function CaseFolderCards({ caseFolders, setCaseFolders }: CaseFolderCardProps) {
	const db = new Database();
	const navigate = useNavigate();

	const handleUpdateFolderDeadline = async (
		folderId: string,
		event: React.ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		const { value } = event.target;
		const deadlineInUnixTime = Date.parse(value);
		try {
			const response = await updateDeadline(folderId, deadlineInUnixTime);
			if (response.ok) {
				const updatedCaseFolderArray = await response.json();
				setCaseFolders(updatedCaseFolderArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleAddFolderLabel = async (folderId: string, event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const { value: newLabel } = (event.target as HTMLFormElement)[0] as HTMLInputElement;
		// checks for empty inputs and null errors
		if (newLabel.trim() === "" || newLabel === null) {
			// clears input field on invalid input
			((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
			return;
		}
		try {
			const response = await createFolderLabel(folderId, newLabel);
			if (response.ok) {
				const updatedCaseFolderArray = await response.json();
				setCaseFolders(updatedCaseFolderArray);
			}
		} catch (error) {
			alert(error);
		} finally {
			// clears input field after user clicks add
			((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
		}
	};

	const handleDeleteFolderLabel = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		const { id: folderId } = event.target as HTMLParagraphElement;
		const { id: labelId } = (event.target as HTMLDivElement).parentElement!;
		try {
			const response = await deleteFolderLabel(folderId, labelId);
			if (response.ok) {
				const updatedCaseFolderArray = await response.json();
				setCaseFolders(updatedCaseFolderArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteFolder = (folderId: string): void => {
		const updatedArray = db.deleteCaseFolderById(folderId);
		setCaseFolders(updatedArray);
	};

	return (
		<CardGrid>
			{caseFolders?.map((caseFolder) => {
				const deadline = caseFolder.deadline === 0 ? "" : formatDateInput(caseFolder.deadline);
				return (
					<div
						className="flex flex-col w-64 h-64 py-4 pl-5 bg-white rounded-3xl"
						key={caseFolder.id}
						id={caseFolder.id}
					>
						{/* Kebab Menu */}
						<div className="relative left-[200px] max-w-fit">
							<KebabMenu
								addDeadline={(event) => handleUpdateFolderDeadline(caseFolder.id, event)}
								addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
								deleteFolder={() => handleDeleteFolder(caseFolder.id)}
							/>
						</div>

						{/* Case Deadline */}
						<div className="relative flex flex-row items-center w-[200px] bottom-[26px] justify-between pr-2">
							<p>Deadline: {deadline}</p>
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
							onClick={() => navigate(`/case/${caseFolder.id}`)}
						>
							{caseFolder.name}
						</p>
					</div>
				);
			})}
		</CardGrid>
	);
}

export default CaseFolderCards;
