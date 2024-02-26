import { Document, Page } from "react-pdf";
import { FileForUploadObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";

import * as pdfjs from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const RenderDocument = (props: { file: FileForUploadObj; removeFileFromFilesForUploadArray: (id: string) => void }) => {
	const { file } = props;

	return file.data ? (
		<div className="flex flex-col justify-between w-[272px] h-[256px] p-4 bg-white rounded-2xl" key={file.id}>
			<div className="relative left-[226px] bottom-1 max-w-fit z-[1]">
				<KebabMenu deleteFile={() => props.removeFileFromFilesForUploadArray(file.id)} />
			</div>

			<div className="relative w-full h-full bottom-7">
				<Document className="flex flex-col items-center justify-between gap-6" file={file.data} noData="">
					<div className="self-start flex flex-col justify-end w-full h-[72px] ">
						<p className="text-sm line-clamp-2">{file.data.name}</p>
					</div>
					<Page className="border border-black rounded-sm" pageNumber={1} height={125} />
				</Document>
			</div>
		</div>
	) : (
		<></>
	);
};

export default RenderDocument;
