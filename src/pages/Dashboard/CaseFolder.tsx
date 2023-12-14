import { useState, useEffect } from "react";
import FolderMenu from "./FolderMenu";

interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
	labels: string[];
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

	const handleAddDeadline = (folderID: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const updatedCaseArray = storedCaseArray.map((caseFolder: { id: number }) => {
			return folderID === caseFolder.id ? { ...caseFolder, deadline: value } : caseFolder;
		});
		localStorage.setItem("cases", JSON.stringify(updatedCaseArray));
		setCases(updatedCaseArray);
	};

	const handleAddLabel = (folderID: number, event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { value } = (event.target as HTMLFormElement).form[0];

		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const updatedCaseArray = storedCaseArray.map((caseFolder: { id: number; labels: string[] }) => {
			return folderID === caseFolder.id
				? { ...caseFolder, labels: [...caseFolder.labels, value] }
				: caseFolder;
		});
		localStorage.setItem("cases", JSON.stringify(updatedCaseArray));
		setCases(updatedCaseArray);
	};

	const handleFolderDelete = (folderID: number) => {
		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const filteredOutItemAray = storedCaseArray.filter((caseFolder: { id: number }) => {
			return caseFolder.id !== folderID;
		});
		localStorage.setItem("cases", JSON.stringify(filteredOutItemAray));
		setCases(filteredOutItemAray);
	};

	const formatDate = (date: string) => {
		if (date === "" || date === null || date === undefined) {
			return "__________";
		}
		const dateArray = date.split("-");
		const formattedDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
		return formattedDate;
	};

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{cases?.map((caseInfo) => {
				return (
					<div
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-5 flex flex-col justify-between"
						key={caseInfo.id}
						id={caseInfo.id}
					>
						<div className="flex flex-row items-center gap-4 w-fit">
							<p>Deadline: {formatDate(caseInfo.deadline)}</p>
							<div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${caseInfo.status}` }}></div>
						</div>
						<div className="flex flex-row flex-wrap w-4/5 gap-2">
							{caseInfo.labels.map((label) => {
								return (
									<div className="">
										<p className="px-2 pb-[3px] text-white bg-black rounded-full text-sm">{label}</p>
									</div>
								);
							})}
						</div>
						<FolderMenu
							addDeadline={(event) => handleAddDeadline(caseInfo.id, event)}
							addLabel={(event) => handleAddLabel(caseInfo.id, event)}
							deleteFolder={() => handleFolderDelete(caseInfo.id)}
						/>
						<p className="mb-8 w-fit">{caseInfo.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFolder;
