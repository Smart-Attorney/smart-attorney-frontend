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
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
import { deleteCaseFileById } from "./api/delete-case-file";
import { updateDeadline } from "./api/update-case-file-deadline";
import { updateCaseFileName } from "./api/update-case-file-name";
import { updateCaseFileStatus } from "./api/update-case-file-status";
import * as pdfjs from "pdfjs-dist";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import translateDoc from "../translateDocuments/translateDocuments";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
=======
import { deleteDocument } from "./api/delete-document";
import { updateDocumentDeadline, UpdateDocumentDeadlineDTO } from "./api/update-document-deadline";
import { updateDocumentName, UpdateDocumentNameDTO } from "./api/update-document-name";
import { updateDocumentStatus, UpdateDocumentStatusDTO } from "./api/update-document-status";
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx

interface DocumentCardsProps {
	documents: Document[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateDocuments: (newDocuments: Document[]) => void;
}

<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
function CaseFileCards({
	files,
	onClick,
	updateCaseFiles,
}: CaseFileCardsProps) {
	const { id: folderId } = useParams();
	const [translatedDocUrl, setTranslatedDocUrl] = useState<null | string>(null);

	/************************************************************/

	const replaceDocumentInArray = (
		updatedDocument: CaseFileObj,
		currentDocumentArr: CaseFileObj[]
	): CaseFileObj[] => {
		const updatedDocumentArr: CaseFileObj[] = [...currentDocumentArr];
=======
function DocumentCards({ documents, onClick, updateDocuments }: DocumentCardsProps) {
	const { id: caseId } = useParams();

	/************************************************************/

	const replaceDocumentInArray = (updatedDocument: Document, currentDocumentArr: Document[]): Document[] => {
		const updatedDocumentArr: Document[] = [...currentDocumentArr];
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
		for (let i = 0, n = updatedDocumentArr.length; i < n; i++) {
			if (updatedDocument.id === updatedDocumentArr[i].id) {
				updatedDocumentArr[i] = updatedDocument;
				break;
			}
		}
		return updatedDocumentArr;
	};

<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
	const removeDocumentFromArray = (
		deletedDocument: CaseFileObj,
		currentDocumentArr: CaseFileObj[]
	): CaseFileObj[] => {
		const updatedDocumentArr: CaseFileObj[] = [];
=======
	const removeDocumentFromArray = (deletedDocument: Document, currentDocumentArr: Document[]): Document[] => {
		const updatedDocumentArr: Document[] = [];
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
		for (let i = 0, n = currentDocumentArr.length; i < n; i++) {
			if (deletedDocument.id !== currentDocumentArr[i].id) {
				updatedDocumentArr.push(currentDocumentArr[i]);
			}
		}
		return updatedDocumentArr;
	};

	/************************************************************/

	// curried function
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
	const handleUpdateFileStatus =
		(fileId: string) => async (newFileStatus: DocStatus) => {
			try {
				const response = await updateCaseFileStatus(
					folderId!,
					fileId,
					newFileStatus
				);
				if (response.ok) {
					const updatedDocument: CaseFileObj = await response.json();
					const updatedDocumentArray = replaceDocumentInArray(
						updatedDocument,
						files!
					);
					updateCaseFiles(updatedDocumentArray);
				}
			} catch (error) {
				alert(error);
=======
	const handleUpdateDocumentStatus = (documentId: string) => async (newDocumentStatus: DocStatus) => {
		const data: UpdateDocumentStatusDTO = { id: documentId, status: newDocumentStatus };
		try {
			const response = await updateDocumentStatus(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
			}
		};

	// curried function
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
	const handleUpdateFileName =
		(fileId: string) => async (newFileName: string) => {
			try {
				const response = await updateCaseFileName(
					folderId!,
					fileId,
					newFileName
				);
				if (response.ok) {
					const updatedDocument: CaseFileObj = await response.json();
					const updatedDocumentArray = replaceDocumentInArray(
						updatedDocument,
						files!
					);
					updateCaseFiles(updatedDocumentArray);
				}
			} catch (error) {
				alert(error);
=======
	const handleUpdateDocumentName = (documentId: string) => async (newDocumentName: string) => {
		const data: UpdateDocumentNameDTO = { id: documentId, name: newDocumentName };
		try {
			const response = await updateDocumentName(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
			}
		};

<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
	const handleSetFileDeadline = async (
		fileId: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
=======
	const handleUpdateDocumentDeadline = async (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
		const { value } = event.target;
		const deadlineUnixMilliseconds = Date.parse(value);
		const data: UpdateDocumentDeadlineDTO = { id: documentId, deadline: deadlineUnixMilliseconds };
		try {
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
			const response = await updateDeadline(
				folderId!,
				fileId,
				deadlineInUnixTime
			);
			if (response.ok) {
				const updatedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(
					updatedDocument,
					files!
				);
				updateCaseFiles(updatedDocumentArray);
=======
			const response = await updateDocumentDeadline(caseId!, documentId, data);
			if (response.ok) {
				const updatedDocument: Document = await response.json();
				const updatedDocumentArray = replaceDocumentInArray(updatedDocument, documents!);
				updateDocuments(updatedDocumentArray);
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteDocument = async (documentId: string) => {
		try {
			const response = await deleteDocument(caseId!, documentId);
			if (response.ok) {
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
				const deletedDocument: CaseFileObj = await response.json();
				const updatedDocumentArray = removeDocumentFromArray(
					deletedDocument,
					files!
				);
				updateCaseFiles(updatedDocumentArray);
=======
				const deletedDocument: Document = await response.json();
				const updatedDocumentArray = removeDocumentFromArray(deletedDocument, documents!);
				updateDocuments(updatedDocumentArray);
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleTranslate = (fileName: string) => {
		translateDoc(fileName)
			.then((res) => {
				setTranslatedDocUrl(res.translatedDocUrl);
			})
			.catch((err) => {
				window.alert("Failed to Translate Files");
				console.log(err);
			});
	};

	const downloadTranslatedFile = (url: string) => {
		window.location.href = url;
		window.open(url);
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
<<<<<<< HEAD:src/features/case-folder/CaseFileCards.tsx
								updateFileStatus={handleUpdateFileStatus(file.id)}
								updateFileName={handleUpdateFileName(file.id)}
								setDeadline={(event) => handleSetFileDeadline(file.id, event)}
								deleteFile={() => handleDeleteFile(file.id)}
								translateFile={() => handleTranslate(file.name)}
=======
								updateFileStatus={handleUpdateDocumentStatus(file.id)}
								updateFileName={handleUpdateDocumentName(file.id)}
								setDeadline={(event) => handleUpdateDocumentDeadline(file.id, event)}
								deleteFile={() => handleDeleteDocument(file.id)}
>>>>>>> f556b09414fa1cf00d3c8e8febde87da69d39279:src/features/case-folder/DocumentCards.tsx
							/>
						</KebabMenuContainer>

						<CardBody>
							<CardHeaderContainer>
								<PillLabelContainer>
									<DocumentStatus text={file.status} />
									<CardDeadline deadline={file.deadline} />
								</PillLabelContainer>

								<CardName id={file.id} name={file.name} viewFile={onClick} />
								{translatedDocUrl && (
									<CardName
										name="Download English Version"
										viewFile={() => downloadTranslatedFile(translatedDocUrl)}
									/>
								)}
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
