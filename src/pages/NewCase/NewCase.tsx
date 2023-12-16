import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFile from "./CaseFile";
import newCaseSortOptions from "./newCaseSortOptions";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditPenIcon from "../../assets/content-edit-pen.svg";
import { nanoid } from "nanoid/non-secure";
import FileUpload from "./FileUpload";

function NewCase() {
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const [isCaseNameEditable, setIsCaseNameEditable] = useState(false);
	const [caseInfo, setCaseInfo] = useState({
		name: "New Case",
	});

	const navigate = useNavigate();

	/**
	 * On initial load, checks if cases array exists in local storage.
	 * If not, creates and saves a cases array to local storage.
	 */
	useEffect(() => {
		const storedCases = JSON.parse(localStorage.getItem("cases") as string);
		if (storedCases === null) {
			const emptyCaseArray: {}[] = [];
			localStorage.setItem("cases", JSON.stringify(emptyCaseArray));
		}
	}, []);

	const toggleUploadBox = () => {
		setIsUploadOpen((prev) => !prev);
	};

	const closeUploadBox = () => {
		setIsUploadOpen(false);
	};

	const toggleCaseNameEditable = () => {
		setIsCaseNameEditable(true);
		const caseName = document.getElementById("case-name");

		setTimeout(() => {
			caseName?.focus();
		}, 100);
	};

	const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
		const { textContent } = event.nativeEvent.target as HTMLElement;

		setCaseInfo({ name: textContent ? textContent : "" });
		setIsCaseNameEditable(false);
	};

	const handleCaseCreate = () => {
		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const newCaseObject = {
			id: nanoid(),
			name: caseInfo.name,
			status: "#53EF0A",
			deadline: "",
			labels: [],
			files: [],
		};

		storedCaseArray.push(newCaseObject);
		localStorage.setItem("cases", JSON.stringify(storedCaseArray));
		navigate("/dashboard");
	};

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
					{caseInfo.name}
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
				<SortBar options={newCaseSortOptions} />

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
						onClick={toggleUploadBox}
					>
						<span>Upload</span>
					</button>
					<button
						className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
						type="button"
						name="Create"
						onClick={handleCaseCreate}
					>
						<span>Create</span>
					</button>
				</div>
			</div>

			<CaseFile />

			{isUploadOpen && <FileUpload closeUploadBox={closeUploadBox} />}
		</div>
	);
}

export default NewCase;
