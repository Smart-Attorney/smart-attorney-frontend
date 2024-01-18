import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PencilIcon from "../assets/pencil.png";
import Ellipse8Logo from "../assets/smart-attorney-figma/Ellipse 8.png";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import UploadedFileCards from "../features/create-case-folder/UploadedFileCards";
import FileUploadModal from "../features/create-case-folder/file-upload/FileUploadModal";
import SidebarLayout from "../layouts/SidebarLayout";
import Database from "../services/database";
import nanoid from "../services/nanoid";
import { NEW_CASE_SORT_OPTIONS } from "../utils/constants";
import { CaseFileObj } from "../utils/types";

function CreateCaseFolder() {
	const navigate = useNavigate();
	const db = new Database();
	const caseFolderId = useRef("");
	const caseFolderName = useRef("New Case");
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isCaseNameEditable, setIsCaseNameEditable] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<CaseFileObj[]>([]);

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

	const toggleUploadModal = (): void => setIsUploadModalOpen((prev) => !prev);

	const closeUploadModal = (): void => setIsUploadModalOpen(false);

	const toggleCaseNameEditable = (): void => {
		setIsCaseNameEditable(true);
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
		setIsCaseNameEditable(false);
	};

	const handleCreateCaseFolder = (): void => {
		if (caseFolderName.current === "New Case") {
			alert("Please change the case name before creating.");
			return;
		}
		const newCaseObject = {
			id: caseFolderId.current,
			name: caseFolderName.current,
			createdDate: Date.now(),
			lastOpenedDate: Date.now(),
			status: "#53EF0A",
			deadline: "",
			labels: [],
			files: uploadedFiles,
		};
		db.addNewCaseFolder(newCaseObject);
		navigate("/dashboard");
	};

	const updateUploadedFilesArray = (uploadedFile: CaseFileObj): void =>
		setUploadedFiles((prev) => [...prev, uploadedFile]);

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-col w-full gap-6 mx-auto">
					<div className="flex flex-row items-end h-20 gap-4 mb-5">
						<img className="relative top-2 h-14" src={Ellipse8Logo} />
						<span
							id="case-name"
							className="relative mt-10 mb-5 text-4xl font-bold text-white border-b border-b-white top-5"
							contentEditable={isCaseNameEditable}
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

						<div className="flex flex-row flex-wrap justify-end gap-8">
							<button
								className="bg-white h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
								type="button"
								name="Team"
							>
								<span>Team</span>
							</button>
							<button
								className="bg-white h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
								type="button"
								name="Upload"
								onClick={toggleUploadModal}
							>
								<span>Upload</span>
							</button>
							<button
								className="bg-white h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
								type="button"
								name="Create"
								onClick={handleCreateCaseFolder}
							>
								<span>Create</span>
							</button>
						</div>
					</div>

					<UploadedFileCards uploadedCaseFiles={uploadedFiles} />

					{isUploadModalOpen && (
						<FileUploadModal
							caseFolderId={caseFolderId.current}
							closeUploadModal={closeUploadModal}
							updateUploadedFilesArray={updateUploadedFilesArray}
						/>
					)}
				</div>
			</div>
		</SidebarLayout>
	);
}

export default CreateCaseFolder;
