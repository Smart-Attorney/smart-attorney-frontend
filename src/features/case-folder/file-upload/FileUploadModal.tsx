import { useState } from "react";
import UploadLogo from "../../../assets/smart-attorney-figma/upload-white-icon.png";
import Firebase from "../../../services/cloud-storage/firebase";
import nanoid from "../../../services/nanoid";
import { CaseFileObj, UploadedFileObj } from "../../../utils/types";
import DropZone from "./DropZone";
import ModalUploadedFileCards from "./ModalUploadedFileCards";

interface FileUploadProps {
	caseFolderId: string;
	closeUploadModal: () => void;
	addUploadedFileToCaseFileArray: (uploadedFile: CaseFileObj) => void;
	updateCaseFolder: () => void;
}

function FileUploadModal(props: FileUploadProps) {
	const [filesForUpload, setFilesForUpload] = useState<UploadedFileObj[]>([]);
	const [isUploadDone, setIsUploadDone] = useState(false);

	/*TODO
    Break up this function. Currently does too much.
  */
	const handleUploadSelectedFiles = async (): Promise<void> => {
		if (filesForUpload === null) return;
		if (filesForUpload.length < 1) return;

		for (let i = 0; i < filesForUpload.length; i++) {
			if (filesForUpload[i].selected === true) {
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
		}
		setIsUploadDone(true);
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

	const handleSelectFile = (id: string): void =>
		setFilesForUpload((prev) =>
			prev.map((file) =>
				file.id === id
					? {
							...file,
							selected: !file.selected,
					  }
					: file
			)
		);

	const handleSelectAllFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { checked } = event.target;
		setFilesForUpload((prev) =>
			prev.map((file) => ({
				...file,
				selected: checked,
			}))
		);
	};

	const handleCloseUploadModal = (): void => {
		/* 
    'props.updateCaseFolder()' does not work when placed at the end of 
    'handleUploadSelectedFiles'. But oddly works when placed here.
    */
		props.updateCaseFolder();
		setIsUploadDone(false);
		props.closeUploadModal();
	};

	/* Separate modal into smaller components. */
	/* Add outline to modal. */
	return (
		<div
			id="modal-overlay"
			className="bg-[rgba(128,128,128,0.5)] left-0 w-full h-full absolute flex justify-center items-center"
		>
			<div
				id="modal"
				className="rounded-[32px] h-[536px] w-[768px] bg-gradient-custom flex items-center justify-center"
			>
				<div
					id="modal-contents"
					className="flex flex-col items-center justify-center gap-8 h-fit w-[624px] pb-4"
				>
					<div className="flex flex-col items-center gap-2">
						<div className="flex flex-row items-center gap-2">
							<span className="w-5 h-5">
								<img src={UploadLogo} />
							</span>
							<h1 className="text-xl font-semibold text-white">Upload Documentation</h1>
						</div>
						<p className="text-sm text-white">You have the option to translate files before upload.</p>
					</div>

					<DropZone filesToUpload={filesForUpload} addFilesToUploadArray={addFilesToUploadArray} />

					{/* Select All Checkbox */}
					{filesForUpload.length > 0 && (
						<div className="flex flex-row self-start justify-center gap-1 cursor-pointer">
							<input
								className="cursor-pointer"
								id="select-all"
								type="checkbox"
								onChange={handleSelectAllFiles}
							/>
							<label className="font-semibold cursor-pointer" htmlFor="select-all">
								Select all
							</label>
						</div>
					)}

					{filesForUpload.length > 0 && (
						<div className="grid grid-cols-3 gap-5">
							<ModalUploadedFileCards
								filesToUpload={filesForUpload}
								handleSelectFile={handleSelectFile}
								handleRemoveFileFromStaging={handleRemoveFileFromUploadStaging}
							/>
						</div>
					)}

					{/* Upload and Cancel Buttons */}
					<div className="flex flex-row justify-between w-full">
						<button
							className="custom-bg custom-border w-[296px] py-2  border border-[#B588B3] rounded-xl h-[72px]"
							type="button"
							onClick={handleUploadSelectedFiles}
							disabled={filesForUpload.length < 1 ? true : false}
							style={{ cursor: filesForUpload.length < 1 ? "not-allowed" : "pointer" }}
						>
							<span className="text-xl font-semibold text-white">Upload</span>
						</button>
						<button
							className="w-[296px] custom-bg-2 py-2 custom-border-2 rounded-xl h-[72px]"
							type="button"
							onClick={handleCloseUploadModal}
						>
							<span className="text-xl font-semibold text-white">Translate</span>
						</button>
					</div>

					{isUploadDone && (
						<p className="text-xl font-semibold text-green-600">
							Selected files have been successfully uploaded!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default FileUploadModal;
