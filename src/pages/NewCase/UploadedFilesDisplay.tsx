import { formatBytes } from "../../utils/format";

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
