import { CaseFileObj, CaseFolderObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import Firebase from "../../services/cloud-storage/firebase";
import { useParams } from "react-router-dom";
import Database from "../../services/database";

interface CaseFileCardsProps {
	files: CaseFileObj[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateCaseFolder: () => void;
	updateCaseFolder2: (newCaseFolder: CaseFolderObj) => void;
}

function CaseFileCards(props: CaseFileCardsProps) {
	const db = new Database();
	const { id: folderId } = useParams();

	/**
	 * TODO
	 * awful and messy function
	 * revise this
	 */
	const handleFileDelete = (file: CaseFileObj) => {
		const { id: fileId, name: fileName } = file;
		Firebase.deleteFileById(fileId, fileName, folderId!);
		db.deleteCaseFileById(folderId!, fileId);
		const newCaseFolder = db.getCaseFolderById(folderId!);
		if (newCaseFolder) {
			props.updateCaseFolder2(newCaseFolder);
		}
	};

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{props.files?.map((file) => (
				<div className="w-64 h-64 py-4 pl-12 bg-white rounded-3xl " key={file.id}>
					{/* Kebab Menu */}
					<div className="relative left-[175px] w-24">
						<KebabMenu deleteFile={() => handleFileDelete(file)} />
					</div>

					{/* File Status */}
					<h1 className="relative bottom-[26px] right-[10px] w-fit">{file.status}</h1>

					{/* File Name */}
					<p
						className="mb-8 font-semibold w-fit cursor-pointer hover:text-blue-500 relative top-[140px] right-[10px]"
						id={file.id}
						onClick={props.onClick}
					>
						{file.name}
					</p>
				</div>
			))}
		</div>
	);
}

export default CaseFileCards;
