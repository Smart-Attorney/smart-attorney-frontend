import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// TODO: replace this pencil icon with something else or remove entirely
import PencilIcon from "../assets/pencil.png";
import { UserIcon } from "../assets/smart-attorney-figma";
import {
	FolderPurple,
	LightBulbPurple,
	PenPurple,
	SphereLatticePurple,
	UploadPurple,
} from "../assets/smart-attorney-figma/buttons";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import DropArea from "../features/create-case-folder/DropArea";
import FileForUploadCards from "../features/create-case-folder/FileForUploadCards";
import SidebarLayout from "../layouts/SidebarLayout";
import Firebase from "../services/cloud-storage/firebase";
import Database from "../services/database";
import nanoid from "../services/nanoid";
import { NEW_CASE_SORT_OPTIONS } from "../utils/constants";
import { CaseFileObj, FileForUploadObj,CaseFolderObj } from "../utils/types";
import Popup from "../components/Popup";


function CreateCaseFolder() {
	const navigate = useNavigate();
	const db = new Database();

	const caseFolderId = useRef("");
	const caseFolderName = useRef("New Case");
	const inputRef = useRef<HTMLInputElement>(null);
	
	const [showPopup, setShowPopup] = useState(false);
	const [caseNameEditable, setCaseNameEditable] = useState(false);
	const [filesForUpload, setFilesForUpload] = useState<FileForUploadObj[]>([]);
	const [clientFirstName, setClientFirstName] = useState("");
	const [clientLastName, setClientLastName] = useState("");
	const [clientSex, setClientSex] = useState("");
    const [clientPrimaryLanguage, setClientPrimaryLanguage] = useState("");
    const [clientCountryOfCitizenship, setClientCountryOfCitizenship] = useState("");
    const [clientDOB, setClientDOB] = useState<Date | null>(null);


    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSaveClientDetails = () => {
        // Perform validation if needed
        // Save client details or perform other actions
        closePopup();
    };

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

	const handleOpenFileBrowser = (): void => {
		inputRef.current?.click();
	};

	const toggleCaseNameEditable = (): void => {
		setCaseNameEditable(true);
		/**
		 * TODO:
		 * Replace with useRef().
		 */
		const caseName = document.getElementById("case-name");

		setTimeout(() => {
			caseName?.focus();
		}, 100);
	};

	const handleBlur = (event: React.FocusEvent<HTMLSpanElement>): void => {
		const { textContent } = event.nativeEvent.target as HTMLElement;
		if (textContent === null) return;

		caseFolderName.current = textContent;
		setCaseNameEditable(false);
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
		if (caseFolderName.current === "New Case") {
			alert("Please change the case name before creating.");
			return;
		}
	
		const uploadedFilesArray = await uploadFilesToCloudStorage(filesForUpload);
	
		if (uploadedFilesArray === null) {
			alert("Encountered an issue when attempting to upload files.");
			return;
		}
	
		const newCaseFolderObject: CaseFolderObj = {
			id: caseFolderId.current,
			name: caseFolderName.current,
			createdDate: Date.now(),
			lastOpenedDate: Date.now(),
			status: "#53EF0A",
			deadline: "",
			labels: [],
			files: uploadedFilesArray,
			clientFirstName: clientFirstName,
			clientLastName: clientLastName,
			clientSex: clientSex,
			clientPrimaryLanguage: clientPrimaryLanguage,
			clientCountryOfCitizenship: clientCountryOfCitizenship,
			clientDOB: clientDOB,
		};
	
		db.addNewCaseFolder(newCaseFolderObject);
		navigate("/dashboard");
	};
	

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-col w-full gap-6 mx-auto">
					<div className="flex flex-row items-end h-20 gap-4 mb-5">
						<img className="relative top-2 h-14" src={UserIcon} />
						<span
							id="case-name"
							className="relative mt-10 mb-5 text-4xl font-bold text-white border-b border-b-white top-5"
							contentEditable={caseNameEditable}
							suppressContentEditableWarning={true}
							onBlur={handleBlur}
						>
							{caseFolderName.current}
						</span>

						<img
							src={PencilIcon}
							width="30px"
							className="cursor-pointer mt-7"
							onClick={toggleCaseNameEditable}
						/>
					</div>
					<SearchBar />

					<div className="flex flex-row items-center justify-between w-full gap-8">
						<SortBar options={NEW_CASE_SORT_OPTIONS} />

						<div className="flex flex-row flex-wrap justify-end gap-3">
							<PillButton name="Create" img={PenPurple} />
							<PillButton name="Upload" img={UploadPurple} onClick={handleOpenFileBrowser} />
							<PillButton name="Translate" img={SphereLatticePurple} />
							<PillSpecialButton name="Generate" img={LightBulbPurple} />
							<PillButton name="Create Case" img={FolderPurple} onClick={handleCreateCaseFolder} />
						</div>
					</div>

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
				</div>
			</div>
		</SidebarLayout>
	);
}

export default CreateCaseFolder;
