import { useParams } from "react-router-dom";
import CardBody from "../../components/Card/CardBody";
import CardContainer from "../../components/Card/CardContainer";
import CardDeadline from "../../components/Card/CardDeadline";
import CardFooter from "../../components/Card/CardFooter";
import CardHeaderContainer from "../../components/Card/CardHeaderContainer";
import CardImage from "../../components/Card/CardImage";
import CardName from "../../components/Card/CardName";
import DocumentStatus from "../../components/Card/DocumentStatus";
import KebabMenuContainer from "../../components/Card/KebabMenuContainer";
import PillLabelContainer from "../../components/Card/PillLabelContainer";
import CardGrid from "../../layouts/CardGrid";
import { CaseFileObj, DocumentStatus as DocStatus } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { deleteCaseFileById } from "./api/delete-case-file";
import { updateDeadline } from "./api/update-case-file-deadline";
import { updateCaseFileName } from "./api/update-case-file-name";
import { updateCaseFileStatus } from "./api/update-case-file-status";

interface CaseFileCardsProps {
	files: CaseFileObj[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateCaseFiles: (newCaseFileArray: CaseFileObj[]) => void;
}

function CaseFileCards({ files, onClick, updateCaseFiles }: CaseFileCardsProps) {
	const { id: folderId } = useParams();

	/************************************************************/

	const replaceDocumentInArray = (updatedDocument: CaseFileObj, currentDocumentArr: CaseFileObj[]): CaseFileObj[] => {
		const updatedDocumentArr: CaseFileObj[] = [...currentDocumentArr];
		for (let i = 0, n = updatedDocumentArr.length; i < n; i++) {
			if (updatedDocument.id === updatedDocumentArr[i].id) {
				updatedDocumentArr[i] = updatedDocument;
				break;
			}
		}
		return updatedDocumentArr;
	};

	const removeDocumentFromArray = (deletedDocument: CaseFileObj, currentDocumentArr: CaseFileObj[]): CaseFileObj[] => {
		const updatedDocumentArr: CaseFileObj[] = [];
		for (let i = 0, n = currentDocumentArr.length; i < n; i++) {
			if (deletedDocument.id !== currentDocumentArr[i].id) {
				updatedDocumentArr.push(currentDocumentArr[i]);
			}
		}
		return updatedDocumentArr;
	};

	/************************************************************/

	// curried function
	const handleUpdateFileStatus = (fileId: string) => async (newFileStatus: DocStatus) => {
		try {
			const response = await updateCaseFileStatus(folderId!, fileId, newFileStatus);
			if (response.ok) {
				const updatedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, files!);
				updateCaseFiles(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	// curried function
	const handleUpdateFileName = (fileId: string) => async (newFileName: string) => {
		try {
			const response = await updateCaseFileName(folderId!, fileId, newFileName);
			if (response.ok) {
				const updatedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, files!);
				updateCaseFiles(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleSetFileDeadline = async (fileId: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const deadlineInUnixTime = Date.parse(value);
		try {
			const response = await updateDeadline(folderId!, fileId, deadlineInUnixTime);
			if (response.ok) {
				const updatedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, files!);
				updateCaseFiles(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteFile = async (fileId: string) => {
		try {
			const response = await deleteCaseFileById(folderId!, fileId);
			if (response.ok) {
				const deletedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = removeDocumentFromArray(deletedDocument, files!);
				updateCaseFiles(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	return (
		<CardGrid>
			{files?.map((file) => {
				return (
					<CardContainer key={file.id} id={file.id}>
						{/* Kebab Menu */}
						<KebabMenuContainer>
							<KebabMenu
								fileName={file.name}
								updateFileStatus={handleUpdateFileStatus(file.id)}
								updateFileName={handleUpdateFileName(file.id)}
								setDeadline={(event) => handleSetFileDeadline(file.id, event)}
								deleteFile={() => handleDeleteFile(file.id)}
							/>
						</KebabMenuContainer>

						<CardBody>
							<CardHeaderContainer>
								<PillLabelContainer>
									<DocumentStatus text={file.status} />
									<CardDeadline deadline={file.deadline} />
								</PillLabelContainer>

								<CardName id={file.id} name={file.name} viewFile={onClick} />
							</CardHeaderContainer>

							<CardImage imgSrc={""} id={file.id} viewFile={onClick} />

							<CardFooter hasFooter={false} />
						</CardBody>
					</CardContainer>
				);
			})}
		</CardGrid>
	);
}

export default CaseFileCards;
