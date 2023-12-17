interface FileUpload {
	id: string;
	data: File;
	selected: boolean;
}

interface UploadedFilesDisplayProps {
	filesToUpload: FileUpload[];
	handleChangeToggleChecked: (id: string) => void;
	handleClickToggleChecked: (id: string) => void;
	handleClickRemoveFileFromUploadStaging: (id: string) => void;
}

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

/**
 * TODO:
 * Rename UploadedFilesDisplay to UploadedFileCard for specificity.
 */
function UploadedFilesDisplay(props: UploadedFilesDisplayProps) {
	return (
		<>
			{props.filesToUpload.map((file, index) => {
				return (
					<div className="p-2 bg-white rounded-md w-52" key={index}>
						<div className="flex flex-row h-full gap-3">
							<input
								className="self-start cursor-pointer"
								type="checkbox"
								checked={file.selected}
								onChange={() => props.handleChangeToggleChecked(file.id)}
							/>
							<div
								className="flex flex-col justify-between w-full cursor-pointer"
								onClick={() => props.handleClickToggleChecked(file.id)}
							>
								{/**
								 * TODO: Apply ellipsis to multiline text workaround.
								 * Does not work in native CSS.
								 * Reference to workaround:
								 * https://www.geeksforgeeks.org/how-to-apply-an-ellipsis-to-multiline-text-in-css/
								 */}
								<p className="font-semibold">{file.data.name}</p>
								<p className="text-gray-500 ">{formatBytes(file.data.size)}</p>
							</div>
							<span
								className="relative self-start font-semibold bottom-[6px] cursor-pointer"
								onClick={() => props.handleClickRemoveFileFromUploadStaging(file.id)}
							>
								X
							</span>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default UploadedFilesDisplay;
