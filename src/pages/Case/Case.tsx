import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import CaseFileCards from "./CaseFileCards";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CaseFileModal from "./CaseFileModal";
import { FolderObj } from "../../utils/types";
import Firebase from "../../services/cloud-storage/firebase";
import Database from "../../services/database";

interface UploadedFileObject {
	id: string;
	name: string;
	status: string;
	url: string;
}

interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
	labels: string[];
	files: UploadedFileObject[];
}

function Case() {
	const db = new Database();
	const { id } = useParams();
	const folderID = useRef<string | undefined>(id);
	const fileID = useRef<string>("");
	const fileName = useRef<string | null>("");
	const fileURL = useRef<string>("");

	const navigate = useNavigate();

	const [caseFiles, setCaseFiles] = useState<FolderObj>();
	// console.log(caseFiles);
	const [isFileModalOpen, setIsFileModalOpen] = useState(false);

	useEffect(() => {
		if (folderID.current === undefined) {
			navigate("/404");
			return;
		}
		const caseFolderExists = db.getCaseFolderById(folderID.current);
		if (caseFolderExists) {
			setCaseFiles(caseFolderExists);
		} else {
			navigate("/404");
		}
	}, []);

	const handleViewFileModal = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		const { id: fileId, innerText } = event.target as HTMLParagraphElement;
		const fileUrl = await Firebase.getFile(fileId, innerText);

		fileName.current = innerText;
		fileID.current = fileId;
		fileURL.current = fileUrl!;

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
					fileID={fileID.current}
					fileURL={fileURL.current}
					onClick={handleCloseFileModal}
				/>
			)}
		</div>
	);
}

export default Case;
