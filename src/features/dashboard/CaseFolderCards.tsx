import { useNavigate } from "react-router-dom";
import { FileSnapshot, MessageSquare, Paperclip } from "../../assets/smart-attorney-figma/stock";
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
		const viewFile = () => navigate(`/case/${folderId}`);
		// once case edit modal is created, can scrap this awful switch case tree
		// and remove all instances of "enable-nav"
		switch (id) {
			case folderId:
				return viewFile();
			case "enable-nav":
				return viewFile();
			default:
				return;
		}
	};

	return (
		<CardGrid>
			{caseFolders?.map((caseFolder) => {
				return (
					// Card Container
					<div
						className="w-[272px] h-[256px] py-4 px-4 bg-white cursor-pointer rounded-2xl"
						key={caseFolder.id}
						id={caseFolder.id}
						onClick={(event) => handleViewCaseFolder(event, caseFolder.id)}
					>
						{/* Kebab Menu */}
						<div id="kebab-menu" className="relative left-[226px] bottom-1 max-w-fit z-10">
							<KebabMenu
								addDeadline={(event) => {
									event.stopPropagation(), handleUpdateFolderDeadline(caseFolder.id, event);
								}}
								addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
								deleteFolder={() => handleDeleteFolder(caseFolder.id)}
							/>
						</div>

						{/* Card Contents */}
						<div id="enable-nav" className="relative flex flex-col justify-between w-full h-full bottom-7">
							{/* Contains the labels, deadline, name */}
							<div id="enable-nav" className="flex flex-col w-56 h-[72px] justify-between">
								{/* Contains the deadline, labels */}
								<div id="enable-nav" className="flex flex-row flex-wrap gap-x-2 gap-y-1">
									{/* Case Deadline */}
									{caseFolder.deadline !== 0 && (
										<div id="enable-nav" className="min-w-max bg-[#FB3E3E80] rounded-full px-2.5 py-1">
											<p id="enable-nav" className="text-xs">
												Deadline: {formatForCardDisplay(caseFolder.deadline)}
											</p>
											{/* TODO: what is the case folder status for */}
										</div>
									)}

									{/* Case Folder Labels */}
									{caseFolder.labels.map((label) => (
										<div key={label.id} id={label.id}>
											<p
												className="min-w-max text-xs px-2.5 py-1 text-black bg-[#FFCC67] rounded-full cursor-pointer"
												id={caseFolder.id}
												onClick={handleDeleteFolderLabel}
											>
												{label.name}
											</p>
										</div>
									))}
								</div>

								{/* Case Folder Name */}
								<p id="enable-nav" className="text-sm cursor-pointer w-fit hover:text-blue-500">
									{caseFolder.name}
								</p>
							</div>

							{/* Document Image */}
							<div id="enable-nav" className="w-60 h-[100px] rounded-lg">
								<img id="enable-nav" src={FileSnapshot} />
							</div>

							{/* Comments, files, assigned to */}
							<div id="enable-nav" className="flex flex-row items-center justify-between h-6 w-60">
								<div id="enable-nav" className="flex flex-row gap-3">
									<div id="enable-nav" className="flex flex-row items-center justify-center gap-1">
										<img id="enable-nav" className="h-[14px] w-[14px]" src={MessageSquare} />
										<p id="enable-nav" className="text-[#5A5A5A] text-xs">
											12
										</p>
									</div>
									<div id="enable-nav" className="flex flex-row items-center justify-center gap-0.5">
										<img id="enable-nav" className="h-[14px] w-[14px]" src={Paperclip} />
										<p id="enable-nav" className="text-[#5A5A5A] text-xs">
											4
										</p>
									</div>
								</div>

								<p id="enable-nav" className="text-xs text-[#5A5A5A] mr-11">
									Assigned to
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</CardGrid>
	);
}

export default CaseFolderCards;
