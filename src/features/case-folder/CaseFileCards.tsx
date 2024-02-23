import { useParams } from "react-router-dom";
import CardGrid from "../../layouts/CardGrid";
import { CaseFileObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { deleteCaseFileById } from "./api/delete-case-file";
import { updateCaseFileName } from "./api/update-case-file-name";

interface CaseFileCardsProps {
	files: CaseFileObj[] | undefined;
	onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	updateCaseFiles: (newCaseFileArray: CaseFileObj[]) => void;
}

function CaseFileCards({ files, onClick, updateCaseFiles }: CaseFileCardsProps) {
	const { id: folderId } = useParams();

	// curried function
	const handleUpdateFileName = (fileId: string) => async (newFileName: string) => {
		try {
			const response = await updateCaseFileName(folderId!, fileId, newFileName);
			if (response.ok) {
				const data: CaseFileObj[] = await response.json();
				updateCaseFiles(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteFile = async (fileId: string) => {
		try {
			const response = await deleteCaseFileById(folderId!, fileId);
			if (response.ok) {
				const data: CaseFileObj[] = await response.json();
				updateCaseFiles(data);
			}
		} catch (error) {
			console.error("Error deleting file:", error);
		}
	};

	return (
		<CardGrid>
			{files?.map((file) => {
				return (
					<div className="w-64 h-64 py-4 pl-12 bg-white rounded-3xl " key={file.id}>
						{/* Kebab Menu */}
						<div className="relative left-[175px] max-w-min">
							<KebabMenu
								fileName={file.name}
								updateFileName={handleUpdateFileName(file.id)}
								deleteFile={() => handleDeleteFile(file.id)}
							/>
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
				);
			})}
		</CardGrid>
	);
}

export default CaseFileCards;
