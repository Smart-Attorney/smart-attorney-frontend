import { useState, useEffect } from "react";
import FolderMenu from "./FolderMenu";

interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
}

function CaseFolder() {
	const [cases, setCases] = useState<Case[]>();

	/**
	 * Retrieves case array from local storage and maps over them to format into
	 * appropriate object shape.
	 * Sets formattd array into cases state.
	 */
	useEffect(() => {
		const storedCases = JSON.parse(localStorage.getItem("cases") as string);
		if (storedCases !== null) {
			setCases(storedCases);
		} else {
			setCases([]);
		}
	}, []);

  const handleAddDeadline = () => {

  }

	const handleFolderDelete = (folderID: number) => {
		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const filteredOutItemAray = storedCaseArray.filter((folder: { id: number }) => {
			return folder.id !== folderID;
		});
		localStorage.setItem("cases", JSON.stringify(filteredOutItemAray));
		setCases(filteredOutItemAray);
	};

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{cases?.map((caseInfo) => {
				return (
					<div
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-12 flex flex-col justify-between"
						key={caseInfo.id}
						id={caseInfo.id}
					>
						<div className="flex flex-row items-center gap-4 w-fit">
							<p>Deadline: {caseInfo.deadline}</p>
							<div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${caseInfo.status}` }}></div>
						</div>
						<FolderMenu addDeadline={()=>handleAddDeadline} deleteFolder={() => handleFolderDelete(caseInfo.id)} />
						<p className="mb-8 w-fit">{caseInfo.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFolder;
