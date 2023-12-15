import React, { useState, useEffect } from "react";
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

	const handleDeleteLabel = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const { textContent } = event.target as HTMLParagraphElement;
		const { id } = event.target as HTMLParagraphElement;
		const labelID = Number(id);

		const storedCaseArray = JSON.parse(localStorage.getItem("cases") as string);
		const updatedCaseArray = storedCaseArray.map((caseFolder: { id: number; labels: string[] }) => {
			return labelID === caseFolder.id
				? {
						...caseFolder,
						labels: caseFolder.labels.filter((label) => {
							return label !== textContent;
						}),
				  }
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
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-5 flex flex-col"
						key={caseInfo.id}
						id={caseInfo.id}
					>
						{/* Kebab Menu */}
						<div className="relative left-[200px] w-28">
							<FolderMenu
								addDeadline={(event) => handleAddDeadline(caseInfo.id, event)}
								addLabel={(event) => handleAddLabel(caseInfo.id, event)}
								deleteFolder={() => handleFolderDelete(caseInfo.id)}
							/>
						</div>

						{/* Case Deadline */}
						<div className="relative flex flex-row items-center gap-4 w-fit bottom-[26px]">
							<p>Deadline: {formatDate(caseInfo.deadline)}</p>
							<div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${caseInfo.status}` }}></div>
						</div>

						{/* Case Folder Labels */}
						<div className="relative flex flex-row flex-wrap w-[85%] h-6 gap-2 bottom-[24px]">
							{caseInfo.labels.map((label) => {
								return (
									<p
										className="px-3 text-sm pb-[3px] pt-[2px] text-white bg-black rounded-full cursor-pointer"
										key={caseInfo.id}
										id={caseInfo.id}
										onClick={handleDeleteLabel}
									>
										{label}
									</p>
								);
							})}
						</div>

						{/* Case Folder Name */}
						<p className="relative top-[120px] w-fit">{caseInfo.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFolder;
