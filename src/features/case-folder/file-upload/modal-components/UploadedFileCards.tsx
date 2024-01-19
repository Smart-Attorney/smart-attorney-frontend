import { getFileTypeImg } from "../../../../utils/file-type-img";
import { formatBytes } from "../../../../utils/format";
import { UploadedFileObj } from "../../../../utils/types";

interface UploadedFileCardsProps {
	filesToUpload: UploadedFileObj[];
	handleRemoveFileFromStaging: (id: string) => void;
}

function UploadedFileCards(props: UploadedFileCardsProps) {
	return (
		<div className="flex flex-col w-full gap-3 p-1 overflow-x-hidden overflow-y-auto max-h-[304px]">
			{props.filesToUpload.map((file, index) => {
				const { name, size } = file.data;
				const fileNameArray = name.split(".");
				const fileType = fileNameArray[1];
				const fileTypeImg = getFileTypeImg(fileType);

				return (
					<div id="card-container" className="w-full px-4 py-2 bg-white rounded-md" key={index}>
						<div id="card-contents" className="flex flex-row items-center h-full gap-5">
							<span id="file-type-image" className="flex items-center justify-center w-16">
								<img src={fileTypeImg} />
							</span>
							<div id="file-info-container" className="flex flex-col w-full">
								<p className="w-[95%] overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap">
									{name}
								</p>
								<p className="text-sm text-gray-500">{formatBytes(size)}</p>
								<p className="text-sm font-semibold">Ready to upload</p>
							</div>
							<span
								id="close-icon"
								className="relative text-2xl font-semibold rounded-full cursor-pointer h-fit hover:bg-gray-400"
								onClick={() => props.handleRemoveFileFromStaging(file.id)}
							>
								<p className="relative w-8 text-center bottom-[1.25px]">
									&#10005; {/* "&#10005;" makes an "x" */}
								</p>
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default UploadedFileCards;
