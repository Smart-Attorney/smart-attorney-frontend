import RenderDocument from "../../components/Pdf/RenderDocument";
import CardGrid from "../../layouts/CardGrid";
import { UploadFile } from "../../types/api";

interface DocumentProps {
	uploadFiles: UploadFile[];
	removeFromUploadFilesArray: (id: string) => void;
}

function FileForUploadCards({ uploadFiles, removeFromUploadFilesArray }: DocumentProps) {
	return (
		<CardGrid>
			{uploadFiles.map((file, index) => (
				<RenderDocument key={index} file={file} removeFromUploadFilesArray={removeFromUploadFilesArray} />
			))}
		</CardGrid>
	);
}

export default FileForUploadCards;
