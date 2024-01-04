import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import UploadedFileCards from "./UploadedFileCards";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditPenIcon from "../../assets/content-edit-pen.svg";
import FileUploadModal from "../../features/file-upload/FileUploadModal";
import Database from "../../services/database";
import { nanoid } from "nanoid";
import { CaseFileObj } from "../../utils/types";

function CreateCaseFolder() {
	const navigate = useNavigate();
	const db = new Database();
	const caseFolderId = useRef("");
	const caseFolderName = useRef("New Case");
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isCaseNameEditable, setIsCaseNameEditable] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<CaseFileObj[]>([]);

	// console.log(uploadedCaseFiles);

	useEffect(() => {
		if (caseFolderId.current.length < 1) {
			caseFolderId.current = nanoid(16);
		}
	}, []);

	/**
	 * On initial load, checks if cases array exists in local storage.
	 * If not, creates and saves a cases array to local storage.
	 */
	useEffect(() => {
		document.body.style.background = "linear-gradient(to bottom, #000273, #000000)";
		const caseArray = db.getCaseArray();
		if (caseArray === null) {
			db.initNewArray();
		}
		return () => {
			document.body.style.background = "";
		};
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
		const newCaseObject = {
			id: caseFolderId.current,
			name: caseFolderName.current,
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
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-row items-end h-20 gap-2 mb-5">
					<span
						id="case-name"
						className="relative mt-10 mb-5 text-4xl font-bold border-b border-b-black top-5"
						contentEditable={isCaseNameEditable}
						suppressContentEditableWarning={true}
						onBlur={handleBlur}
						style={{ color: "#FFFFFF" }}
					>
						{caseFolderName.current}
					</span>

					<img
						src={EditPenIcon}
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
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
							type="button"
							name="Team"
						>
							<span>Team</span>
						</button>
						<button
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
							type="button"
							name="Upload"
							onClick={toggleUploadModal}
						>
							<span>Upload</span>
						</button>
						<button
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
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
	);
}

export default CreateCaseFolder;
