import { useState } from "react";
import translateDoc from "../../features/translateDocuments/translateDocuments";
import { UploadFile } from "../../types/api";
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
	file: UploadFile;
	removeFromUploadFilesArray: (id: string) => void;
}

const RenderDocument = ({ file, removeFromUploadFilesArray }: RenderDocumentProps) => {
	const [translatedDocUrl, setTranslatedDocUrl] = useState<null | string>(null);

	const handleTranslate = (fileName: string) => {
		translateDoc(fileName)
			.then((res) => {
				setTranslatedDocUrl(res);
			})
			.catch((err) => {
				window.alert("Failed to Translate Files");
				console.log(err);
			});
	};

	const downloadTranslatedFile = (url: string) => {
		window.location.href = url;
		window.open(url);
	};

	return file.data ? (
		<CardContainer key={file.id} id={file.id}>
			<KebabMenuContainer>
				<KebabMenu
					deleteFile={() => removeFromUploadFilesArray(file.id)}
					onClickTranslate={() => handleTranslate(file.data.name)}
				/>
			</KebabMenuContainer>

			<CardBody>
				<Document className="flex flex-col gap-4" file={file.data} noData="">
					{/* File status pill display */}
					<div className="w-fit bg-[#DEEDFF] rounded-full px-2.5 py-1">
						<p className="text-xs">Ready for upload</p>
					</div>
					<CardName name={file.data.name} />
					{translatedDocUrl && (
						<CardName name="Download English Version" viewFile={() => downloadTranslatedFile(translatedDocUrl)} />
					)}

					<Page className="self-center border border-black rounded-sm" pageNumber={1} height={125} />
				</Document>
			</CardBody>
		</CardContainer>
	) : (
		<></>
	);
};

export default RenderDocument;
