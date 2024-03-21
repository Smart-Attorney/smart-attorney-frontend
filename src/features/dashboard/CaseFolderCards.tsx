import { useNavigate } from "react-router-dom";
import { FileSnapshot } from "../../assets/smart-attorney-figma/stock";
import CardBody from "../../components/Card/CardBody";
import CardContainer from "../../components/Card/CardContainer";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import CardImage from "../../components/Card/CardImage";
import KebabMenuContainer from "../../components/Card/KebabMenuContainer";
import CardGrid from "../../layouts/CardGrid";
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
					<CardContainer
						className="cursor-pointer"
						key={caseFolder.id}
						id={caseFolder.id}
						onClick={(event) => handleViewCaseFolder(event!, caseFolder.id)}
					>
						<KebabMenuContainer>
							<KebabMenu
								id="kebab-menu"
								addDeadline={(event) => {
									// commenting this out to see if it breaks anything
									// event.stopPropagation(),
									handleUpdateFolderDeadline(caseFolder.id, event);
								}}
								addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
								deleteFolder={() => handleDeleteFolder(caseFolder.id)}
							/>
						</KebabMenuContainer>

						<CardBody id="enable-nav">
							<CardHeader id="enable-nav" caseFolder={caseFolder} deleteLabel={handleDeleteFolderLabel} />

							<CardImage id="enable-nav" imgSrc={FileSnapshot} />

							{/* Comment count, File count, Assigned to whom*/}
							<CardFooter id="enable-nav" hasFooter={true} />
						</CardBody>
					</CardContainer>
				);
			})}
		</CardGrid>
	);
}

export default CaseFolderCards;
