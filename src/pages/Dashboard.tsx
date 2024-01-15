import PageBody from "../layouts/PageBody";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import CaseFolderCards from "../features/dashboard/CaseFolderCards";
import { DASHBOARD_SORT_OPTIONS } from "../utils/constants";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CaseFolderObj } from "../utils/types";
import Database from "../services/database";
import Frame12Logo from "../assets/Smart-Attorney/Frame 12.png";
import Component2Logo from "../assets/Smart-Attorney/Component 2.png";

function Dashboard() {
	const db = new Database();

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
					<img className="w-12 h-12 mr-2 mt-[20px]" src={Frame12Logo} alt="logo" />
					<h1 className="mt-10 mb-5 text-4xl font-bold text-white">Case Dashboard</h1>
				</div>
				<SearchBar />
				<div className="flex flex-row items-center justify-between w-full gap-8">
					<SortBar
						options={DASHBOARD_SORT_OPTIONS}
						unsortedArray={caseFolders}
						setSortedArray={setCaseFolders}
					/>
					<Link
						className="bg-white h-11 rounded-full min-w-[150px] flex justify-center items-center font-medium "
						style={newCaseButtonStyle}
						type="button"
						to={"/create-case"}
					>
						<div className="flex flex-row items-center gap-2 px-5 py-1 bg-white rounded-full">
							<img className="h-5" src={Component2Logo} />
							<span className="text-[#2D2F8D]">New Case</span>
						</div>
					</Link>
				</div>
				<CaseFolderCards caseFolders={caseFolders} setCaseFolders={setCaseFolders} />
			</div>
		</PageBody>
	);
}

export default Dashboard;

// border: 3px solid;

// border-image-source: linear-gradient(94.94deg, rgba(50, 68, 242, 0.87) 0%, rgba(52, 129, 244, 0.84474) 50.52%, rgba(255, 37, 246, 0.82) 100%);
