import { FileForUploadObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";

interface CaseFileProps {
	filesForUpload: FileForUploadObj[];
	removeFileFromFilesForUploadArray: (id: string) => void;
}

function FileForUploadCards(props: CaseFileProps) {
	const { filesForUpload, removeFileFromFilesForUploadArray } = props;

	return (
		// For some reason this grid display does not behave like the others*.
		// *CaseFileCards and CaseFolderCards
		// FIX: add style "self-center" (align-self: center)
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1400px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2 self-center">
			{filesForUpload.map((file) => (
				<div className="flex flex-col justify-between w-64 h-64 py-4 pl-12 bg-white rounded-3xl" key={file.id}>
					<div className="relative left-[175px] max-w-fit">
						<KebabMenu deleteFile={() => removeFileFromFilesForUploadArray(file.id)} />
					</div>
					<p className="mb-8 w-fit">{file.data.name}</p>
				</div>
			))}
		</div>
	);
}

export default FileForUploadCards;
