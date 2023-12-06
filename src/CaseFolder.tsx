import JsonData from "./data";

function CaseFolder() {
	return (
		<div className="flex flex-row flex-wrap justify-evenly gap-8 w-full">
			{JsonData.map((caseInfo) => {
				return (
					<div
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-12 flex flex-col justify-between"
						key={caseInfo.id}
					>
						<p>Deadline: {caseInfo.deadline}</p>
						<div
							className="h-4 w-4 relative left-[170px] bottom-[84px] rounded-full"
							style={{ backgroundColor: `${caseInfo.status}` }}
						></div>
						<p className="mb-8">{caseInfo.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFolder;
