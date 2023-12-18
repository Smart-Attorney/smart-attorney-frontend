import { useState } from "react";
import { nanoid } from "nanoid";
import DropArea from "./DropArea";
import UploadedFilesDisplay from "./UploadedFilesDisplay";
import storage from "../../services/firebase/firebase.ts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface FileUploadProps {
	closeUploadBox: () => void;
}

interface FileUpload {
	id: string;
	data: File;
	selected: boolean;
}

function FileUpload(props: FileUploadProps) {
	const [filesToUpload, setFilesToUpload] = useState<FileUpload[]>([]);
	const [isUploadDone, setIsUploadDone] = useState(false);
	console.log(filesToUpload);

	const getFileFromCloud = async () => {
		try {
			const fileRef = ref(storage, `images/${filesToUpload[0].data.name}`);
			const url = await getDownloadURL(fileRef);
			console.log(url);
		} catch (error) {
			console.log(error);
		}
	};

	const addFileToCloud = async (file: File, id: string) => {
		const splitFile = file.name.split(".");
		const fileExt = splitFile[splitFile.length - 1];

		const fileRef = ref(storage, `${fileExt}/${id}_${file.name}`);
		try {
			const response = await uploadBytes(fileRef, file);
			// const url = await getDownloadURL(response.ref);
			console.log(`Successfully uploaded: ${file.name}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleButtonClickUploadSelectedFiles = () => {
		if (filesToUpload === null) return;
		if (filesToUpload.length < 1) return;

		for (let i = 0; i < filesToUpload.length; i++) {
			if (filesToUpload[i].selected === true) {
				addFileToCloud(filesToUpload[i].data, filesToUpload[i].id);
			}
		}

		setIsUploadDone(true);
	};

	const addFilesToUploadArray = (files: FileList) => {
		for (let i = 0; i < files.length; i++) {
			setFilesToUpload((prev) => {
				return [
					...prev,
					{
						id: nanoid(),
						data: files[i],
						selected: false,
					},
				];
			});
		}
	};

	const handleClickRemoveFileFromUploadStaging = (id: string) => {
		setFilesToUpload((prev) =>
			prev.filter((file) => {
				return file.id !== id;
			})
		);
	};

	const handleClickToggleChecked = (id: string) => {
		handleChangeToggleChecked(id);
	};

	const handleChangeToggleChecked = (id: string) => {
		setFilesToUpload((prev) =>
			prev.map((file) => {
				return file.id === id
					? {
							...file,
							selected: !file.selected,
					  }
					: file;
			})
		);
	};

	const handleSelectAllToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;

		setFilesToUpload((prev) => {
			return prev.map((file) => {
				return {
					...file,
					selected: checked,
				};
			});
		});
	};

	const handleButtonClickCloseUpload = () => {
		setIsUploadDone(false);
		props.closeUploadBox();
	};

	return (
		<div className="p-5  rounded-lg bg-[#D9D9D9]">
			<div className="flex flex-col items-center gap-5">
				<h1 className="text-xl font-bold">Upload Documentation</h1>

				<DropArea filesToUpload={filesToUpload} addFilesToUploadArray={addFilesToUploadArray} />

				{/* Select All Checkbox */}
				{filesToUpload.length > 0 && (
					<div className="flex flex-row self-start justify-center gap-1 cursor-pointer">
						<input
							className="cursor-pointer"
							id="select-all"
							type="checkbox"
							onChange={handleSelectAllToggleChange}
						/>
						<label className="font-semibold cursor-pointer" htmlFor="select-all">
							Select all
						</label>
					</div>
				)}

				{filesToUpload.length > 0 && (
					<div className="grid grid-cols-3 gap-5">
						<UploadedFilesDisplay
							filesToUpload={filesToUpload}
							handleChangeToggleChecked={handleChangeToggleChecked}
							handleClickToggleChecked={handleClickToggleChecked}
							handleClickRemoveFileFromUploadStaging={handleClickRemoveFileFromUploadStaging}
						/>
					</div>
				)}

				{/* Upload and Cancel Buttons */}
				<div className="flex flex-row justify-between w-full">
					<button
						className="bg-[#B588B3] w-40 py-2 text-white font-semibold border border-[#B588B3] rounded-md"
						type="button"
						onClick={handleButtonClickUploadSelectedFiles}
						disabled={filesToUpload.length < 1 ? true : false}
						style={{ cursor: filesToUpload.length < 1 ? "not-allowed" : "pointer" }}
					>
						Upload
					</button>
					<button
						className="w-40 bg-white py-2 font-semibold text-[#B588B3] border border-[#B588B3] rounded-md"
						type="button"
						onClick={handleButtonClickCloseUpload}
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
	);
}

export default FileUpload;
