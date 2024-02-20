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
import { NEW_CASE } from "../utils/constants/sort-options";
import { FileForUploadObj, SexOptions } from "../utils/types";

function CreateCaseFolder() {
	const navigate = useNavigate();

	const caseFolderId = useRef<string>("");
	useEffect(() => {
		if (caseFolderId.current.length < 1) {
			caseFolderId.current = nanoid(8);
		}
	}, []);

	const caseFolderNameRef = useRef<HTMLHeadingElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [caseFolderName, setCaseFolderName] = useState<string>("New Case |");
	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);
	const [clientModalOpen, setClientModalOpen] = useState<boolean>(true);
	const [client, setClient] = useState<ClientInfoForm>({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		sex: "",
		countryOfCitizenship: "",
		primaryLanguage: "",
	});

	const handleCloseClientModal = () => {
		setClientModalOpen(false);
	};

	const toggleClientModal = () => {
		setClientModalOpen((prev) => !prev);
	};

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

	const handleCreateCaseFolder = async (): Promise<void> => {
		if (caseFolderName.trim() === "New Case |" || caseFolderName.trim().length === 0) {
			alert("Please change the case name before creating.");
			return;
		}

		const filesFormData = new FormData();
		filesFormData.append("caseFolderId", caseFolderId.current);
		for (let i = 0; i < filesForUpload.length; i++) {
			filesFormData.append("files[]", filesForUpload[i].data, `${filesForUpload[i].id}/${filesForUpload[i].data.name}`);
		}

		const newClient: CreateClientDTO = {
			firstName: client.firstName,
			lastName: client.lastName,
			dateOfBirth: Date.parse(client.dateOfBirth),
			sex: client.sex as SexOptions,
			countryOfCitizenship: client.countryOfCitizenship,
			primaryLanguage: client.primaryLanguage,
			caseFolderId: caseFolderId.current,
		};

		const newCaseFolder: CreateCaseFolderDTO = {
			folderId: caseFolderId.current,
			folderName: caseFolderName,
		};

		try {
			if (filesForUpload.length > 0) {
				const caseFolderCreated = await createCaseFolder(newCaseFolder);
				const clientCreated = await createClient(newClient);
				const caseFilesCreated = await createCaseFiles(filesFormData);
				if (caseFolderCreated.ok && clientCreated.ok && caseFilesCreated.ok) {
					navigate("/dashboard");
				}
			} else {
				const caseFolderCreated = await createCaseFolder(newCaseFolder);
				const clientCreated = await createClient(newClient);
				if (caseFolderCreated.ok && clientCreated.ok) {
					navigate("/dashboard");
				}
			}
		} catch (error) {
			alert(error);
		}
	};

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
					<PillButton name="Create" type="button" img={PenPurple} />
					<PillButton name="Upload" type="button" img={UploadPurple} onClick={handleOpenFileBrowser} />
					<PillButton name="Translate" type="button" img={SphereLatticePurple} />
					<PillSpecialButton name="Generate" type="button" img={LightBulbPurple} />
					<PillButton name="Create Case" type="button" img={FolderPurple} onClick={handleCreateCaseFolder} />
				</div>
			</SortBarWithButtons>

			{filesForUpload.length > 0 && (
				<FileForUploadCards
					filesForUpload={filesForUpload}
					removeFromFilesForUploadArray={removeFromFilesForUploadArray}
				/>
			)}

			<DropArea
				ref={inputRef}
				style={{
					zIndex: filesForUpload.length > 0 ? -5 : 5,
					display: filesForUpload.length > 0 ? "none" : "flex",
				}}
				handleOpenFileBrowser={handleOpenFileBrowser}
				addToFilesForUploadArray={addToFilesForUploadArray}
			/>

			{clientModalOpen && <ClientInfoModal client={client} setClient={setClient} closeModal={handleCloseClientModal} />}
		</SidebarLayout>
	);
}

export default CreateCaseFolder;
