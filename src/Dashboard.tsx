import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import CaseFolder from "./CaseFolder";
import dashboardOptions from "./DashboardSortOptions";

function Dashboard() {
	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<h1 className="pt-10 pb-5 text-4xl font-bold">Case Dashboard</h1>
			<SearchBar />

			<div className="flex flex-row items-center justify-between w-full gap-8">
				<SortBar options={dashboardOptions} />

				<button
					className="bg-[#D9D9D9] h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
					type="button"
				>
					<span>New Case</span>
				</button>
			</div>

			<CaseFolder />
		</div>
	);
}

export default Dashboard;
