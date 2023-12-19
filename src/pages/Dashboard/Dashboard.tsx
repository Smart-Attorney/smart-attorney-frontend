import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFolder from "./CaseFolder";
import dashboardOptions from "./DashboardSortOptions";
import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div className="dashboard-container" style={{ background: 'linear-gradient(to right, #000273, #000000)' }}>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<h1 className="mt-10 mb-5 text-4xl font-bold" style={{ color: '#FFFFFF' }}>Case Dashboard</h1>
				<SearchBar />

				<div className="flex flex-row items-center justify-between w-full gap-8">
					<SortBar options={dashboardOptions} />

					<Link
						className="bg-[#D9D9D9] h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
						type="button"
						to={"/create-new-case"}
					>
						<span>New Case</span>
					</Link>
				</div>

				<CaseFolder />
			</div>
		</div>
	);
}

export default Dashboard;
