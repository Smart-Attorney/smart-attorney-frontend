import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	LightBulbPurple,
	PenPurple,
	SavePurple,
	SphereLatticePurple,
	UploadPurple,
} from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFileCards from "../features/case-folder/CaseFileCards";
import ViewCaseFileModal from "../features/case-folder/ViewCaseFileModal";
import GenerateModal from "../features/case-folder/ai-generate/GenerateModal";
import UploadModal from "../features/case-folder/file-upload/UploadModal";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import Database from "../services/database";
import { Firebase } from "../services/cloud-storage/firebase";
import { CASE_FOLDER } from "../utils/constants/sort-options";
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
		deadline: 0,
		labels: [],
		files: [],
		client: {
			id: "",
			firstName: "",
			lastName: "",
			sex: null,
			primaryLanguage: "",
			countryOfCitizenship: "",
			dateOfBirth: "",
		},
	});

	const [caseFiles, setCaseFiles] = useState<CaseFileObj[]>([]);
	const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
	const [fileModalOpen, setFileModalOpen] = useState<boolean>(false);
	const [generateModalOpen, setGenerateModalOpen] = useState<boolean>(false);

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

	const handleCloseGenerateModal = (): void => {
		setGenerateModalOpen(false);
	};

	const toggleGenerateModal = (): void => {
		setGenerateModalOpen((prev) => !prev);
	};

	const handleCloseViewFileModal = (): void => {
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
			<PageHeader className="gap-4">
				<img className="h-[58px]" src={UserIcon} />
				<h1 id="case-name" className="text-3xl font-bold text-white">
					{caseFolder?.name}
				</h1>
			</PageHeader>

			<SearchBar />

			<SortBarWithButtons>
				<SortBar options={CASE_FOLDER} />

				<div className="flex flex-row flex-wrap justify-end gap-3 w-[516px]">
					<PillButton name="Create" type="button" img={PenPurple} />
					<PillButton name="Upload" type="button" img={UploadPurple} onClick={toggleUploadModal} />
					<PillButton name="Translate" type="button" img={SphereLatticePurple} />
					<PillSpecialButton name="Generate" type="button" img={LightBulbPurple} onClick={toggleGenerateModal} />
					<PillButton name="Save" type="button" img={SavePurple} onClick={handleSaveChanges} />
				</div>
			</SortBarWithButtons>

			<CaseFileCards
				files={caseFiles}
				onClick={(event) => handleViewFileModal(event)}
				updateCaseFolder={updateCaseFolder}
				updateCaseFolder2={updateCaseFolder2}
			/>

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
					closeModal={handleCloseViewFileModal}
				/>
			)}

			{generateModalOpen && <GenerateModal closeModal={handleCloseGenerateModal} />}
		</SidebarLayout>
	);
}

export default CaseFolder;
