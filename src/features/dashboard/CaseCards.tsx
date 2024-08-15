import { useNavigate } from "react-router-dom";
import { FileSnapshot } from "../../assets/smart-attorney-figma/stock";
import CardBody from "../../components/Card/CardBody";
import CardContainer from "../../components/Card/CardContainer";
import CardDeadline from "../../components/Card/CardDeadline";
import CardFooter from "../../components/Card/CardFooter";
import CardHeaderContainer from "../../components/Card/CardHeaderContainer";
import CardImage from "../../components/Card/CardImage";
import CardLabels from "../../components/Card/CardLabels";
import CardName from "../../components/Card/CardName";
import KebabMenuContainer from "../../components/Card/KebabMenuContainer";
import PillLabelContainer from "../../components/Card/PillLabelContainer";
import CardGrid from "../../layouts/CardGrid";
import type { Case } from "../../types/api";
import KebabMenu from "./KebabMenu";
import { createCaseLabel, CreateCaseLabelDTO } from "./api/create-case-label";
import { deleteAllCaseLabelsByCaseId } from "./api/delete-all-case-labels";
import { deleteAllClientsByCaseId } from "./api/delete-all-clients";
import { deleteAllDocumentsByCaseId } from "./api/delete-all-documents";
import { deleteCaseById } from "./api/delete-case";
import { deleteCaseLabel } from "./api/delete-case-label";
import { getCase } from "./api/get-case";
import { updateCaseIsOpen, UpdateCaseIsOpenDTO } from "./api/update-case-is-open";

interface CaseCardProps {
	caseFolders: Case[] | null;
	setCaseFolders: React.Dispatch<React.SetStateAction<Case[] | null>>;
}

function CaseCards({ caseFolders, setCaseFolders }: CaseCardProps) {
	const navigate = useNavigate();

	/************************************************************/

	const replaceCaseInArray = (updatedCase: Case, currentCaseArr: Case[]): Case[] => {
		const updatedCaseArr: Case[] = [...currentCaseArr];
		for (let i = 0, n = updatedCaseArr.length; i < n; i++) {
			if (updatedCase.id === updatedCaseArr[i].id) {
				updatedCaseArr[i] = updatedCase;
				break;
			}
		}
		return updatedCaseArr;
	};

	const removeCaseFromArray = (deletedCase: Case, currentCaseArr: Case[]): Case[] => {
		const updatedCaseArr: Case[] = [];
		for (let i = 0, n = currentCaseArr.length; i < n; i++) {
			if (deletedCase.id !== currentCaseArr[i].id) {
				updatedCaseArr.push(currentCaseArr[i]);
			}
		}
		return updatedCaseArr;
	};

	/************************************************************/

	const handleGetUpdatedCase = async (caseId: string): Promise<Case | null> => {
		try {
			const response = await getCase(caseId);
			if (response.ok) {
				const updatedCase: Case = await response.json();
				return updatedCase;
			}
		} catch (error) {
			alert(error);
		}
		return null;
	};

	const handleUpdateCaseIsOpen = async (caseId: string, isOpen: boolean): Promise<void> => {
		// changes previously stored string or number values into correct boolean type
		let newIsOpen: boolean;
		if (typeof isOpen != "boolean") {
			newIsOpen = true;
		} else {
			newIsOpen = isOpen;
		}
		const data: UpdateCaseIsOpenDTO = {
			id: caseId,
			isOpen: newIsOpen,
		};
		try {
			const response = await updateCaseIsOpen(caseId, data);
			if (response.ok) {
				const updatedCase: Case = await response.json();
				const updatedCaseArray = replaceCaseInArray(updatedCase, caseFolders!);
				setCaseFolders(updatedCaseArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleAddCaseLabel = async (caseId: string, event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const { value: newLabel } = (event.target as HTMLFormElement)[0] as HTMLInputElement;
		// checks for empty inputs and null errors
		if (newLabel.trim() === "" || newLabel === null) {
			// clears input field on invalid input
			((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
			return;
		}
		const data: CreateCaseLabelDTO = {
			name: newLabel,
		};
		try {
			const response = await createCaseLabel(caseId, data);
			if (response.ok) {
				const updatedCase = await handleGetUpdatedCase(caseId);
				if (updatedCase) {
					const updatedCaseArray = replaceCaseInArray(updatedCase, caseFolders!);
					setCaseFolders(updatedCaseArray);
				}
			}
		} catch (error) {
			alert(error);
		} finally {
			// clears input field after user clicks add
			((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
		}
	};

	const handleDeleteCaseLabel = async (
		caseId: string,
		event: React.MouseEvent<HTMLParagraphElement>
	): Promise<void> => {
		const { id: labelId } = event.target as HTMLParagraphElement;
		try {
			const response = await deleteCaseLabel(caseId, labelId);
			if (response.ok) {
				const updatedCase = await handleGetUpdatedCase(caseId);
				if (updatedCase) {
					const updatedCaseArray = replaceCaseInArray(updatedCase, caseFolders!);
					setCaseFolders(updatedCaseArray);
				}
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const deleteAllCaseLabels = async (caseId: string): Promise<boolean> => {
		try {
			const response = await deleteAllCaseLabelsByCaseId(caseId);
			if (response.ok) return true;
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const deleteAllClients = async (caseId: string): Promise<boolean> => {
		try {
			const response = await deleteAllClientsByCaseId(caseId);
			if (response.ok) return true;
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const deleteAllDocuments = async (caseId: string): Promise<boolean> => {
		try {
			const response = await deleteAllDocumentsByCaseId(caseId);
			if (response.ok) return true;
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const deleteCase = async (caseId: string): Promise<Case | null> => {
		let deletedCase: Case | null = null;
		try {
			const response = await deleteCaseById(caseId);
			if (response.ok) {
				deletedCase = await response.json();
			}
		} catch (error) {
			alert(error);
		}
		return deletedCase;
	};

	const handleDeleteCase = async (caseId: string): Promise<void> => {
		let deletedCase: Case | null = null;
		try {
			const areCaseLabelsDeleted = await deleteAllCaseLabels(caseId);
			const areClientsDeleted = await deleteAllClients(caseId);
			const areDocumentsDeleted = await deleteAllDocuments(caseId);
			if (areCaseLabelsDeleted && areClientsDeleted && areDocumentsDeleted) {
				deletedCase = await deleteCase(caseId);
			}
			if (deletedCase !== null) {
				const updatedCaseArray = removeCaseFromArray(deletedCase, caseFolders!);
				setCaseFolders(updatedCaseArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	// to identify which parts of the card allows navigation when clicked
	const navigationString = "allow-nav";
	const handleViewCaseFolder = (event: React.MouseEvent<HTMLDivElement>, folderId: string) => {
		const { ariaLabel } = event.target as HTMLElement;
		const viewFile = () => navigate(`/case/${folderId}`);
		switch (ariaLabel) {
			case folderId:
				return viewFile();
			case navigationString:
				return viewFile();
			default:
				return;
		}
	};

	/************************************************************/

	return (
		<CardGrid>
			{caseFolders?.map((caseFolder) => {
				return (
					<CardContainer
						className="cursor-pointer"
						key={caseFolder.id}
						id={caseFolder.id}
						navLabel={navigationString}
						onClick={(event) => handleViewCaseFolder(event!, caseFolder.id)}
					>
						<KebabMenuContainer>
							<KebabMenu
								id="kebab-menu"
								updateStatus={() => handleUpdateCaseIsOpen(caseFolder.id, caseFolder.isOpen)}
								addLabel={(event) => handleAddCaseLabel(caseFolder.id, event)}
								deleteFolder={() => handleDeleteCase(caseFolder.id)}
							/>
						</KebabMenuContainer>

						<CardBody navLabel={navigationString}>
							<CardHeaderContainer navLabel={navigationString}>
								<PillLabelContainer navLabel={navigationString} className="ml-6">
									<CardDeadline navLabel={navigationString} deadline={caseFolder.urgentDocumentDeadline} />
									<CardLabels
										navLabel={navigationString}
										labels={caseFolder.labels}
										deleteLabel={(event) => handleDeleteCaseLabel(caseFolder.id, event)}
									/>
								</PillLabelContainer>
								<CardName navLabel={navigationString} name={caseFolder.name} />
							</CardHeaderContainer>

							<CardImage navLabel={navigationString} imgSrc={FileSnapshot} />

							{/* Comment count, File count, Assigned to whom*/}
							<CardFooter navLabel={navigationString} hasFooter={true} />
						</CardBody>

						{/* Folder Status Dot Indicator */}
						<div
							className="relative left-0 bottom-[246px] w-3 h-3 rounded-full"
							style={{ background: caseFolder.isOpen ? "#53EF0A" : "#9C9DA4" }}
						>
							<p className="text-xs text-center"></p>
						</div>
					</CardContainer>
				);
			})}
		</CardGrid>
	);
}

export default CaseCards;
