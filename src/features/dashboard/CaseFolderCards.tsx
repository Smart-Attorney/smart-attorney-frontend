import { useNavigate } from "react-router-dom";
import Database from "../../services/database";
import { formatDateInput } from "../../utils/format";
import type { CaseFolderObj } from "../../utils/types";
import KebabMenu from "./KebabMenu";
import CardGrid from "../../layouts/CardGrid";

interface CaseFolderCardProps {
	caseFolders: CaseFolderObj[] | null;
	setCaseFolders: React.Dispatch<React.SetStateAction<CaseFolderObj[] | null>>;
}

function CaseFolderCards(props: CaseFolderCardProps) {
	const db = new Database();
	const navigate = useNavigate();

	const { caseFolders, setCaseFolders } = props;

	const handleAddFolderDeadline = (folderId: string, event: React.ChangeEvent<HTMLInputElement>): void => {
		const { value: newDeadline } = event.target;
		const updatedArray = db.addCaseFolderDeadline(folderId, newDeadline);
		setCaseFolders(updatedArray);
	};

	const handleAddFolderLabel = (folderId: string, event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { value: newLabel } = (event.target as HTMLFormElement)[0] as HTMLInputElement;
		// checks for empty inputs and null errors
		if (newLabel.trim() === "" || newLabel === null) {
			// clears input field
			((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
			return;
		}
		const updatedArray = db.addCaseFolderLabel(folderId, newLabel);
		setCaseFolders(updatedArray);
		// clears input field after label is displayed on folder
		((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
	};

	const handleDeleteFolderLabel = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		const { id: folderId } = event.target as HTMLParagraphElement;
		const { id: labelId } = (event.target as HTMLDivElement).parentElement!;
		const updatedArray = db.deleteCaseFolderLabelById(folderId, labelId);
		setCaseFolders(updatedArray);
	};

	const handleDeleteFolder = (folderId: string): void => {
		const updatedArray = db.deleteCaseFolderById(folderId);
		setCaseFolders(updatedArray);
	};

	return (
		<CardGrid>
			{caseFolders?.map((caseFolder) => (
				<div
					className="flex flex-col w-64 h-64 py-4 pl-5 bg-white rounded-3xl"
					key={caseFolder.id}
					id={caseFolder.id}
				>
					{/* Kebab Menu */}
					<div className="relative left-[200px] max-w-fit">
						<KebabMenu
							addDeadline={(event) => handleAddFolderDeadline(caseFolder.id, event)}
							addLabel={(event) => handleAddFolderLabel(caseFolder.id, event)}
							deleteFolder={() => handleDeleteFolder(caseFolder.id)}
						/>
					</div>

					{/* Case Deadline */}
					<div className="relative flex flex-row items-center gap-4 w-fit bottom-[26px]">
						<p>Deadline: {formatDateInput(caseFolder.deadline)}</p>
						<div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${caseFolder.status}` }}></div>
					</div>

					{/* Case Folder Labels */}
					<div className="relative flex flex-row flex-wrap w-[85%] h-6 gap-2 bottom-[24px]">
						{caseFolder.labels.map((label) => (
							<div key={label.id} id={label.id}>
								<p
									className="px-3 text-sm pb-[3px] pt-[2px] text-white bg-black rounded-full cursor-pointer"
									id={caseFolder.id}
									onClick={handleDeleteFolderLabel}
								>
									{label.name}
								</p>
							</div>
						))}
					</div>

					{/* Case Folder Name */}
					<p
						className="relative top-[120px] w-fit cursor-pointer font-semibold hover:text-blue-500"
						onClick={() => navigate(`/case/${caseFolder.id}`)}
					>
						{caseFolder.name}
					</p>
				</div>
			))}
		</CardGrid>
	);
}

export default CaseFolderCards;
