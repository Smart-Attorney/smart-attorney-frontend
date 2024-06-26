import { useState } from "react";
import ModalButton from "../../../components/Buttons/ModalButton";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { nanoid } from "../../../lib/nanoid";
import { CaseFileObj, FileForUploadObj } from "../../../utils/types";
import { createCaseFiles } from "../api/create-case-files";
import DropZone from "./modal-components/DropZone";
import Header from "./modal-components/Header";
import UploadedFileCards from "./modal-components/UploadedFileCards";

interface UploadModalProps {
	caseFolderId: string;
	closeUploadModal: () => void;
	addUploadedFileToCaseFileArray: (uploadedFile: CaseFileObj) => void;
}

function UploadModal({ caseFolderId, closeUploadModal, addUploadedFileToCaseFileArray }: UploadModalProps) {
	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);
	const [uploadDone, setUploadDone] = useState(false);

	const handleUploadFiles = async (): Promise<void> => {
		if (filesForUpload === null) return;
		if (filesForUpload.length < 1) return;

		const filesFormData = new FormData();
		filesFormData.append("caseFolderId", caseFolderId);
		for (let i = 0, n = filesForUpload.length; i < n; i++) {
			filesFormData.append("files[]", filesForUpload[i].data, `${filesForUpload[i].id}/${filesForUpload[i].data.name}`);
		}

		try {
			const response = await createCaseFiles(caseFolderId, filesFormData);
			if (response.ok) {
				const createdCaseFiles: CaseFileObj[] = await response.json();
				for (let i = 0, n = createdCaseFiles.length; i < n; i++) {
					addUploadedFileToCaseFileArray(createdCaseFiles[i]);
				}
				setUploadDone(true);
			}
		} catch (error) {
			alert(error);
		} finally {
			setUploadDone(false);
			closeUploadModal();
		}
	};

	const addFilesToUploadArray = (files: FileList): void => {
		for (let i = 0, n = files.length; i < n; i++) {
			setFilesForUpload((prev) => [
				...prev,
				{
					id: nanoid(8),
					data: files[i],
				},
			]);
		}
	};

	const handleRemoveFileFromUploadStaging = (id: string): void =>
		setFilesForUpload((prev) => prev.filter((file) => file.id !== id));

	const handleCloseUploadModal = (): void => {
		closeUploadModal();
	};

	return (
		<ModalDialog className="w-[768px]" closeModal={handleCloseUploadModal} enableBackdropClose={true}>
			<div id="modal-body" className="flex flex-col items-center justify-center gap-8 h-fit w-[624px] pb-4">
				<Header />

				<DropZone filesToUpload={filesForUpload} addFilesToUploadArray={addFilesToUploadArray} />

				{filesForUpload.length > 0 && (
					<UploadedFileCards
						filesToUpload={filesForUpload}
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
						isDisabled={filesForUpload.length < 1 ? true : false}
						style={{ cursor: filesForUpload.length < 1 ? "not-allowed" : "pointer" }}
					/>
					<ModalSpecialButton
						name="Translate"
						type="button"
						className="h-[68px]"
						// onClick={}
					/>
				</div>

				{uploadDone && (
					<p className="text-xl font-semibold text-green-600">Selected files have been successfully uploaded!</p>
				)}
			</div>
		</ModalDialog>
	);
}

export default UploadModal;
