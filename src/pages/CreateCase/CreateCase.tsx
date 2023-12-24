import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFile from "./CaseFile";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditPenIcon from "../../assets/content-edit-pen.svg";
import { nanoid } from "nanoid/non-secure";
import UploadModal from "./UploadModal";
import { StorageReference } from "firebase/storage";
import StorageArray from "../../services/local-storage/storage-array";
import CaseFolder from "../../services/local-storage/case-folder";

interface UploadedFileObject {
	id: string;
	name: string;
	status: string;
	ref: Promise<StorageReference | null>;
}

function CreateCase() {
	const caseName = useRef("New Case");
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isCaseNameEditable, setIsCaseNameEditable] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFileObject[]>([]);

	// console.log(uploadedCaseFiles);

	const navigate = useNavigate();

	/**
	 * On initial load, checks if cases array exists in local storage.
	 * If not, creates and saves a cases array to local storage.
	 */
	useEffect(() => {
		const caseArrayExists = StorageArray.exists();
		if (!caseArrayExists) {
			StorageArray.init();
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

		caseName.current = textContent;
		setIsCaseNameEditable(false);
	};

	const handleCreateCase = (): void => {
		const newCaseObject = {
			id: nanoid(),
			name: caseName.current,
			status: "#53EF0A",
			deadline: "",
			labels: [],
			files: uploadedFiles,
		};
		CaseFolder.add(newCaseObject);
		navigate("/dashboard");
	};

	const updateUploadedFilesArray = (uploadedFileObject: UploadedFileObject): void =>
		setUploadedFiles((prev) => [...prev, uploadedFileObject]);

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<div className="flex flex-row items-end h-20 gap-2 mb-5">
				<span
					id="case-name"
					className="relative mt-10 mb-5 text-4xl font-bold border-b border-b-black top-5"
					contentEditable={isCaseNameEditable}
					suppressContentEditableWarning={true}
					onBlur={handleBlur}
				>
					{caseName.current}
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
						onClick={handleCreateCase}
					>
						<span>Create</span>
					</button>
				</div>
			</div>

			<CaseFile uploadedCaseFiles={uploadedFiles} />

			{isUploadModalOpen && (
				<UploadModal
					closeUploadModal={closeUploadModal}
					updateUploadedFilesArray={updateUploadedFilesArray}
				/>
			)}
		</div>
	);
}

export default CreateCase;
