import { useState } from "react";
import { nanoid } from "nanoid";
import DropArea from "./DropArea";
import UploadedFilesDisplay from "./UploadedFilesDisplay";

interface FileUploadProps {
	closeUploadBox: () => void;
}

interface FileUpload {
	id: string;
	name: string;
	size: number;
	data: File;
	selected: boolean;
}

function FileUpload(props: FileUploadProps) {
	const [filesToUpload, setFilesToUpload] = useState<FileUpload[]>([]);
	console.log(filesToUpload);

	const addFilesToUploadArray = (files: FileList) => {
		for (let i = 0; i < files.length; i++) {
			setFilesToUpload((prev) => {
				return [
					...prev,
					{
						id: nanoid(),
						name: files[i].name,
						size: files[i].size,
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

	return (
		<div className="p-5  rounded-lg bg-[#D9D9D9]">
			<div className="flex flex-col items-center gap-5">
				<h1 className="text-xl font-bold">Upload Documentation</h1>

				<DropArea addFilesToUploadArray={addFilesToUploadArray} />

				{filesToUpload && (
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
						disabled={filesToUpload.length < 1 ? true : false}
						style={{ cursor: filesToUpload.length < 1 ? "not-allowed" : "pointer" }}
					>
						Upload
					</button>
					<button
						className="w-40 bg-white py-2 font-semibold text-[#B588B3] border border-[#B588B3] rounded-md"
						type="button"
						onClick={props.closeUploadBox}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default FileUpload;
