import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFolder from "./CaseFolder";
import dashboardOptions from "./DashboardSortOptions";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<h1 className="pt-10 pb-5 text-4xl font-bold">Case Dashboard</h1>
			<SearchBar />

			<div className="flex flex-row items-center justify-between w-full gap-8">
				<SortBar options={dashboardOptions} />

				<button
					className="bg-[#D9D9D9] h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
					type="button"
					onClick={() => navigate("new-case")}
				>
					<span>New Case</span>
				</button>
			</div>

			<CaseFolder />
		</div>
	);
}

export default Dashboard;
