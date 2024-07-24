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
import { DocumentStatus as DocStatus, Document } from "../../types/api";
import KebabMenu from "./KebabMenu";
import { deleteDocument } from "./api/delete-document";
import { updateDocumentDeadline, UpdateDocumentDeadlineDTO } from "./api/update-document-deadline";
import { updateDocumentName, UpdateDocumentNameDTO } from "./api/update-document-name";
import { updateDocumentStatus, UpdateDocumentStatusDTO } from "./api/update-document-status";

interface DocumentCardsProps {
	documents: Document[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateDocuments: (newDocuments: Document[]) => void;
}

function DocumentCards({ documents, onClick, updateDocuments }: DocumentCardsProps) {
	const { id: caseId } = useParams();

	/************************************************************/

	const replaceDocumentInArray = (updatedDocument: Document, currentDocumentArr: Document[]): Document[] => {
		const updatedDocumentArr: Document[] = [...currentDocumentArr];
		for (let i = 0, n = updatedDocumentArr.length; i < n; i++) {
			if (updatedDocument.id === updatedDocumentArr[i].id) {
				updatedDocumentArr[i] = updatedDocument;
				break;
			}
		}
		return updatedDocumentArr;
	};

	const removeDocumentFromArray = (deletedDocument: Document, currentDocumentArr: Document[]): Document[] => {
		const updatedDocumentArr: Document[] = [];
		for (let i = 0, n = currentDocumentArr.length; i < n; i++) {
			if (deletedDocument.id !== currentDocumentArr[i].id) {
				updatedDocumentArr.push(currentDocumentArr[i]);
			}
		}
		return updatedDocumentArr;
	};

	/************************************************************/

	// curried function
	const handleUpdateDocumentStatus = (documentId: string) => async (newDocumentStatus: DocStatus) => {
		const data: UpdateDocumentStatusDTO = { id: documentId, status: newDocumentStatus };
		try {
			const response = await updateDocumentStatus(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	// curried function
	const handleUpdateDocumentName = (documentId: string) => async (newDocumentName: string) => {
		const data: UpdateDocumentNameDTO = { id: documentId, name: newDocumentName };
		try {
			const response = await updateDocumentName(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleUpdateDocumentDeadline = async (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const deadlineUnixMilliseconds = Date.parse(value);
		const data: UpdateDocumentDeadlineDTO = { id: documentId, deadline: deadlineUnixMilliseconds };
		try {
			const response = await updateDocumentDeadline(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteDocument = async (documentId: string) => {
		try {
			const response = await deleteDocument(caseId!, documentId);
			if (response.ok) {
				const deletedDocument: Document = await response.json();
				const updatedDocumentArray = removeDocumentFromArray(deletedDocument, documents!);
				updateDocuments(updatedDocumentArray);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	return (
		<CardGrid>
			{documents?.map((file) => {
				return (
					<CardContainer key={file.id} id={file.id}>
						{/* Kebab Menu */}
						<KebabMenuContainer>
							<KebabMenu
								fileName={file.name}
								updateFileStatus={handleUpdateDocumentStatus(file.id)}
								updateFileName={handleUpdateDocumentName(file.id)}
								setDeadline={(event) => handleUpdateDocumentDeadline(file.id, event)}
								deleteFile={() => handleDeleteDocument(file.id)}
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

export default DocumentCards;
