import { useRef } from "react";
import uploadIcon from "../../assets/upload.png";

interface DropAreaProps {
	addFilesToUploadArray: (files: FileList) => void;
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
		</>
	);
}

export default DropArea;
