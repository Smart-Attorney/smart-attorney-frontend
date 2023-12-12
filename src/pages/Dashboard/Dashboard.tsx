import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import CaseFolder from "./CaseFolder";
import dashboardOptions from "./DashboardSortOptions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
}

function Dashboard() {
	const [cases, setCases] = useState<Case[]>();

	/**
	 * Retrieves case array from local storage and maps over them to format into
	 * appropriate object shape.
	 * Sets formattd array into cases state.
	 */
	useEffect(() => {
		const storedCases = JSON.parse(localStorage.getItem("cases") as string);

		if (storedCases !== null) {
			const formattedCases = storedCases.map((caseDetails: { id: any; name: any }) => {
				return {
					id: caseDetails.id,
					name: caseDetails.name,
					deadline: "",
					status: "#53EF0A",
				};
			});
			setCases(formattedCases);
		} else {
			setCases([]);
		}
	}, []);

	return (
		<div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
			<h1 className="mt-10 mb-5 text-4xl font-bold">Case Dashboard</h1>
			<SearchBar />

			<div className="flex flex-row items-center justify-between w-full gap-8">
				<SortBar options={dashboardOptions} />

				<Link
					className="bg-[#D9D9D9] h-11 rounded-md min-w-[150px] flex justify-center items-center pb-[2px]"
					type="button"
					to={"/new-case"}
				>
					<span>New Case</span>
				</Link>
			</div>

			<CaseFolder cases={cases} />
		</div>
	);
}

export default Dashboard;
