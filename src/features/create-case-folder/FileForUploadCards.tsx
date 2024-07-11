import RenderDocument from "../../components/Pdf/RenderDocument";
import CardGrid from "../../layouts/CardGrid";
import { FileForUploadObj } from "../../types/api";

interface CaseFileProps {
	filesForUpload: FileForUploadObj[];
	removeFromFilesForUploadArray: (id: string) => void;
}

function FileForUploadCards(props: CaseFileProps) {
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
