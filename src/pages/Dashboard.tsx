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

	return (
		<PageBody>
			<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
				<div className="flex flex-row items-center w-full gap-1 mx-auto">
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
						className="bg-white h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
						type="button"
						to={"/create-case"}
					>
						<span>New Case</span>
					</Link>
				</div>
				<CaseFolderCards caseFolders={caseFolders} setCaseFolders={setCaseFolders} />
			</div>
		</PageBody>
	);
}

export default Dashboard;
