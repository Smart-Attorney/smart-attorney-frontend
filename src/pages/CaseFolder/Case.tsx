import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import CaseFileCards from "./CaseFileCards";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewCaseFileModal from "./ViewCaseFileModal";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import storage from "../../services/apis/firebase";

interface UploadedFileObject {
	id: string;
	name: string;
	status: string;
	ref: Promise<StorageReference>;
}

interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
	labels: string[];
	files: UploadedFileObject[];
}

function Case() {
	const { id } = useParams();
	const folderID = useRef(id);

	const fileID = useRef<string>("");
	const fileName = useRef<string | null>("");
	const fileURL = useRef<string>("");

	const navigate = useNavigate();

	const [caseFiles, setCaseFiles] = useState<Case>();
	// console.log(caseFiles);
	const [isFileViewModalOpen, setIsFileViewModalOpen] = useState(false);

	useEffect(() => {
		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);

		const findFolderByID = () => {
			for (let i = 0; i < storedCaseArray.length; i++) {
				if (storedCaseArray[i].id === folderID.current) {
					return true;
				}
			}
			return false;
		};

		if (findFolderByID()) {
			for (let i = 0; i < storedCaseArray.length; i++) {
				if (storedCaseArray[i].id === folderID.current) {
					setCaseFiles(storedCaseArray[i]);
					break;
				}
			}
		} else {
			navigate("/404");
		}
	}, []);

	const getFileFromCloud = async (fileExt: string, fileID: string, fileName: string) => {
		try {
			const fileRef = ref(storage, `${fileExt}/${fileID}_${fileName}`);
			const url = await getDownloadURL(fileRef);
			return url;
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickViewCaseFile = async (event: React.MouseEvent<HTMLParagraphElement>) => {
		const { id, textContent } = event.target as HTMLParagraphElement;

		const splitFileName = textContent!.split(".");
		const fileExt = splitFileName[splitFileName.length - 1];

		const fileUrl = await getFileFromCloud(fileExt, id, textContent!);

		fileName.current = textContent;
		fileID.current = id;
		fileURL.current = fileUrl!;

		setIsFileViewModalOpen(true);
	};

	const handleClickCloseViewCaseFile = () => {
		setIsFileViewModalOpen(false);
	};

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<div className="flex flex-row items-end h-20 gap-2 mb-5">
				<span
					id="case-name"
					className="relative mt-10 mb-5 text-4xl font-bold top-5"
					suppressContentEditableWarning={true}
				>
					{caseFiles?.name}
				</span>
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
					>
						<span>Upload</span>
					</button>
					<button
						className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
						type="button"
						name="Create"
						onClick={() => navigate("/dashboard")}
					>
						<span>Save</span>
					</button>
				</div>
			</div>

			<CaseFileCards
				files={caseFiles?.files}
				handleClickViewCaseFile={(event) => handleClickViewCaseFile(event)}
			/>

			{isFileViewModalOpen && (
				<ViewCaseFileModal
					fileName={fileName.current}
					fileID={fileID.current}
					fileURL={fileURL.current}
					handleClickCloseViewCaseFile={handleClickCloseViewCaseFile}
				/>
			)}
		</div>
	);
}

export default Case;
