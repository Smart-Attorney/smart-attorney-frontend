import { useParams } from "react-router-dom";
import CardGrid from "../../layouts/CardGrid";
import { Firebase } from "../../services/cloud-storage/firebase";
import Database from "../../services/database";
import { CaseFileObj, CaseFolderObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";

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
	const handleFileDelete = async (file: CaseFileObj) => {
		try {
			const { id: fileId, name: fileName } = file;
			await Firebase.deleteFileById(fileId, fileName, folderId!);
			await db.deleteCaseFileById(folderId!, fileId);
			const newCaseFolder = await db.getCaseFolderById(folderId!);
			if (newCaseFolder) {
				props.updateCaseFolder2(newCaseFolder);
			}
		} catch (error) {
			console.error("Error deleting file:", error);
		}
	};

	return (
		<CardGrid>
			{props.files?.map((file) => (
				<div className="w-64 h-64 py-4 pl-12 bg-white rounded-3xl " key={file.id}>
					{/* Kebab Menu */}
					<div className="relative left-[175px] max-w-min">
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
		</CardGrid>
	);
}

export default CaseFileCards;
