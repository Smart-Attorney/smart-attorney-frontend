import { Document, Page } from "react-pdf";
import { FileForUploadObj } from "../../utils/types";
import CardContainer from "../Card/CardContainer";
import KebabMenu from "./KebabMenu";

import * as pdfjs from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface RenderDocumentProps {
	file: FileForUploadObj;
	removeFromFilesForUploadArray: (id: string) => void;
}

const RenderDocument = ({ file, removeFromFilesForUploadArray }: RenderDocumentProps) => {
	return file.data ? (
		<CardContainer key={file.id} id={file.id}>
			<div className="relative left-[230px] bottom-1 max-w-fit z-[5]">
				<KebabMenu deleteFile={() => removeFromFilesForUploadArray(file.id)} />
			</div>

			<div className="relative w-full h-full bottom-7">
				<Document className="flex flex-col items-center gap-4" file={file.data} noData="">
					<p className="self-start text-xs px-2.5 py-1 text-black rounded-full bg-[#DEEDFF] w-fit">Ready for upload</p>
					<div className="w-full h-fit">
						<p className="text-sm line-clamp-2">{file.data.name}</p>
					</div>
					<Page className="border border-black rounded-sm" pageNumber={1} height={125} />
				</Document>
			</div>
		</CardContainer>
	) : (
		<></>
	);
};

export default RenderDocument;
