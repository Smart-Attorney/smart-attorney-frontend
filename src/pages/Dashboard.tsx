import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderPurple } from "../assets/smart-attorney-figma/buttons";
import { DashboardIcon } from "../assets/smart-attorney-figma/global";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import { getUserCaseFolders } from "../features/dashboard/api/get-case-folders";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { CaseUtils } from "../utils/case-utils";
import { DASHBOARD } from "../utils/constants/sort-options";
import { DashboardFolderCardObj } from "../utils/types";

function Dashboard() {
	const navigate = useNavigate();

	const [caseFolders, setCaseFolders] = useState<DashboardFolderCardObj[] | null>([]);

	// retrieves all user case folders on initial page load
	useEffect(() => {
		handleGetUserCaseFolders();
	}, []);

	/************************************************************/

	const handleGetUserCaseFolders = async () => {
		try {
			const response = await getUserCaseFolders();
			switch (response.status) {
				case 200:
					const data: DashboardFolderCardObj[] = await response.json();
					setCaseFolders(data);
					CaseUtils.setCaseCount(data.length);
					break;
				case 204:
					console.log(response.statusText);
					setCaseFolders([]);
					CaseUtils.setCaseCount(0);
					break;
				default:
					break;
			}
		} catch (error) {
			navigate("/signin");
			alert(error);
		}
	};

	/************************************************************/

	return (
		<SidebarLayout>
			<PageHeader className="gap-2">
				<img className="w-10" src={DashboardIcon} alt="logo" />
				<h1 className="text-3xl font-bold text-white">Case Dashboard</h1>
			</PageHeader>

			<SearchBar cards={caseFolders} />

			<SortBarWithButtons>
				<SortBar
					initialWidth={700}
					minWidth={1280}
					options={DASHBOARD}
					caseFolderCards={caseFolders}
					setCaseFolderCards={setCaseFolders}
				/>

				{/* New Case Button */}
				<button
					type="button"
					className="flex items-center justify-center font-medium border-[3px] border-transparent rounded-[30px] h-11 min-w-fit"
					style={{
						background:
							"linear-gradient(0deg, #FFFFFF, #FFFFFF) padding-box ,linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%) border-box",
					}}
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
