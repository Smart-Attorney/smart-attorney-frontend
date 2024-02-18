import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FolderPurple } from "../assets/smart-attorney-figma/buttons";
import { DashboardIcon } from "../assets/smart-attorney-figma/global";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import { getCaseFolders } from "../features/dashboard/apis/get-case-folders";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { DASHBOARD } from "../utils/constants/sort-options";
import { CaseFolderObj } from "../utils/types";
// import Database from "../services/database";

function Dashboard() {
	// const db = new Database();
	const location = useLocation();
	const navigate = useNavigate();

	const [caseFolders, setCaseFolders] = useState<CaseFolderObj[] | null>(null);

	/**
	 * On initial load, retrieves case array from local storage.
	 * Then, sets case array to cases state.
	 * Empty dependency array since it should only run once on initial load.
	 */
	useEffect(() => {
		// const fetchCaseFolders = async () => {
		// 	const response = await fetch("localhost:4000/api/caseFolders");
		// 	const json = await response.json();
		// 	if (response.ok) {
		// 		setCaseFolders(json);
		// 	}
		// };
		// fetchCaseFolders();
		/****/
		// const caseArray = db.getCaseArray();
		// if (caseArray !== null) {
		// 	setCaseFolders(caseArray);
		// } else {
		// 	db.initNewArray();
		// 	setCaseFolders([]);
		// }
		/****/

		getUserCaseFolders();
	}, []);

	const getUserCaseFolders = async () => {
		try {
			const response = await getCaseFolders(location.pathname);
			switch (response.status) {
				case 200:
					const data = await response.json();
					setCaseFolders(data);
					break;
				case 204:
					console.log(response.statusText);
					setCaseFolders([]);
					break;
				default:
					break;
			}
		} catch (error) {
			alert(error);
		}
	};

	const newCaseBtnGradient = {
		background:
			"linear-gradient(0deg, #FFFFFF, #FFFFFF) padding-box ,linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%) border-box",
	};

	return (
		<SidebarLayout>
			<PageHeader className="gap-2">
				<img className="w-10" src={DashboardIcon} alt="logo" />
				<h1 className="text-3xl font-bold text-white">Case Dashboard</h1>
			</PageHeader>

			<SearchBar />

			<SortBarWithButtons>
				<SortBar options={DASHBOARD} unsortedArray={caseFolders} setSortedArray={setCaseFolders} />

				{/* New Case Button */}
				<button
					type="button"
					className="flex items-center justify-center font-medium border-[3px] border-transparent rounded-[30px] h-11 min-w-fit"
					style={newCaseBtnGradient}
					onClick={() => navigate("/create-case")}
				>
					<div className="flex flex-row items-center w-full h-full gap-2 px-3">
						<img className="w-5 h-5" src={FolderPurple} />
						<span className="text-[#2D2F8D] text-base font-semibold">New Case</span>
					</div>
				</button>
			</SortBarWithButtons>

			<CaseFolderCards caseFolders={caseFolders} setCaseFolders={setCaseFolders} />
		</SidebarLayout>
	);
}

export default Dashboard;
