import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import { NEW_CASE_SORT_OPTIONS } from "../../utils/constants";
import CaseFileCards from "./CaseFileCards";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewCaseFileModal from "./ViewCaseFileModal";
import CaseFolder from "../../services/local-storage/case-folder";
import { FolderItem } from "../../utils/types";
import { StorageReference } from "firebase/storage";
import Firebase from "../../services/cloud-storage/firebase";

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
	const folderID = useRef<string | undefined>(id);
	const fileID = useRef<string>("");
	const fileName = useRef<string | null>("");
	const fileURL = useRef<string>("");

	const navigate = useNavigate();

	const [caseFiles, setCaseFiles] = useState<FolderItem>();
	// console.log(caseFiles);
	const [isFileViewModalOpen, setIsFileViewModalOpen] = useState(false);

	useEffect(() => {
		if (folderID.current === undefined) {
			navigate("/404");
			return;
		}
		const caseFolderExists = CaseFolder.getById(folderID.current);
		if (caseFolderExists) {
			setCaseFiles(caseFolderExists);
		} else {
			navigate("/404");
		}
	}, []);

	const getFileFromCloud = async (fileId: string, fileName: string) =>
		await Firebase.getFile(fileId, fileName);

	const handleClickViewCaseFile = async (event: React.MouseEvent<HTMLParagraphElement>) => {
		const { id: fileId, innerText } = event.target as HTMLParagraphElement;
		const fileUrl = await getFileFromCloud(fileId, innerText);

		fileName.current = innerText;
		fileID.current = fileId;
		fileURL.current = fileUrl!;

		setIsFileViewModalOpen(true);
	};

  const handleClickCloseViewCaseFile = () => setIsFileViewModalOpen(false);
  
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
