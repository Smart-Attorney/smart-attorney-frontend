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
import { getCaseFileByIdFromDB } from "../features/case-folder/api/get-case-file";
import { getCaseFolder } from "../features/case-folder/api/get-case-folder";
import { updateLastOpenedDate } from "../features/case-folder/api/update-last-opened-date";
import UploadModal from "../features/case-folder/file-upload/UploadModal";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import Database from "../services/database";
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
			sex: "Other",
			primaryLanguage: "",
			countryOfCitizenship: "",
			dateOfBirth: NaN,
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

		handleGetCaseFolder();
	}, []);

	const handleGetCaseFolder = async () => {
		try {
			const response = await getCaseFolder(folderId.current!);
			if (response.ok) {
				const data: CaseFolderObj = await response.json();
				setCaseFolder(data);
				setCaseFiles(data.files);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleViewFileModal = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		const { id } = event.target as HTMLParagraphElement;
		try {
			const response = await getCaseFileByIdFromDB(folderId.current!, id);
			if (response.ok) {
				const file: CaseFileObj = await response.json();
				fileName.current = file.name;
				fileId.current = file.id;
				fileUrl.current = file.url;
				setFileModalOpen(true);
			}
		} catch (error) {
			alert(error);
		}
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

	const updateCaseFolderAndFiles = (newCaseFolder: CaseFolderObj) => {
		setCaseFolder(newCaseFolder);
		setCaseFiles(newCaseFolder.files);
	};

	const handleUpdateLastOpenedDate = async (): Promise<void> => {
		try {
			const response = await updateLastOpenedDate(folderId.current!, Date.now());
			if (response.ok) {
				navigate("/dashboard");
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleSaveChanges = () => {
		handleUpdateLastOpenedDate();
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
				updateCaseFolderAndFiles={updateCaseFolderAndFiles}
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
