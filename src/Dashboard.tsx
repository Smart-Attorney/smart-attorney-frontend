import CaseFolder from "./CaseFolder";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

function Dashboard() {
	return (
		<div className="flex flex-col items-center gap-5">
			<h1 className="font-bold text-4xl pt-10 pb-5">Case Dashboard</h1>
			<SearchBar />
			<div className="flex flex-row gap-5 items-center">
				<SortBar />
				<button className="bg-[#D9D9D9] py-1 px-3 rounded-md" type="button">
					New Case
				</button>
			</div>
			<CaseFolder />
		</div>
	);
}

export default Dashboard;
