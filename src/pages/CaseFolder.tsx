import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as BtnIcon from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFileCards from "../features/case-folder/CaseFileCards";
import ViewCaseFileModal from "../features/case-folder/ViewCaseFileModal";
import GenerateModal from "../features/case-folder/ai-generate/GenerateModal";
import { getCaseFileByIdFromDB } from "../features/case-folder/api/get-case-file-by-id";
import { getCaseFiles } from "../features/case-folder/api/get-case-files";
import { getCaseFolder } from "../features/case-folder/api/get-case-folder";
import { getCaseClient } from "../features/case-folder/api/get-client";
import { updateCaseFolderName } from "../features/case-folder/api/update-case-folder-name";
import { updateLastOpenedDate } from "../features/case-folder/api/update-last-opened-date";
import ClientModal from "../features/case-folder/client-modal/ClientModal";
import UploadModal from "../features/case-folder/file-upload/UploadModal";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { CASE_FOLDER } from "../utils/constants/sort-options";
import { DateUtils } from "../utils/date-utils";
import { CaseFileObj, CaseFolderObj, ClientObj } from "../utils/types";

function CaseFolder() {
	const navigate = useNavigate();

	const { id: idFromParams } = useParams();
	const folderId = useRef(idFromParams);

	const fileId = useRef<string>("");
	const fileName = useRef<string>("");
	const fileUrl = useRef<string>("");

	const [caseFolder, setCaseFolder] = useState<CaseFolderObj>({
		id: "",
		name: "",
		createdDate: 0,
		lastOpenedDate: 0,
		isOpen: true,
	});

	const [client, setClient] = useState<ClientObj>({
		id: "",
		firstName: "",
		middleName: "",
		lastName: "",
		sex: "Other",
		primaryLanguage: "",
		countryOfCitizenship: "",
		dateOfBirth: 0,
	});

	const [caseFiles, setCaseFiles] = useState<CaseFileObj[]>([]);

	const caseFolderNameRef = useRef<HTMLHeadingElement>(null);
	const newCaseFolderName = useRef<string>("");
	const [caseFolderNameEditable, setCaseFolderNameEditable] = useState<boolean>(false);

	const [clientModalOpen, setClientModalOpen] = useState<boolean>(false);
	const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
	const [fileModalOpen, setFileModalOpen] = useState<boolean>(false);
	const [generateModalOpen, setGenerateModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (caseFolderNameEditable) {
			caseFolderNameRef.current?.focus();
		}
	}, [caseFolderNameEditable]);

	useEffect(() => {
		if (folderId.current === undefined) {
			navigate("/404");
			return;
		}
		handleGetCaseFolder();
		handleGetCaseFiles();
		handleGetCaseClient();
		return () => {
			handleUpdateLastOpenedDate();
		};
	}, []);

	/************************************************************/

	const handleGetCaseFolder = async () => {
		try {
			const response = await getCaseFolder(folderId.current!);
			if (response.ok) {
				const data: CaseFolderObj = await response.json();
				setCaseFolder(data);
				newCaseFolderName.current = data.name;
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleGetCaseFiles = async () => {
		try {
			const response = await getCaseFiles(folderId.current!);
			if (response.ok) {
				const data: CaseFileObj[] = await response.json();
				setCaseFiles(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleGetCaseClient = async () => {
		try {
			const response = await getCaseClient(folderId.current!);
			if (response.ok) {
				const data: ClientObj = await response.json();
				setClient(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleGetFileToView = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
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

	/************************************************************/

	const closeClientModal = (): void => {
		setClientModalOpen(false);
	};

	const toggleClientModal = (): void => {
		setClientModalOpen((prev) => !prev);
	};

	const closeGenerateModal = (): void => {
		setGenerateModalOpen(false);
	};

	const toggleGenerateModal = (): void => {
		setGenerateModalOpen((prev) => !prev);
	};

	const closeUploadModal = (): void => {
		setUploadModalOpen(false);
	};

	const toggleUploadModal = (): void => {
		setUploadModalOpen((prev) => !prev);
	};

	const closeViewFileModal = (): void => {
		setFileModalOpen(false);
	};

	/************************************************************/

	const handleUpdateCaseFolderName = async (folderId: string, newFolderName: string) => {
		try {
			const response = await updateCaseFolderName(folderId, newFolderName);
			if (response.ok) {
				const data: CaseFolderObj = await response.json();
				setCaseFolder(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleCaseFolderNameClick = () => {
		setCaseFolderNameEditable(true);
	};

	const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
		if (event.key !== "Enter") return;
		const { innerHTML } = event.target as HTMLHeadingElement;
		if (innerHTML.trim().length === 0) {
			document.getElementById("case-name")!.innerHTML = caseFolder.name;
		}
		caseFolderNameRef.current?.blur();
	};

	const handleCaseFolderNameBlur = (event: React.FocusEvent<HTMLHeadingElement>) => {
		const { innerHTML: newFolderName } = event.target;
		setCaseFolderNameEditable(false);
		if (newFolderName === caseFolder.name) {
			return;
		}
		handleUpdateCaseFolderName(folderId.current!, newFolderName);
	};

	/************************************************************/

	const handleUpdateLastOpenedDate = async (): Promise<void> => {
		try {
			const response = await updateLastOpenedDate(folderId.current!, Date.now());
			if (response.ok) {
				// for the future, maybe add a toast or something to confirm successful update
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const addUploadedFileToCaseFileArray = (uploadedFile: CaseFileObj): void => {
		setCaseFiles((prev) => [...prev, uploadedFile]);
	};

	const updateCaseFiles = (newCaseFileArray: CaseFileObj[]) => {
		setCaseFiles(newCaseFileArray);
	};

	/************************************************************/

	return (
		<SidebarLayout>
			<PageHeader className="gap-4">
				<img
					className="h-[58px] cursor-pointer"
					title="Click to view client info"
					src={UserIcon}
					onClick={toggleClientModal}
				/>
				<h1
					id="case-name"
					className="text-3xl font-bold text-white cursor-pointer"
					title="Click to edit folder name"
					contentEditable={caseFolderNameEditable}
					suppressContentEditableWarning={true}
					ref={caseFolderNameRef}
					onClick={handleCaseFolderNameClick}
					onBlur={handleCaseFolderNameBlur}
					onKeyDown={handleEnterKeyPress}
				>
					{newCaseFolderName.current}
				</h1>
			</PageHeader>

			<SearchBar cards={caseFiles} />

			<SortBarWithButtons>
				<SortBar
					initialWidth={450}
					minWidth={1111}
					options={CASE_FOLDER}
					documentCards={caseFiles}
					setDocumentCards={setCaseFiles}
				/>

				<div className="flex flex-row flex-wrap justify-end gap-3 w-fit">
					<PillButton name="Create" type="button" img={BtnIcon.PenPurple} />
					<PillButton name="Upload" type="button" img={BtnIcon.UploadPurple} onClick={toggleUploadModal} />
					<PillButton name="Translate" type="button" img={BtnIcon.SphereLatticePurple} />
					<PillSpecialButton
						name="Generate"
						type="button"
						img={BtnIcon.LightBulbPurple}
						onClick={toggleGenerateModal}
					/>

					{/* <PillButton name="Save" type="button" img={BtnIcon.SavePurple} onClick={handleSaveChanges} /> */}
				</div>
			</SortBarWithButtons>

			<CaseFileCards
				files={caseFiles}
				onClick={(event) => handleGetFileToView(event)}
				updateCaseFiles={updateCaseFiles}
			/>

			{uploadModalOpen && (
				<UploadModal
					caseFolderId={idFromParams!}
					closeUploadModal={closeUploadModal}
					addUploadedFileToCaseFileArray={addUploadedFileToCaseFileArray}
				/>
			)}

			{fileModalOpen && (
				<ViewCaseFileModal
					fileName={fileName.current}
					fileID={fileId.current}
					fileURL={fileUrl.current}
					closeModal={closeViewFileModal}
				/>
			)}

			{generateModalOpen && <GenerateModal closeModal={closeGenerateModal} files={caseFiles} />}

			{clientModalOpen && (
				<ClientModal
					client={{
						firstName: client.firstName,
						middleName: client.middleName,
						lastName: client.lastName,
						dateOfBirth: DateUtils.formatToYMD(client.dateOfBirth),
						sex: client.sex!,
						countryOfCitizenship: client.countryOfCitizenship,
						primaryLanguage: client.primaryLanguage,
					}}
					closeModal={closeClientModal}
				/>
			)}
		</SidebarLayout>
	);
}

export default CaseFolder;
