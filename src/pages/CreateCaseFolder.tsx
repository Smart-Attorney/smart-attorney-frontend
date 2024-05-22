import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightBulbPurple, PenPurple, SphereLatticePurple, UploadPurple } from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import ClientInfoModal, { ClientInfoForm } from "../features/create-case-folder/ClientModal/ClientInfoModal";
import DropArea from "../features/create-case-folder/DropArea";
import FileForUploadCards from "../features/create-case-folder/FileForUploadCards";
import { createCaseFiles } from "../features/create-case-folder/api/create-case-files";
import { CreateCaseFolderDTO, createCaseFolder } from "../features/create-case-folder/api/create-case-folder";
import { CreateClientDTO, createClient } from "../features/create-case-folder/api/create-client";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { nanoid } from "../lib/nanoid";
import { CaseFolderCount } from "../utils/case-folder-count";
import { NEW_CASE } from "../utils/constants/sort-options";
import { FileForUploadObj, SexOptions } from "../utils/types";

function CreateCaseFolder() {
	const navigate = useNavigate();

	const caseFolderId = useRef<string>("");

	const dropAreaRef = useRef<HTMLInputElement>(null);

	const currentFolderCount = CaseFolderCount.get();
	const defaultCaseName = `Case Folder ${currentFolderCount + 1}`;

	const caseFolderNameRef = useRef<HTMLHeadingElement>(null);
	const [caseFolderName, setCaseFolderName] = useState<string>(defaultCaseName);
	const [caseFolderNameEditable, setCaseFolderNameEditable] = useState<boolean>(false);

	const [clientModalOpen, setClientModalOpen] = useState<boolean>(true);
	const [client, setClient] = useState<ClientInfoForm>({
		firstName: "",
		middleName: "",
		lastName: "",
		dateOfBirth: "",
		sex: "",
		countryOfCitizenship: "",
		primaryLanguage: "",
	});

	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);

	useEffect(() => {
		if (caseFolderId.current.length < 1) {
			caseFolderId.current = nanoid(8);
		}
	}, []);

	useEffect(() => {
		if (caseFolderNameEditable) {
			caseFolderNameRef.current?.focus();
		}
	}, [caseFolderNameEditable]);

	/************************************************************/

	const createNewCase = async (): Promise<void> => {
		/* Allows the user to create a case folder without changing the default case name. */
		// if (caseFolderName.trim() === defaultCaseName) {
		// 	alert("Please change the default case name before creating.");
		// 	return;
		// }
		if (caseFolderName.trim().length === 0) {
			alert("Case name cannot be blank. Please change case name before creating.");
			return;
		}
		if (filesForUpload.length > 0) {
			const caseFolderCreated = await handleCreateNewCaseFolder();
			const clientCreated = await handleCreateNewClient();
			const caseFilesCreated = await handleCreateNewCaseFiles();
			if (caseFolderCreated && clientCreated && caseFilesCreated) {
				navigate("/dashboard");
			}
		} else {
			const caseFolderResponse = await handleCreateNewCaseFolder();
			const clientResponse = await handleCreateNewClient();
			if (caseFolderResponse && clientResponse) {
				navigate("/dashboard");
			}
		}
	};

	const handleCreateNewCaseFolder = async () => {
		const newCaseFolder: CreateCaseFolderDTO = {
			folderId: caseFolderId.current,
			folderName: caseFolderName,
		};
		try {
			const response = await createCaseFolder(newCaseFolder);
			if (response.ok) {
				return true;
			}
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const handleCreateNewClient = async () => {
		const newClient: CreateClientDTO = {
			firstName: client.firstName,
			middleName: client.middleName,
			lastName: client.lastName,
			dateOfBirth: client.dateOfBirth === "" ? Date.parse("12/10/1815") : Date.parse(client.dateOfBirth),
			sex: client.sex === "" ? "Other" : (client.sex as SexOptions),
			countryOfCitizenship: client.countryOfCitizenship,
			primaryLanguage: client.primaryLanguage,
			caseFolderId: caseFolderId.current,
		};
		try {
			const response = await createClient(newClient);
			if (response.ok) {
				return true;
			}
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const handleCreateNewCaseFiles = async () => {
		const filesFormData = new FormData();
		filesFormData.append("caseFolderId", caseFolderId.current);
		for (let i = 0; i < filesForUpload.length; i++) {
			filesFormData.append("files[]", filesForUpload[i].data, `${filesForUpload[i].id}/${filesForUpload[i].data.name}`);
		}
		try {
			const response = await createCaseFiles(filesFormData);
			if (response.ok) {
				return true;
			}
		} catch (error) {
			alert(error);
		}
		return false;
	};

	/************************************************************/

	const closeClientModal = () => {
		setClientModalOpen(false);
	};

	const toggleClientModal = () => {
		setClientModalOpen((prev) => !prev);
	};

	/************************************************************/

	/* Clears the input field on initial click focus to save user the hassle of backspacing. */
	const handeClickOnCaseName = (): void => {
		if (caseFolderName === defaultCaseName) {
			setCaseFolderName("");
		}
		setCaseFolderNameEditable(true);
	};

	const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
		if (event.key !== "Enter") return;
		caseFolderNameRef.current?.blur();
		setCaseFolderNameEditable(false);
	};

	const handleCaseNameBlur = (event: React.FocusEvent<HTMLHeadingElement>): void => {
		const { innerText } = event.target;
		if (innerText.trim() === "") {
			setCaseFolderName(defaultCaseName);
		} else {
			setCaseFolderName(innerText);
		}
		setCaseFolderNameEditable(false);
	};

	/************************************************************/

	const handleOpenFileBrowser = (): void => {
		dropAreaRef.current?.click();
	};

	const addToFilesForUploadArray = (filesFromUser: FileList): void => {
		for (let i = 0; i < filesFromUser.length; i++) {
			setFilesForUpload((prev) => [
				...prev,
				{
					id: nanoid(8),
					data: filesFromUser[i],
				},
			]);
		}
	};

	const removeFromFilesForUploadArray = (fileId: string): void => {
		setFilesForUpload((prev) => prev.filter((file) => file.id !== fileId));
	};

	/************************************************************/

	return (
		<SidebarLayout>
			<PageHeader className="gap-4">
				<img
					className="h-[58px] cursor-pointer"
					src={UserIcon}
					onClick={toggleClientModal}
					title="Click to edit client info"
				/>
				<h1
					id="case-name"
					className="text-3xl font-bold text-white cursor-pointer"
					title="Click to edit case name"
					contentEditable={caseFolderNameEditable}
					suppressContentEditableWarning={true}
					ref={caseFolderNameRef}
					onClick={handeClickOnCaseName}
					onBlur={handleCaseNameBlur}
					onKeyDown={handleEnterKeyPress}
				>
					{caseFolderName}
				</h1>
			</PageHeader>

			<SearchBar />

			<SortBarWithButtons>
				<SortBar initialWidth={450} minWidth={1111} options={NEW_CASE} />

				<div className="flex flex-row flex-wrap justify-end gap-3 w-fit">
					<PillButton name="Create" type="button" img={PenPurple} />
					<PillButton name="Upload" type="button" img={UploadPurple} onClick={handleOpenFileBrowser} />
					<PillButton name="Translate" type="button" img={SphereLatticePurple} />
					<PillSpecialButton name="Generate" type="button" img={LightBulbPurple} />

					{/* <PillButton name="Create Case" type="button" img={FolderPurple} onClick={createNewCase} /> */}
				</div>
			</SortBarWithButtons>

			{filesForUpload.length > 0 && (
				<FileForUploadCards
					filesForUpload={filesForUpload}
					removeFromFilesForUploadArray={removeFromFilesForUploadArray}
				/>
			)}

			<DropArea
				ref={dropAreaRef}
				style={{
					zIndex: filesForUpload.length > 0 ? -5 : 5,
					display: filesForUpload.length > 0 ? "none" : "flex",
				}}
				handleOpenFileBrowser={handleOpenFileBrowser}
				addToFilesForUploadArray={addToFilesForUploadArray}
			/>

			{clientModalOpen && (
				<ClientInfoModal
					client={client}
					setClient={setClient}
					closeModal={closeClientModal}
					createCase={createNewCase}
				/>
			)}
		</SidebarLayout>
	);
}

export default CreateCaseFolder;
