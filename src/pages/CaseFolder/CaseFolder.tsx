import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import CaseFileCards from "./CaseFileCards";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CaseFileModal from "./CaseFileModal";
import { CaseFolderObj } from "../../utils/types";
import Firebase from "../../services/cloud-storage/firebase";
import Database from "../../services/database";

function CaseFolder() {
	const db = new Database();
	const { id } = useParams();
	const folderId = useRef<string | undefined>(id);
	const fileId = useRef<string>("");
	const fileName = useRef<string | null>("");
	const fileUrl = useRef<string>("");

	const navigate = useNavigate();

	const [caseFiles, setCaseFiles] = useState<CaseFolderObj>();
	// console.log(caseFiles);
	const [isFileModalOpen, setIsFileModalOpen] = useState(false);

	useEffect(() => {
		if (folderId.current === undefined) {
			navigate("/404");
			return;
		}
		const caseFolderExists = db.getCaseFolderById(folderId.current);
		if (caseFolderExists) {
			setCaseFiles(caseFolderExists);
		} else {
			navigate("/404");
		}
	}, []);

	const handleViewFileModal = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		// console.log(event);

		const { id: fileID, innerText } = event.target as HTMLParagraphElement;
		const fileURL = await Firebase.getFileById(fileID, innerText, folderId.current!);

		fileName.current = innerText;
		fileId.current = fileID;
		fileUrl.current = fileURL!;

		setIsFileModalOpen(true);
	};

	const handleCloseFileModal = (): void => setIsFileModalOpen(false);

	return (
		<div
			className="flex flex-col items-center gap-6 w-[80%] mx-auto"
			style={{ background: "linear-gradient(to bottom, #000273, #000000)" }}
		>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-row items-end h-20 gap-2 mb-5">
					<span
						id="case-name"
						className="relative mt-10 mb-5 text-4xl font-bold top-5"
						suppressContentEditableWarning={true}
					>
						{caseFiles?.name}
					</span>
				</div>
				<SearchBar />

				<div className="flex flex-row items-center justify-between w-full gap-8">
					<SortBar options={NEW_CASE_SORT_OPTIONS} />

					<div className="flex flex-row flex-wrap justify-end gap-8">
						<button
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
							type="button"
							name="Team"
						>
							<span>Team</span>
						</button>
						<button
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
							type="button"
							name="Upload"
						>
							<span>Upload</span>
						</button>
						<button
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
							type="button"
							name="Create"
							onClick={() => navigate("/dashboard")}
						>
							<span>Save</span>
						</button>
					</div>
				</div>
			</div>

			<CaseFileCards files={caseFiles?.files} onClick={(event) => handleViewFileModal(event)} />

			{isFileModalOpen && (
				<CaseFileModal
					fileName={fileName.current}
					fileID={fileId.current}
					fileURL={fileUrl.current}
					onClick={handleCloseFileModal}
				/>
			)}
		</div>
	);
}

export default CaseFolder;
