import { forwardRef } from "react";
import { UploadIcon } from "../../assets/smart-attorney-figma";

interface DropAreaProps {
	ref: React.MutableRefObject<null>;
	style?: React.CSSProperties;
	handleOpenFileBrowser: () => void;
	addFilesToFilesForUploadArray: (files: FileList) => void;
}

const DropArea = forwardRef<HTMLInputElement, DropAreaProps>(function DropArea(props, ref) {
	const { style, handleOpenFileBrowser, addFilesToFilesForUploadArray } = props;

	const dropAreaStyle = {
		...style,
	};

	const handleUploadFilesFromBrowser = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { files } = event.target;
		if (!files) return;
		addFilesToFilesForUploadArray(files);
	};

	const handleUploadFilesFromDrop = (event: React.DragEvent): void => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		addFilesToFilesForUploadArray(files);
	};

	const handleDragOver = (event: React.DragEvent): void => {
		console.log(event);

		return event.preventDefault();
	};

	return (
		<div
			className="w-[95%] self-center h-[50vh] p-6 cursor-pointer border-dashed-custom flex items-center justify-center -z-10"
			style={dropAreaStyle}
			onDragOver={handleDragOver}
			onDrop={handleUploadFilesFromDrop}
			onClick={handleOpenFileBrowser}
		>
			<div className="w-fit h-fit">
				<div className="flex flex-col items-center gap-10">
					<img className="w-[88px]" src={UploadIcon} />
					<h1 className="text-2xl font-normal text-white">
						Drag and drop or <b>select</b> files from your device.
					</h1>
				</div>
				<input
					name="upload"
					type="file"
					multiple
					ref={ref}
					style={{ display: "none" }}
					onChange={handleUploadFilesFromBrowser}
				/>
			</div>
		</div>
	);
});
export default DropArea;
