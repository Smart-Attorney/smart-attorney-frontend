import PageBody from "../layouts/PageBody";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import { CASE_FOLDER_SORT_OPTIONS } from "../utils/constants";
import CaseFileCards from "../features/case-folder/CaseFileCards";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewCaseFileModal from "../features/case-folder/ViewCaseFileModal";
import { CaseFileObj, CaseFolderObj } from "../utils/types";
import Firebase from "../services/cloud-storage/firebase";
import Database from "../services/database";
import FileUploadModal from "../features/case-folder/file-upload/FileUploadModal";

function CaseFolder() {
	const navigate = useNavigate();
	const db = new Database();

	const { id: idFromParams } = useParams();
	const folderId = useRef(idFromParams);

	const fileId = useRef<string>("");
	const fileName = useRef<string>("");
	const fileUrl = useRef<string>("");

	const [caseFolder, setCaseFolder] = useState<CaseFolderObj>({
		id: "",
		name: "",
		status: "",
		deadline: "",
		labels: [],
		files: [],
	});
	const [caseFiles, setCaseFiles] = useState<CaseFileObj[]>([]);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isFileModalOpen, setIsFileModalOpen] = useState(false);

	useEffect(() => {
		if (folderId.current === undefined) {
			navigate("/404");
			return;
		}
		const caseFolderExists = db.getCaseFolderById(folderId.current);
		if (caseFolderExists) {
			setCaseFolder(caseFolderExists);
			setCaseFiles(caseFolderExists.files);
		} else {
			navigate("/404");
		}
	}, []);

	const handleViewFileModal = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		const { id, innerText: name } = event.target as HTMLParagraphElement;
		const url = await Firebase.getFileById(id, name, folderId.current!);
		fileName.current = name ? name : "";
		fileId.current = id ? id : "";
		fileUrl.current = url ? url : "";
		setIsFileModalOpen(true);
	};

	const handleCloseFileModal = (): void => {
		setIsFileModalOpen(false);
	};

	const toggleUploadModal = (): void => {
		setIsUploadModalOpen((prev) => !prev);
	};

	const closeUploadModal = (): void => {
		setIsUploadModalOpen(false);
	};

	const addUploadedFileToCaseFileArray = (uploadedFile: CaseFileObj): void => {
		setCaseFiles((prev) => [...prev, uploadedFile]);
	};

	const updateCaseFolder = (): void => {
		const newCaseFolder = {
			...caseFolder,
			files: caseFiles,
		};
		const updatedCaseFolder = db.updateCaseFolder(folderId.current!, newCaseFolder);
		setCaseFolder(updatedCaseFolder);
	};

	/* TODO: revise this lol */
	const updateCaseFolder2 = (newCaseFolder: CaseFolderObj) => {
		setCaseFolder(newCaseFolder);
		setCaseFiles(newCaseFolder.files);
	};

	return (
		<PageBody>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-col items-center w-full gap-6 mx-auto">
					<div className="flex flex-row items-end h-20 gap-2 mb-5">
						<span
							id="case-name"
							className="relative mt-10 mb-5 text-4xl font-bold text-white top-5"
							suppressContentEditableWarning={true}
						>
							{caseFolder?.name}
						</span>
					</div>
					<SearchBar />

					<div className="flex flex-row items-center justify-between w-full gap-8">
						<SortBar options={CASE_FOLDER_SORT_OPTIONS} />

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
								onClick={toggleUploadModal}
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

				<CaseFileCards
					files={caseFiles}
					onClick={(event) => handleViewFileModal(event)}
					updateCaseFolder={updateCaseFolder}
					updateCaseFolder2={updateCaseFolder2}
				/>

				{isUploadModalOpen && (
					<FileUploadModal
						caseFolderId={idFromParams!}
						closeUploadModal={closeUploadModal}
						addUploadedFileToCaseFileArray={addUploadedFileToCaseFileArray}
						updateCaseFolder={updateCaseFolder}
					/>
				)}

				{isFileModalOpen && (
					<ViewCaseFileModal
						fileName={fileName.current}
						fileID={fileId.current}
						fileURL={fileUrl.current}
						onClick={handleCloseFileModal}
					/>
				)}
			</div>
		</PageBody>
	);
}

export default CaseFolder;
