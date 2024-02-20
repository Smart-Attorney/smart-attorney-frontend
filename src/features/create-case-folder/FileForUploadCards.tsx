import RenderDocument from "../../components/Pdf/RenderDocument";
import CardGrid from "../../layouts/CardGrid";
import { FileForUploadObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";

interface CaseFileProps {
	filesForUpload: FileForUploadObj[];
	removeFileFromFilesForUploadArray: (id: string) => void;
}

function FileForUploadCards(props: CaseFileProps) {
	const { filesForUpload, removeFileFromFilesForUploadArray } = props;

	return (
		<CardGrid>
			{filesForUpload.map((file) => (
				// <div className="flex flex-col justify-between w-64 h-64 py-4 pl-12 bg-white rounded-3xl" key={file.id}>
				// 	<div className="relative left-[175px] max-w-fit">
				// 		<KebabMenu deleteFile={() => removeFileFromFilesForUploadArray(file.id)} />
				// 	</div>
				// 	<p className="mb-8 w-fit">{file.data.name}</p>
				// </div>
				<RenderDocument
					file={file}
					removeFileFromFilesForUploadArray={removeFileFromFilesForUploadArray}
				/>
			))}
		</CardGrid>
	);
}

export default FileForUploadCards;
