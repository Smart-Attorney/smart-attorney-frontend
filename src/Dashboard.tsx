import CaseFolder from "./CaseFolder";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

function Dashboard() {
	return (
		<div className="flex flex-col items-center gap-5 w-[80%] mx-auto">
			<h1 className="font-bold text-4xl pt-10 pb-5">Case Dashboard</h1>
			<SearchBar />
			<div className="flex flex-row items-center w-full justify-between gap-8">
				<SortBar />
				<button className="bg-[#D9D9D9] h-11 rounded-md w-28" type="button">
					New Case
				</button>
			</div>
			<CaseFolder />
		</div>
	);
}

export default Dashboard;
