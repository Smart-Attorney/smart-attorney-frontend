import RenderDocument from "../../components/Pdf/RenderDocument";
import CardGrid from "../../layouts/CardGrid";
import { FileForUploadObj } from "../../types/api";

interface DocumentProps {
	filesForUpload: FileForUploadObj[];
	removeFromFilesForUploadArray: (id: string) => void;
}

function FileForUploadCards(props: DocumentProps) {
	const { filesForUpload, removeFromFilesForUploadArray } = props;

	return (
		<CardGrid>
			{filesForUpload.map((file, index) => (
				<RenderDocument key={index} file={file} removeFromFilesForUploadArray={removeFromFilesForUploadArray} />
			))}
		</CardGrid>
	);
}

export default FileForUploadCards;
