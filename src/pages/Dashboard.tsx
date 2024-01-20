import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "../assets/smart-attorney-figma/buttons";
import DashboardLogo from "../assets/smart-attorney-figma/dashboard-icon.png";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import SidebarLayout from "../layouts/SidebarLayout";
import Database from "../services/database";
import { DASHBOARD_SORT_OPTIONS } from "../utils/constants";
import { CaseFolderObj } from "../utils/types";

function Dashboard() {
	const db = new Database();
	const navigate = useNavigate();

	const [caseFolders, setCaseFolders] = useState<CaseFolderObj[] | null>(null);

	/**
	 * On initial load, retrieves case array from local storage.
	 * Then, sets case array to cases state.
	 * Empty dependency array since it should only run once on initial load.
	 */
	useEffect(() => {
		const caseArray = db.getCaseArray();
		if (caseArray !== null) {
			setCaseFolders(caseArray);
		} else {
			db.initNewArray();
			setCaseFolders([]);
		}
	}, []);

	return (
		<SidebarLayout>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-row items-center w-full gap-2 mx-auto">
					<img className="w-12 h-12 mr-2 mt-[20px]" src={DashboardLogo} alt="logo" />
					<h1 className="mt-10 mb-5 text-4xl font-bold text-white">Case Dashboard</h1>
				</div>

				<SearchBar />

				<div className="flex flex-row items-center justify-between w-full gap-8">
					<SortBar
						options={DASHBOARD_SORT_OPTIONS}
						unsortedArray={caseFolders}
						setSortedArray={setCaseFolders}
					/>

					{/* New Case Button */}
					<button
						type="button"
						className="flex items-center justify-center font-medium border-4 border-transparent rounded-[30px] h-11 min-w-fit"
						style={{
							background:
								"linear-gradient(0deg, #FFFFFF, #FFFFFF) padding-box ,linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%) border-box",
						}}
						onClick={() => navigate("/create-case")}
					>
						<div className="flex flex-row items-center w-full h-full gap-2 px-3">
							<img className="w-5 h-5" src={Folder} />
							<span className="text-[#2D2F8D] text-base font-medium">New Case</span>
						</div>
					</button>
				</div>

				<CaseFolderCards caseFolders={caseFolders} setCaseFolders={setCaseFolders} />
			</div>
		</SidebarLayout>
	);
}

export default Dashboard;
