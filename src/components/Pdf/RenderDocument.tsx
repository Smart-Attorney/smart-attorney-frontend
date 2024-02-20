import { Document, Page } from "react-pdf";
import KebabMenu from "../../features/case-folder/KebabMenu";
import { FileForUploadObj } from "../../utils/types";

import * as pdfjs from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const RenderDocument = (props: {
	file: FileForUploadObj;
	removeFileFromFilesForUploadArray: (id: string) => void;
}) => {
	const { file } = props;

	return file.data ? (
		<Document file={file.data} noData="">
			<div
				className="flex flex-col justify-between w-64 h-64 p-4 bg-white rounded-3xl"
				key={file.id}
			>
				<div className="relative left-[175px] max-w-fit">
					<KebabMenu
						deleteFile={() => props.removeFileFromFilesForUploadArray(file.id)}
					/>
				</div>

				<Page className="mx-auto" pageNumber={1} height={150} />

				<p className="mb-8 w-fit">{file.data.name}</p>
			</div>
		</Document>
	) : (
		<></>
	);
};

export default RenderDocument;
