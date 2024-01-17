import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLogo from "../assets/smart-attorney-figma/dashboard-icon.png";
import FolderPurpleLogo from "../assets/smart-attorney-figma/folder-purple-icon.png";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import PageBody from "../layouts/PageBody";
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

	const newCaseButtonStyle = {
		background:
			"linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%)",
	};

	return (
		<PageBody>
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
					<button
						className="bg-white h-11 rounded-full min-w-[150px] flex justify-center items-center font-medium "
						style={newCaseButtonStyle}
						type="button"
						onClick={() => navigate("/create-case")}
					>
						<div className="flex flex-row items-center gap-2 px-5 py-1 bg-white rounded-full">
							<img className="h-5" src={FolderPurpleLogo} />
							<span className="text-[#2D2F8D]">New Case</span>
						</div>
					</button>
				</div>
				<CaseFolderCards caseFolders={caseFolders} setCaseFolders={setCaseFolders} />
			</div>
		</PageBody>
	);
}

export default Dashboard;

// border: 3px solid;

// border-image-source: linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%);
