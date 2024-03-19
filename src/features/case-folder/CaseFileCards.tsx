import { useParams } from "react-router-dom";
import CardContainer from "../../components/Card/CardContainer";
import CardGrid from "../../layouts/CardGrid";
import { Format } from "../../utils/format";
import { CaseFileObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import { deleteCaseFileById } from "./api/delete-case-file";
import { updateDeadline } from "./api/update-case-file-deadline";
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

	const handleSetFileDeadline = async (fileId: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const deadlineInUnixTime = Date.parse(value);
		try {
			const response = await updateDeadline(folderId!, fileId, deadlineInUnixTime);
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
			alert(error);
		}
	};

	return (
		<CardGrid>
			{files?.map((file) => {
				return (
					<CardContainer key={file.id} id={file.id}>
						{/* Kebab Menu */}
						<div className="relative left-[230px] bottom-1 max-w-fit z-10">
							<KebabMenu
								fileName={file.name}
								updateFileName={handleUpdateFileName(file.id)}
								setDeadline={(event) => handleSetFileDeadline(file.id, event)}
								deleteFile={() => handleDeleteFile(file.id)}
							/>
						</div>

						{/* Card Contents */}
						<div className="relative flex flex-col justify-between w-full h-full bottom-7">
							{/* Status and Name */}
							<div className="flex flex-col w-[230px] h-[72px] justify-between">
								{/* Contains Status and Deadline */}
								<div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
									{/* File Status */}
									<div className="min-w-max bg-[#53EF0A80] rounded-full px-2.5 py-1">
										<p className="text-xs">Submitted</p>
									</div>
									{/* <h1 className="w-fit">{file.status}</h1> */}
									{/* File Deadline */}
									<div className="min-w-max bg-[#FB3E3E80] rounded-full px-2.5 py-1">
										<p className="text-xs">Deadline: {Format.dateForCardDisplay(file.deadline)}</p>
									</div>
								</div>

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
