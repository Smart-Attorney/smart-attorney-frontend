import { useState } from "react";
import ModalButton from "../../../components/Buttons/ModalButton";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { ShortUuid } from "../../../lib/short-uuid";
import { Document, ResponseBody } from "../../../types/api";
import { UploadFile } from "../../../types/file";
import { createDocuments, CreateDocumentsDTO } from "../api/create-documents";
import DropZone from "./modal-components/DropZone";
import Header from "./modal-components/Header";
import UploadedFileCards from "./modal-components/UploadedFileCards";

interface UploadModalProps {
	caseId: string;
	closeUploadModal: () => void;
	addNewDocumentToArray: (newDocument: Document) => void;
}

function UploadModal({ caseId, closeUploadModal, addNewDocumentToArray }: UploadModalProps) {
	const uuid = new ShortUuid();

	const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
	const [isUploadDone, setIsUploadDone] = useState(false);

	const handleUploadFiles = async (): Promise<void> => {
		if (uploadFiles === null) return;
		if (uploadFiles.length < 1) return;
		const filesData: CreateDocumentsDTO = new FormData();
		for (let i = 0, n = uploadFiles.length; i < n; i++) {
			filesData.append("files[]", uploadFiles[i].data, `${uploadFiles[i].data.name}`);
		}
		try {
			const response = await createDocuments(caseId, filesData);
			const body: ResponseBody<Document[]> = await response.json();
			if (response.ok) {
				const createdDocuments: Document[] = body.data;
				for (let i = 0, n = createdDocuments.length; i < n; i++) {
					addNewDocumentToArray(createdDocuments[i]);
				}
				setIsUploadDone(true);
			} else {
				alert(body.message);
			}
		} catch (error) {
			alert(error);
		} finally {
			setIsUploadDone(false);
			closeUploadModal();
		}
	};

	const addToUploadFilesArray = (files: FileList): void => {
		for (let i = 0, n = files.length; i < n; i++) {
			setUploadFiles((prev) => [
				...prev,
				{
					id: uuid.newShort(),
					data: files[i],
				},
			]);
		}
	};

	const handleRemoveFileFromUploadStaging = (id: string): void =>
		setUploadFiles((prev) => prev.filter((file) => file.id !== id));

	const handleCloseUploadModal = (): void => {
		closeUploadModal();
	};

	return (
		<ModalDialog className="w-[768px]" closeModal={handleCloseUploadModal} enableBackdropClose={true}>
			<div id="modal-body" className="flex flex-col items-center justify-center gap-8 h-fit w-[624px] pb-4">
				<Header />

				<DropZone uploadFiles={uploadFiles} addToUploadFilesArray={addToUploadFilesArray} />

				{uploadFiles.length > 0 && (
					<UploadedFileCards
						filesToUpload={uploadFiles}
						handleRemoveFileFromStaging={handleRemoveFileFromUploadStaging}
					/>
				)}

				{/* Upload and Translate Buttons */}
				<div className="flex flex-row w-full gap-7">
					<ModalButton
						name="Upload"
						type="button"
						className="border-[5px] h-[68px]"
						onClick={handleUploadFiles}
						isDisabled={uploadFiles.length < 1 ? true : false}
						style={{ cursor: uploadFiles.length < 1 ? "not-allowed" : "pointer" }}
					/>
					<ModalSpecialButton
						name="Translate"
						type="button"
						className="h-[68px]"
						// onClick={}
					/>
				</div>

				{isUploadDone && (
					<p className="text-xl font-semibold text-green-600">Selected files have been successfully uploaded!</p>
				)}
			</div>
		</ModalDialog>
	);
}

export default UploadModal;
