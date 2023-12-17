import { useState } from "react";
import { nanoid } from "nanoid";
import DropArea from "./DropArea";

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

	/**
	 * Byte conversion function reference:
	 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
	 */
	const formatBytes = (bytes: number, decimals = 1) => {
		if (!+bytes) return "0 Bytes";
		const k = 1000;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	};

	return (
		<div className="p-5  rounded-lg bg-[#D9D9D9]">
			<div className="flex flex-col items-center gap-5">
				<h1 className="text-xl font-bold">Upload Documentation</h1>

				<DropArea addFilesToUploadArray={addFilesToUploadArray} />

				{/* Uploaded Files Display */}
				{filesToUpload && (
					<div className="grid grid-cols-3 gap-5">
						{filesToUpload.map((file, index) => {
							return (
								<div className="p-2 bg-white rounded-md w-52" key={index}>
									<div className="flex flex-row h-full gap-3">
										<input
											className="self-start cursor-pointer"
											type="checkbox"
											checked={file.selected}
											onChange={() => handleChangeToggleChecked(file.id)}
										/>
										<div
											className="flex flex-col justify-between w-full cursor-pointer"
											onClick={() => handleClickToggleChecked(file.id)}
										>
											{/**
											 * TODO: Apply ellipsis to multiline text workaround.
											 * Does not work in native CSS.
											 * Reference to workaround:
											 * https://www.geeksforgeeks.org/how-to-apply-an-ellipsis-to-multiline-text-in-css/
											 */}
											<p className="font-semibold">{file.name}</p>
											<p className="text-gray-500 ">{formatBytes(file.size)}</p>
										</div>
										<span
											className="relative self-start font-semibold bottom-[6px] cursor-pointer"
											onClick={() => handleClickRemoveFileFromUploadStaging(file.id)}
										>
											X
										</span>
									</div>
								</div>
							);
						})}
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
