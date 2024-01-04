import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import { DASHBOARD_SORT_OPTIONS } from "../utils/constants";
import { Link } from "react-router-dom";

function Dashboard() {
	const bodyStyle = {
		margin: 0,
		padding: 0,
		background: "linear-gradient(to bottom, #000273, #000000)",
		minHeight: "100vh", // Ensures the gradient covers the entire viewport height
	  };

	return (
		<div style={bodyStyle}>
			<div
				className="dashboard-container"
				style={{ background: "linear-gradient(to bottom, #000273, #000000)" }}
			>
				<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
					<h1 className="mt-10 mb-5 text-4xl font-bold" style={{ color: "#FFFFFF" }}>
						Case Dashboard
					</h1>
					<SearchBar />

					<div className="flex flex-row items-center justify-between w-full gap-8">
						<SortBar options={DASHBOARD_SORT_OPTIONS} />

						<Link
							className="bg-[#D9D9D9] h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
							type="button"
							to={"/create-case"}
						>
							<span>New Case</span>
						</Link>
					</div>

					<CaseFolderCards />
				</div>
			</div>
		</div>

	);
}

export default Dashboard;
