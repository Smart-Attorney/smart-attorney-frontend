import { useNavigate } from "react-router-dom";
import CardGrid from "../../layouts/CardGrid";
import { formatForCardDisplay } from "../../utils/format";
import type { DashboardFolderCardObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { createFolderLabel } from "./api/create-folder-label";
import { deleteCaseFolder } from "./api/delete-case-folder";
import { deleteFolderLabel } from "./api/delete-folder-label";
import { updateDeadline } from "./api/update-deadline";

interface CaseFolderCardProps {
	caseFolders: DashboardFolderCardObj[] | null;
	setCaseFolders: React.Dispatch<React.SetStateAction<DashboardFolderCardObj[] | null>>;
}

function CaseFolderCards({ caseFolders, setCaseFolders }: CaseFolderCardProps) {
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
				const data: DashboardFolderCardObj[] = await response.json();
				setCaseFolders(data);
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
				const data: DashboardFolderCardObj[] = await response.json();
				setCaseFolders(data);
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
				const data: DashboardFolderCardObj[] = await response.json();
				setCaseFolders(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteFolder = async (folderId: string): Promise<void> => {
		try {
			const response = await deleteCaseFolder(folderId);
			if (response.ok) {
				const data: DashboardFolderCardObj[] = await response.json();
				setCaseFolders(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleViewCaseFolder = (event: React.MouseEvent<HTMLDivElement>, folderId: string) => {
		const { id } = event.target as HTMLElement;
		const folderClicked = id === folderId;
		const nameClicked = id === "case-folder-name";
		const deadlineClicked = id === "case-folder-deadline";
		const deadlineTextClicked = id === "deadline-text";
		const deadlineStatusClicked = id === "deadline-status";
		if (folderClicked || nameClicked || deadlineClicked || deadlineTextClicked || deadlineStatusClicked) {
			navigate(`/case/${folderId}`);
		}
		return;
	};

	return (
		<CardGrid>
			{caseFolders?.map((caseFolder) => {
				return (
					<div
						className="flex flex-col w-64 h-64 py-4 pl-5 bg-white cursor-pointer rounded-3xl"
						key={caseFolder.id}
						id={caseFolder.id}
						onClick={(event) => handleViewCaseFolder(event, caseFolder.id)}
					>
						{/* Kebab Menu */}
						<div className="relative left-[200px] max-w-fit">
							<KebabMenu
								addDeadline={(event) => {
									event.stopPropagation(), handleUpdateFolderDeadline(caseFolder.id, event);
								}}
								addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
								deleteFolder={() => handleDeleteFolder(caseFolder.id)}
							/>
						</div>

						{/* Case Deadline */}
						<div
							id="case-folder-deadline"
							className="relative flex flex-row items-center w-[200px] bottom-[26px] justify-between pr-2"
						>
							<p id="deadline-text">Deadline: {formatForCardDisplay(caseFolder.deadline)}</p>
							<div
								id="deadline-status"
								className="w-4 h-4 rounded-full"
								style={{ backgroundColor: `${caseFolder.status}` }}
							></div>
						</div>

						{/* Case Folder Labels */}
						<div id="case-folder-labels" className="relative flex flex-row flex-wrap w-[85%] h-6 gap-2 bottom-[24px]">
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
							id="case-folder-name"
							className="relative top-[120px] w-fit cursor-pointer font-semibold hover:text-blue-500"
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
