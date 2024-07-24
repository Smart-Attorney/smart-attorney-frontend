import { useRef } from "react";
import { UploadFile } from "../../../../types/file";

interface DropAreaProps {
	addToUploadFilesArray: (files: FileList) => void;
	uploadFiles: UploadFile[];
}

function DropZone({ addToUploadFilesArray, uploadFiles }: DropAreaProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleOpenFileBrowser = (): void => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUploadFilesFromBrowser = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { files } = event.target;
		if (files) {
			addToUploadFilesArray(files);
		}
	};

	const handleDragOver = (event: React.DragEvent): void => event.preventDefault();

	const handleUploadFilesFromDrop = (event: React.DragEvent): void => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		addToUploadFilesArray(files);
	};

	return (
		<div
			className="min-w-[624px] p-6 cursor-pointer border-dashed-custom flex items-center justify-center"
			style={{ height: uploadFiles.length > 0 ? "112px" : "224px" }}
			onDragOver={handleDragOver}
			onDrop={handleUploadFilesFromDrop}
			onClick={handleOpenFileBrowser}
		>
			<div className="w-fit h-fit">
				<h1 className="text-base text-white">
					Drag and drop or <b>select</b> files from your device.
				</h1>
				<input
					name="upload"
					type="file"
					multiple
					ref={inputRef}
					style={{ display: "none" }}
					onChange={handleUploadFilesFromBrowser}
				/>
			</div>
		</div>
	);
}

export default DropZone;
