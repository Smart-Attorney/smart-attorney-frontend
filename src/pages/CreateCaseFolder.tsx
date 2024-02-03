import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	FolderPurple,
	LightBulbPurple,
	PenPurple,
	SphereLatticePurple,
	UploadPurple,
} from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import ClientInfoModal from "../features/create-case-folder/ClientModal/ClientInfoModal";
import DropArea from "../features/create-case-folder/DropArea";
import FileForUploadCards from "../features/create-case-folder/FileForUploadCards";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import Firebase from "../services/cloud-storage/firebase";
import Database from "../services/database";
import nanoid from "../services/nanoid";
import { NEW_CASE } from "../utils/constants/sort-options";
import { CaseFileObj, ClientInfoObj, FileForUploadObj } from "../utils/types";

function CreateCaseFolder() {
	const navigate = useNavigate();
	const db = new Database();

	const caseFolderId = useRef("");
	const caseFolderNameRef = useRef<HTMLHeadingElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [caseFolderName, setCaseFolderName] = useState<string>("New Case |");
	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);

	const [clientInfoModalOpen, setClientInfoModalOpen] = useState<boolean>(true);

	// removed state setter to appease compiler, add back later
	const [clientInfo] = useState<ClientInfoObj>({
		firstName: "",
		lastName: "",
		sex: null,
		primaryLanguage: "",
		countryOfCitizenship: "",
		dateOfBirth: "",
	});

	useEffect(() => {
		if (caseFolderId.current.length < 1) {
			caseFolderId.current = nanoid();
		}
	}, []);

	/**
	 * On initial load, checks if cases array exists in local storage.
	 * If not, creates and saves a cases array to local storage.
	 */
	useEffect(() => {
		const caseArray = db.getCaseArray();
		if (caseArray === null) {
			db.initNewArray();
		}
	}, []);

	const handleCloseClientInfoModal = () => {
		setClientInfoModalOpen(false);
	};

	// const handleClientInfoInput = (event: React.FormEvent<HTMLInputElement>): void => {
	// 	console.log(event);
	// }

	const handleOpenFileBrowser = (): void => {
		inputRef.current?.click();
	};

	/* Clears the input field on initial click focus to save user the hassle of backspacing. */
	const handeClickOnCaseName = (): void => {
		if (caseFolderName === "New Case |") {
			setCaseFolderName("");
		}
	};

	const handleFocusOffCaseName = (event: React.FocusEvent<HTMLHeadingElement>): void => {
		const { innerText } = event.target;
		if (innerText.trim() === "") {
			setCaseFolderName("New Case |");
		} else {
			setCaseFolderName(innerText);
		}
	};

	const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
		if (event.key !== "Enter") return;
		const { innerText } = event.target as HTMLHeadingElement;
		if (innerText.trim() === "") {
			caseFolderNameRef.current?.blur();
			setCaseFolderName("New Case |");
		} else {
			caseFolderNameRef.current?.blur();
			setCaseFolderName(innerText);
		}
	};

	const addFilesToFilesForUploadArray = (filesFromUpload: FileList): void => {
		for (let i = 0; i < filesFromUpload.length; i++) {
			setFilesForUpload((prev) => [
				...prev,
				{
					id: nanoid(),
					data: filesFromUpload[i],
					selected: false,
				},
			]);
		}
	};

	const removeFileFromFilesForUploadArray = (id: string): void => {
		setFilesForUpload((prev) => prev.filter((file) => file.id !== id));
	};

	const uploadFilesToCloudStorage = async (filesArray: FileForUploadObj[]): Promise<null | CaseFileObj[]> => {
		if (filesArray === null) return null;
		if (filesArray.length < 1) return null;

		let uploadedFiles: CaseFileObj[] = [];

		for (let i = 0; i < filesArray.length; i++) {
			const uploadedFileRef = await Firebase.uploadFile(
				filesArray[i].data,
				filesArray[i].id,
				caseFolderId.current
			);
			const uploadedFileUrl = await Firebase.getFileByRef(uploadedFileRef);
			const uploadedFileObject = {
				id: filesArray[i].id,
				name: filesArray[i].data.name,
				createdDate: Date.now(),
				lastOpenedDate: Date.now(),
				status: "Submitted",
				url: uploadedFileUrl ? uploadedFileUrl : "",
			};

			uploadedFiles.push(uploadedFileObject);
		}

		return uploadedFiles;
	};

	const handleCreateCaseFolder = async (): Promise<void> => {
		if (caseFolderName.trim() === "New Case |" || caseFolderName.trim().length === 0) {
			alert("Please change the case name before creating.");
			return;
		}

		// Checks if there are files to upload to prevent unnecessary calls to cloud service.
		let uploadedFilesArray: CaseFileObj[];
		if (filesForUpload === null || filesForUpload.length === 0) {
			uploadedFilesArray = [];
		} else {
			uploadedFilesArray = (await uploadFilesToCloudStorage(filesForUpload)) as CaseFileObj[];
		}

		const newCaseFolderObject = {
			id: caseFolderId.current,
			name: caseFolderName,
			createdDate: Date.now(),
			lastOpenedDate: Date.now(),
			status: "#53EF0A",
			deadline: "",
			labels: [],
			files: uploadedFilesArray,
			clientInfo: clientInfo,
		};

		db.addNewCaseFolder(newCaseFolderObject);
		navigate("/dashboard");
	};

	return (
		<SidebarLayout>
			<PageHeader className="gap-4">
				<img className="h-[58px]" src={UserIcon} />
				<h1
					id="case-name"
					className="text-3xl font-bold text-white"
					contentEditable={true}
					suppressContentEditableWarning={true}
					ref={caseFolderNameRef}
					onClick={handeClickOnCaseName}
					onBlur={handleFocusOffCaseName}
					onKeyDown={handleEnterKeyPress}
				>
					{caseFolderName}
				</h1>
			</PageHeader>

			<SearchBar />

			<SortBarWithButtons>
				<SortBar options={NEW_CASE} />

				<div className="flex flex-row flex-wrap justify-end gap-3 w-[516px]">
					<PillButton name="Create" img={PenPurple} />
					<PillButton name="Upload" img={UploadPurple} onClick={handleOpenFileBrowser} />
					<PillButton name="Translate" img={SphereLatticePurple} />
					<PillSpecialButton name="Generate" img={LightBulbPurple} />
					<PillButton name="Create Case" img={FolderPurple} onClick={handleCreateCaseFolder} />
				</div>
			</SortBarWithButtons>

			{filesForUpload.length > 0 && (
				<FileForUploadCards
					filesForUpload={filesForUpload}
					removeFileFromFilesForUploadArray={removeFileFromFilesForUploadArray}
				/>
			)}

			<DropArea
				ref={inputRef}
				style={{
					zIndex: filesForUpload.length > 0 ? -5 : 5,
					display: filesForUpload.length > 0 ? "none" : "flex",
				}}
				handleOpenFileBrowser={handleOpenFileBrowser}
				addFilesToFilesForUploadArray={addFilesToFilesForUploadArray}
			/>

			{clientInfoModalOpen && <ClientInfoModal closeModal={handleCloseClientInfoModal} />}
		</SidebarLayout>
	);
}

export default CreateCaseFolder;
