import { useState } from "react";
import { nanoid } from "nanoid";
import DropZone from "./DropZone";
import ModalUploadedFileCards from "./ModalUploadedFileCards";
import Firebase from "../../services/cloud-storage/firebase";

interface FileUpload {
	id: string;
	data: File;
	selected: boolean;
}

interface UploadedFileObject {
	id: string;
	name: string;
	status: string;
	url: string;
}

interface FileUploadProps {
	closeUploadModal: () => void;
	updateUploadedFilesArray: (uploadedFile: UploadedFileObject) => void;
}

function FileUploadModal(props: FileUploadProps) {
	const [filesForUpload, setFilesForUpload] = useState<FileUpload[]>([]);
	const [isUploadDone, setIsUploadDone] = useState(false);
	// console.log(filesToUpload);

	const handleUploadSelectedFiles = async (): Promise<void> => {
		if (filesForUpload === null) return;
		if (filesForUpload.length < 1) return;

		for (let i = 0; i < filesForUpload.length; i++) {
			if (filesForUpload[i].selected === true) {
				const uploadedFileRef = await Firebase.uploadFileToCloud(filesForUpload[i].data, filesForUpload[i].id);
        const uploadedFileUrl = await Firebase.getFileByRef(uploadedFileRef);

				const uploadedFileObject = {
					id: filesForUpload[i].id,
					name: filesForUpload[i].data.name,
					status: "Submitted",
					url: uploadedFileUrl ? uploadedFileUrl : "",
				};

				props.updateUploadedFilesArray(uploadedFileObject);
			}
		}

		setIsUploadDone(true);
	};

	const addFilesToUploadArray = (files: FileList): void => {
		for (let i = 0; i < files.length; i++) {
			setFilesForUpload((prev) => [
				...prev,
				{
					id: nanoid(16),
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
		setIsUploadDone(false);
		props.closeUploadModal();
	};

	return (
		<div
			id="modal-overlay"
			className="bg-[rgba(128,128,128,0.5)] h-screen w-screen absolute flex justify-center items-center"
		>
			<div id="modal" className="p-5  rounded-lg bg-[#D9D9D9]">
				<div id="modal-contents" className="flex flex-col items-center gap-5">
					<h1 className="text-xl font-bold">Upload Documentation</h1>

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
							className="bg-[#B588B3] w-40 py-2 text-white font-semibold border border-[#B588B3] rounded-md"
							type="button"
							onClick={handleUploadSelectedFiles}
							disabled={filesForUpload.length < 1 ? true : false}
							style={{ cursor: filesForUpload.length < 1 ? "not-allowed" : "pointer" }}
						>
							Upload
						</button>
						<button
							className="w-40 bg-white py-2 font-semibold text-[#B588B3] border border-[#B588B3] rounded-md"
							type="button"
							onClick={handleCloseUploadModal}
						>
							Close
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
