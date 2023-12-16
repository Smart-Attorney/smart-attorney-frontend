import { useState, useRef } from "react";
import uploadIcon from "../../assets/upload.png";

interface FileUploadProps {
	closeUploadBox: () => void;
}

function FileUpload(props: FileUploadProps) {
	const [files, setFiles] = useState([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleSelectUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.files);
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};

	const handleDropUpload = (event: React.DragEvent) => {
		event.preventDefault();
		console.log(event.dataTransfer.files);
	};

	return (
		<div className="p-5 border border-black rounded-lg">
			<div
				className="p-6 bg-teal-200 border border-black border-dashed rounded-lg cursor-pointer w-fit"
				onDragOver={handleDragOver}
				onDrop={handleDropUpload}
				onClick={handleClick}
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
						onClick={handleClick}
					/>
				</div>
			</div>
			<div className="flex flex-row justify-between mt-5">
				<button
					className="bg-[#B588B3] w-40 py-2 text-white font-semibold border border-[#B588B3] rounded-sm"
					type="button"
					disabled={files.length < 1 ? true : false}
					style={{ cursor: files.length < 1 ? "not-allowed" : "pointer" }}
				>
					Upload
				</button>
				<button
					className="w-40 py-2 font-semibold text-[#B588B3] border border-[#B588B3] rounded-sm"
					type="button"
					onClick={props.closeUploadBox}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default FileUpload;
