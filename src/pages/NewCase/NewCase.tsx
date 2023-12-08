import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFile from "./CaseFile";
import newCaseSortOptions from "./newCaseSortOptions";
import { Link} from "react-router-dom";

function NewCase() {

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<h1 className="pt-10 pb-5 text-4xl font-bold">New Case</h1>
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
