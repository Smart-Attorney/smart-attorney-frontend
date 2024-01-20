import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ellipse8Logo from "../assets/smart-attorney-figma/Ellipse 8.png";
import { LightBulb, Pen, Save, SphereLattice, Upload } from "../assets/smart-attorney-figma/buttons";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFileCards from "../features/case-folder/CaseFileCards";
import ViewCaseFileModal from "../features/case-folder/ViewCaseFileModal";
import UploadModal from "../features/case-folder/file-upload/UploadModal";
import SidebarLayout from "../layouts/SidebarLayout";
import Firebase from "../services/cloud-storage/firebase";
import Database from "../services/database";
import { CASE_FOLDER_SORT_OPTIONS } from "../utils/constants";
import { CaseFileObj, CaseFolderObj } from "../utils/types";

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
		createdDate: NaN,
		lastOpenedDate: NaN,
		status: "",
		deadline: "",
		labels: [],
		files: [],
	});
	const [caseFiles, setCaseFiles] = useState<CaseFileObj[]>([]);
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	const [fileModalOpen, setFileModalOpen] = useState(false);

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
		setFileModalOpen(true);
	};

	const handleCloseFileModal = (): void => {
		setFileModalOpen(false);
	};

	const toggleUploadModal = (): void => {
		setUploadModalOpen((prev) => !prev);
	};

	const closeUploadModal = (): void => {
		setUploadModalOpen(false);
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

	/* 
    TODO:
    revise this so this func runs then it navigates back to dashboard 
  */
	const updateLastOpenedDate = (): void => {
		const newCaseFolder = {
			...caseFolder,
			lastOpenedDate: Date.now(),
		};
		db.updateCaseFolder(folderId.current!, newCaseFolder);
	};

	const handleSaveChanges = () => {
		updateLastOpenedDate();
		navigate("/dashboard");
	};

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-col w-full gap-6 mx-auto">
					<div className="flex flex-row items-end h-20 gap-4 mb-5">
						<img className="relative top-2 h-14" src={Ellipse8Logo} />
						<span
							id="case-name"
							className="mt-10 text-4xl font-bold text-white justify-self-end"
							// suppressContentEditableWarning={true}
						>
							{caseFolder?.name}
						</span>
					</div>

					<SearchBar />

					<div className="flex flex-row items-center justify-between w-full gap-8">
						<SortBar options={CASE_FOLDER_SORT_OPTIONS} />

						<div className="flex flex-row flex-wrap justify-end gap-3">
							<PillButton name="Create" img={Pen} />
							<PillButton name="Upload" img={Upload} onClick={toggleUploadModal} />
							<PillButton name="Translate" img={SphereLattice} />
							<PillSpecialButton name="Generate" img={LightBulb} />
							<PillButton name="Save" img={Save} onClick={handleSaveChanges} />
						</div>
					</div>
				</div>

				<CaseFileCards
					files={caseFiles}
					onClick={(event) => handleViewFileModal(event)}
					updateCaseFolder={updateCaseFolder}
					updateCaseFolder2={updateCaseFolder2}
				/>
			</div>

			{uploadModalOpen && (
				<UploadModal
					caseFolderId={idFromParams!}
					closeUploadModal={closeUploadModal}
					addUploadedFileToCaseFileArray={addUploadedFileToCaseFileArray}
					updateCaseFolder={updateCaseFolder}
				/>
			)}

			{fileModalOpen && (
				<ViewCaseFileModal
					fileName={fileName.current}
					fileID={fileId.current}
					fileURL={fileUrl.current}
					onClick={handleCloseFileModal}
				/>
			)}
		</SidebarLayout>
	);
}

export default CaseFolder;
