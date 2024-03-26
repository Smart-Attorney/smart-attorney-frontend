import { FileForUploadObj } from "../../utils/types";
import CardBody from "../Card/CardBody";
import CardContainer from "../Card/CardContainer";
import CardName from "../Card/CardName";
import KebabMenuContainer from "../Card/KebabMenuContainer";
import KebabMenu from "./KebabMenu";

import * as pdfjs from "pdfjs-dist";
import { Document, Page } from "react-pdf";
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
			<KebabMenuContainer>
				<KebabMenu deleteFile={() => removeFromFilesForUploadArray(file.id)} />
			</KebabMenuContainer>

			<CardBody>
				<Document className="flex flex-col gap-4" file={file.data} noData="">
					{/* File status pill display */}
					<div className="w-fit bg-[#DEEDFF] rounded-full px-2.5 py-1">
						<p className="text-xs">Ready for upload</p>
					</div>
					<CardName name={file.data.name} />
					<Page className="self-center border border-black rounded-sm" pageNumber={1} height={125} />
				</Document>
			</CardBody>
		</CardContainer>
	) : (
		<></>
	);
};

export default RenderDocument;
