import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightBulbPurple, PenPurple, SphereLatticePurple, UploadPurple } from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import ClientModal from "../features/create-case-folder/ClientModal/ClientInfoModal";
import DropArea from "../features/create-case-folder/DropArea";
import FileForUploadCards from "../features/create-case-folder/FileForUploadCards";
import { CreateCaseDTO, createCase } from "../features/create-case-folder/api/create-case";
import { CreateClientDTO, createClient } from "../features/create-case-folder/api/create-client";
import { createDocuments } from "../features/create-case-folder/api/create-documents";
import uploadDocuments from "../features/uploadDocument/uploadDocuments";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { nanoid } from "../lib/nanoid";
import { CaseObj, ClientForm, Sex, UploadFile } from "../types/api";
import { CaseUtils } from "../utils/case-utils";
import { NEW_CASE } from "../utils/constants/sort-options";

function CreateCaseFolder() {
	const navigate = useNavigate();

	const dropAreaRef = useRef<HTMLInputElement>(null);
	const caseNameRef = useRef<HTMLHeadingElement>(null);

	const currentCaseCount = CaseUtils.getCaseCount();
	const defaultCaseName = `Case Folder ${currentCaseCount + 1}`;
	const [caseName, setCaseName] = useState<string>(defaultCaseName);
	const [isCaseNameEditable, setIsCaseNameEditable] = useState<boolean>(false);

	const [clientModalOpen, setClientModalOpen] = useState<boolean>(true);
	const [client, setClient] = useState<ClientForm>({
		firstName: "",
		middleName: "",
		lastName: "",
		dateOfBirth: "",
		sex: "",
		countryOfCitizenship: "",
		primaryLanguage: "",
	});

	const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

	useEffect(() => {
		if (isCaseNameEditable) {
			caseNameRef.current?.focus();
		}
	}, [isCaseNameEditable]);

	/************************************************************/

	const createNewCase = async (): Promise<void> => {
		/* Allows the user to create a case folder without changing the default case name. */
		// if (caseFolderName.trim() === defaultCaseName) {
		// 	alert("Please change the default case name before creating.");
		// 	return;
		// }
		if (caseName.trim().length === 0) {
			alert("Case name cannot be blank. Please change case name before creating.");
			return;
		}
		let isClientCreated: boolean = false;
		let areDocumentsCreated: boolean = false;
		try {
			const newCaseId = await handleCreateCase();
			if (newCaseId) {
				isClientCreated = await handleCreateClient(newCaseId);
				areDocumentsCreated = await handleCreateDocuments(newCaseId);
			}
		} catch (error) {
			alert(error);
		}
		if (isClientCreated && areDocumentsCreated) {
			navigate("/dashboard");
		}
	};

	const handleCreateCase = async (): Promise<string | null> => {
		const newCase: CreateCaseDTO = {
			name: caseName,
		};
		try {
			const response = await createCase(newCase);
			if (response.ok) {
				const data: CaseObj = await response.json();
				return data.id;
			}
		} catch (error) {
			alert(error);
		}
		return null;
	};

	const handleCreateClient = async (caseId: string): Promise<boolean> => {
		const newClient: CreateClientDTO = {
			firstName: client.firstName,
			middleName: client.middleName,
			lastName: client.lastName,
			dateOfBirth: client.dateOfBirth === "" ? Date.parse("12/10/1815") : Date.parse(client.dateOfBirth),
			sex: client.sex === "" ? "Other" : (client.sex as Sex),
			countryOfCitizenship: client.countryOfCitizenship,
			primaryLanguage: client.primaryLanguage,
		};
		try {
			const response = await createClient(caseId, newClient);
			if (response.ok) {
				return true;
			}
		} catch (error) {
			alert(error);
		}
		return false;
	};

	const handleCreateDocuments = async (caseId: string): Promise<boolean> => {
		if (uploadFiles.length === 0) return true;
		const filesData = new FormData();
		filesData.append("caseFolderId", caseId);
		for (let i = 0, n = uploadFiles.length; i < n; i++) {
			filesData.append("files[]", uploadFiles[i].data, `${uploadFiles[i].id}/${uploadFiles[i].data.name}`);
		}
		try {
			const response = await createDocuments(caseId, filesData);
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
		if (caseName === defaultCaseName) {
			setCaseName("");
		}
		setIsCaseNameEditable(true);
	};

	const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
		if (event.key !== "Enter") return;
		caseNameRef.current?.blur();
		setIsCaseNameEditable(false);
	};

	const handleCaseNameBlur = (event: React.FocusEvent<HTMLHeadingElement>): void => {
		const { innerText } = event.target;
		if (innerText.trim() === "") {
			setCaseName(defaultCaseName);
		} else {
			setCaseName(innerText);
		}
		setIsCaseNameEditable(false);
	};

	/************************************************************/

	const handleOpenFileBrowser = (): void => {
		dropAreaRef.current?.click();
	};

	// const addToUploadFilesArray = (filesFromUser: FileList): void => {
	// 	for (let i = 0, n = filesFromUser.length; i < n; i++) {
	// 		setFilesForUpload((prev) => [
	// 			...prev,
	// 			{
	// 				id: nanoid(20),
	// 				data: filesFromUser[i],
	// 			},
	// 		]);
	// 	}
	// };

	const removeFromUploadFilesArray = (fileId: string): void => {
		setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
	};

	const handleUpload = (fileList: FileList) => {
		const fileArr = Array.from(fileList);
		uploadDocuments(fileArr)
			.then((res) => {
				if (Array.isArray(res)) {
					setUploadFiles((prev) => [
						...prev,
						...fileArr.map((_file, i) => ({
							id: nanoid(20),
							data: fileList[i],
						})),
					]);
				}
			})
			.catch((err) => {
				window.alert("Failed to Upload Files");
				console.log(err);
			});
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
					contentEditable={isCaseNameEditable}
					suppressContentEditableWarning={true}
					ref={caseNameRef}
					onClick={handeClickOnCaseName}
					onBlur={handleCaseNameBlur}
					onKeyDown={handleEnterKeyPress}
				>
					{caseName}
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

			{uploadFiles.length > 0 && (
				<FileForUploadCards uploadFiles={uploadFiles} removeFromUploadFilesArray={removeFromUploadFilesArray} />
			)}

			<DropArea
				ref={dropAreaRef}
				style={{
					zIndex: uploadFiles.length > 0 ? -5 : 5,
					display: uploadFiles.length > 0 ? "none" : "flex",
				}}
				handleOpenFileBrowser={handleOpenFileBrowser}
				// addToFilesForUploadArray={addToFilesForUploadArray}
				addToUploadFilesArray={handleUpload}
			/>

			{clientModalOpen && (
				<ClientModal
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
