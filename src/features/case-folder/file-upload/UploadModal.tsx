import { useState } from "react";
import ModalButton from "../../../components/Buttons/ModalButton";
import ModalSpecialButton from "../../../components/Buttons/ModalSpecialButton";
import Firebase from "../../../services/cloud-storage/firebase";
import nanoid from "../../../services/nanoid";
import { CaseFileObj, UploadedFileObj } from "../../../utils/types";
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

	return (
		<div
			id="modal-backdrop"
			className="bg-[#00000040] h-screen top-0 right-0 justify-center left-[78px] flex items-center absolute backdrop-blur-[2px]"
			onClick={(event) => handleClickModalBackdrop(event)}
		>
			<div
				id="modal-container"
				className="border border-[#9C9DA4] rounded-[32px] py-14 h-fit w-[768px] bg-gradient-custom flex items-center justify-center"
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
					<div className="flex flex-row w-full gap-7">
						<ModalButton
							name="Upload"
							onClick={handleUploadFiles}
							disabled={filesForUpload.length < 1 ? true : false}
							style={{ cursor: filesForUpload.length < 1 ? "not-allowed" : "pointer" }}
						/>
						<ModalSpecialButton
							name="Translate"
							// onClick={}
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
