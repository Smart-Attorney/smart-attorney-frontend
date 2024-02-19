import { useState } from "react";
import ModalButton from "../../../components/Buttons/ModalButton";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { Firebase } from "../../../services/cloud-storage/firebase";
import nanoid from "../../../services/nanoid";
import { CaseFileObj, FileForUploadObj } from "../../../utils/types";
import DropZone from "./modal-components/DropZone";
import Header from "./modal-components/Header";
import UploadedFileCards from "./modal-components/UploadedFileCards";

interface UploadModalProps {
	caseFolderId: string;
	closeUploadModal: () => void;
	addUploadedFileToCaseFileArray: (uploadedFile: CaseFileObj) => void;
	updateCaseFolder: () => void;
}

function UploadModal(props: UploadModalProps) {
	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);
	const [uploadDone, setUploadDone] = useState(false);

	/*TODO
    Break up this function. Currently does too much.
  */
	const handleUploadFiles = async (): Promise<void> => {
		if (filesForUpload === null) return;
		if (filesForUpload.length < 1) return;

		for (let i = 0; i < filesForUpload.length; i++) {
			const uploadedFileUrl = await Firebase.uploadFile(
				"",
				props.caseFolderId,
				filesForUpload[i].id,
				filesForUpload[i].data
			);

			const uploadedFileObject: CaseFileObj = {
				id: filesForUpload[i].id,
				name: filesForUpload[i].data.name,
				createdDate: Date.now(),
				lastOpenedDate: Date.now(),
				status: "Submitted",
				url: uploadedFileUrl ? uploadedFileUrl : "",
			};
			props.addUploadedFileToCaseFileArray(uploadedFileObject);
		}
		setUploadDone(true);
	};

	const addFilesToUploadArray = (files: FileList): void => {
		for (let i = 0; i < files.length; i++) {
			setFilesForUpload((prev) => [
				...prev,
				{
					id: nanoid(),
					data: files[i],
					selected: false,
				},
			]);
		}
	};

	const handleRemoveFileFromUploadStaging = (id: string): void =>
		setFilesForUpload((prev) => prev.filter((file) => file.id !== id));

	const handleCloseUploadModal = (): void => {
		/*
      'props.updateCaseFolder()' does not work when placed at the end of 
      'handleUploadSelectedFiles'. But oddly works when placed here.
    */
		props.updateCaseFolder();
		setUploadDone(false);
		props.closeUploadModal();
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
						disabled={filesForUpload.length < 1 ? true : false}
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
