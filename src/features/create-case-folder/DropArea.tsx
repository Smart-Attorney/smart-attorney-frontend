import { forwardRef } from "react";
import { UploadIcon } from "../../assets/smart-attorney-figma/global";

interface DropAreaProps {
	ref: React.MutableRefObject<null>;
	style?: React.CSSProperties;
	handleOpenFileBrowser: () => void;
	addToFilesForUploadArray: (files: FileList) => void;
}

const DropArea = forwardRef<HTMLInputElement, DropAreaProps>(function DropArea(props, ref) {
	const { style, handleOpenFileBrowser, addToFilesForUploadArray } = props;

	const dropAreaStyle = {
		...style,
	};

	const handleUploadFilesFromBrowser = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { files } = event.target;
		if (!files) return;
		addToFilesForUploadArray(files);
	};

	const handleUploadFilesFromDrop = (event: React.DragEvent): void => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		addToFilesForUploadArray(files);
	};

	const handleDragOver = (event: React.DragEvent): void => {
		console.log(event);

		return event.preventDefault();
	};

	return (
		<div
			className="self-center h-[50vh] ml-[108px] mr-40 cursor-pointer border-dashed-custom flex items-center justify-center"
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
					accept="application/pdf"
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
