import { useParams } from "react-router-dom";
import CardContainer from "../../components/Card/CardContainer";
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
					<CardContainer key={file.id} id={file.id}>
						{/* Kebab Menu */}
						<div className="relative left-[226px] bottom-1 max-w-fit z-10">
							<KebabMenu
								fileName={file.name}
								updateFileName={handleUpdateFileName(file.id)}
								deleteFile={() => handleDeleteFile(file.id)}
							/>
						</div>

						<div className="relative flex flex-col justify-between w-full h-full bottom-7">
							{/* Status and Name */}
							<div className="flex flex-col w-56 h-[72px] justify-between">
								{/* File Status */}
								<h1 className="w-fit text-black px-2.5 py-1 rounded-full bg-[#53EF0A80] text-xs">Submitted</h1>
								{/* <h1 className="w-fit">{file.status}</h1> */}

								{/* File Name */}
								<p
									className="text-sm cursor-pointer w-fit line-clamp-2 hover:text-blue-500"
									id={file.id}
									onClick={onClick}
								>
									{file.name}
								</p>
							</div>

							{/* Image */}
							<div
								className="w-60 h-[100px] rounded-lg border border-[#EBECF2] bg-slate-200 cursor-pointer"
								id={file.id}
								onClick={onClick}
							></div>

							{/* Blank Space for Formatting */}
							<div className="h-6 w-60"></div>
						</div>
					</CardContainer>
				);
			})}
		</CardGrid>
	);
}

export default CaseFileCards;
