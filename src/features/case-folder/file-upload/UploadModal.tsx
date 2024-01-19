import { useState } from "react";
import Firebase from "../../../services/cloud-storage/firebase";
import nanoid from "../../../services/nanoid";
import { CaseFileObj, UploadedFileObj } from "../../../utils/types";
import Button from "./modal-components/Button";
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
	const [filesForUpload, setFilesForUpload] = useState<UploadedFileObj[]>([]);
	const [uploadDone, setUploadDone] = useState(false);

	/*TODO
    Break up this function. Currently does too much.
  */
	const handleUploadFiles = async (): Promise<void> => {
		if (filesForUpload === null) return;
		if (filesForUpload.length < 1) return;

		for (let i = 0; i < filesForUpload.length; i++) {
			const uploadedFileRef = await Firebase.uploadFile(
				filesForUpload[i].data,
				filesForUpload[i].id,
				props.caseFolderId
			);
			const uploadedFileUrl = await Firebase.getFileByRef(uploadedFileRef);

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

	const handleClickModalBackdrop = (event: React.MouseEvent<HTMLDivElement>): void => {
		const { id } = event.target as HTMLDivElement;
		if (id === "modal-backdrop") {
			handleCloseUploadModal();
		}
	};

	/* Add outline to modal. */
	return (
		<div
			id="modal-backdrop"
			className="bg-[rgba(128,128,128,0.5)] left-0 w-full h-full absolute flex justify-center items-center"
			onClick={(event) => handleClickModalBackdrop(event)}
		>
			<div
				id="modal-container"
				className="rounded-[32px] py-14 h-fit w-[768px] bg-gradient-custom flex items-center justify-center"
			>
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
					<div className="flex flex-row justify-between w-full">
						<Button
							name="Upload"
							className="custom-bg custom-border"
							onClick={handleUploadFiles}
							disabled={filesForUpload.length < 1 ? true : false}
							style={{ cursor: filesForUpload.length < 1 ? "not-allowed" : "pointer" }}
						/>
						<Button
							name="Translate"
							className="custom-bg-2 custom-border-2"
							// onClick={} does not have a function yet
						/>
					</div>

					{uploadDone && (
						<p className="text-xl font-semibold text-green-600">
							Selected files have been successfully uploaded!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default UploadModal;
