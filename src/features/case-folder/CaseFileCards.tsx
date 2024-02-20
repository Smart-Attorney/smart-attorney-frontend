import { useParams } from "react-router-dom";
import CardGrid from "../../layouts/CardGrid";
// import Database from "../../services/database";
import { CaseFileObj, CaseFolderObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { deleteCaseFileById } from "./api/delete-case-file";

interface CaseFileCardsProps {
	files: CaseFileObj[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateCaseFolderAndFiles: (newCaseFolder: CaseFolderObj) => void;
}

function CaseFileCards({ files, onClick, updateCaseFolderAndFiles }: CaseFileCardsProps) {
	// const db = new Database();
	const { id: folderId } = useParams();

	const handleFileDelete = async (file: CaseFileObj) => {
		try {
			const response = await deleteCaseFileById(folderId!, file.id);
			if (response.ok) {
				const data: CaseFolderObj = await response.json();
				updateCaseFolderAndFiles(data);
			}
		} catch (error) {
			console.error("Error deleting file:", error);
		}
	};

	return (
		<CardGrid>
			{files?.map((file) => (
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
						onClick={onClick}
					>
						{file.name}
					</p>
				</div>
			))}
		</CardGrid>
	);
}

export default CaseFileCards;
