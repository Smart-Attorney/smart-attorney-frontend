import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFile from "./CaseFile";
import newCaseSortOptions from "./newCaseSortOptions";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditPenIcon from "../../assets/content-edit-pen.svg";

function NewCase() {
	const [editable, setEditable] = useState(false);
	const [caseInfo, setCaseInfo] = useState({
		name: "New Case",
	});

	console.log(caseInfo);

	const toggleEditable = () => {
		setEditable(true);
		const caseName = document.getElementById("case-name");
		setTimeout(() => {
			caseName?.focus();
		}, 100);
	};

	const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
		const { textContent } = event.nativeEvent.target as HTMLElement;

		setCaseInfo({ name: textContent ? textContent : "" });
		setEditable(false);
	};

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<div className="flex flex-row items-end h-20 gap-2 mb-5">
				<span
					id="case-name"
					className="relative mt-10 mb-5 text-4xl font-bold border-b border-b-black top-5"
					contentEditable={editable}
					suppressContentEditableWarning={true}
					onBlur={handleBlur}
				>
					{caseInfo.name}
				</span>

				<img src={EditPenIcon} width="30px" className="cursor-pointer mt-7" onClick={toggleEditable} />
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
