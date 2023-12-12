import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFile from "./CaseFile";
import newCaseSortOptions from "./newCaseSortOptions";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditPenIcon from "../../assets/content-edit-pen.svg";

function NewCase() {
	/**
	 * Holds length of cases array from local storage.
	 * Used as the id for each newly created case folder.
	 */
	const caseID = useRef();

	/**
	 * Gets length of stored cases array in local storage and sets length to useRef.
	 * If array is null, creates and sets new cases array in local storage.
	 */
	useEffect(() => {
		const storedCases = JSON.parse(localStorage.getItem("cases") as string);

		if (storedCases === null) {
			const emptyCaseArray: {}[] = [];
			localStorage.setItem("cases", JSON.stringify(emptyCaseArray));
			const newlyStoredCaseArray = JSON.parse(localStorage.getItem("cases") as string);
			caseID.current = newlyStoredCaseArray.length;
		} else {
			caseID.current = storedCases.length;
		}
	}, []);

	const [isCaseNameEditable, setIsCaseNameEditable] = useState(false);
	const [caseInfo, setCaseInfo] = useState({
		name: "New Case",
	});

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
			id: caseID.current,
			name: caseInfo.name,
		};
		storedCaseArray.push(newCaseObject);
		localStorage.setItem("cases", JSON.stringify(storedCaseArray));
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
					>
						<span>Team</span>
					</button>
					<button
						className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
						type="button"
					>
						<span>Upload</span>
					</button>
					<Link
						className="bg-[#D9D9D9] h-11 rounded-md min-w-[100px] flex justify-center items-center pb-[2px]"
						type="button"
						to={"/dashboard"}
						onClick={handleCaseCreate}
					>
						<span>Create</span>
					</Link>
				</div>
			</div>

			<CaseFile />
		</div>
	);
}

export default NewCase;
