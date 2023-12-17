import { useRef } from "react";
import uploadIcon from "../../assets/upload.png";

interface FileUpload {
	id: string;
	data: File;
	selected: boolean;
}

interface DropAreaProps {
	addFilesToUploadArray: (files: FileList) => void;
	filesToUpload: FileUpload[];
}

function DropArea(props: DropAreaProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClickBrowseFiles = () => {
		inputRef.current?.click();
	};

	const handleSelectUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files) {
			props.addFilesToUploadArray(files);
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};

	const handleDropUpload = (event: React.DragEvent) => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		props.addFilesToUploadArray(files);
	};

	return (
		<>
			{props.filesToUpload.length < 1 ? (
				<div
					className="p-6 bg-white border border-black border-dashed rounded-lg cursor-pointer w-fit"
					onDragOver={handleDragOver}
					onDrop={handleDropUpload}
					onClick={handleClickBrowseFiles}
				>
					<div className="flex flex-col items-center gap-4">
						<img className="w-16 h-16" src={uploadIcon} />
						<h1 className="text-xl font-medium">
							Drag and drop or <b>select</b> files from your device.
						</h1>
						<input
							name="upload"
							type="file"
							multiple
							ref={inputRef}
							style={{ display: "none" }}
							onChange={handleSelectUpload}
						/>
					</div>
				</div>
			) : (
				<div
					className="w-full p-3 bg-white border border-black border-dashed rounded-lg "
					onDragOver={handleDragOver}
					onDrop={handleDropUpload}
				>
					<div className="flex flex-row items-center gap-4">
						<button
							className="px-3 py-1 text-white font- rounded-md bg-[#5b636b] tracking-wide"
							type="button"
							onClick={handleClickBrowseFiles}
						>
							Browse...
						</button>
						<p className="font-medium ">Or drop additional files here</p>
						<input
							name="upload"
							type="file"
							multiple
							ref={inputRef}
							style={{ display: "none" }}
							onChange={handleSelectUpload}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default DropArea;
