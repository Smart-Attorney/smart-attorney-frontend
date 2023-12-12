interface Case {
	id: number;
	name: string;
	deadline: string;
	status: string;
}

function CaseFolder({ cases }: { cases: Case[] | undefined }) {
	const casesArray = cases?.map((eachCase) => {
		return eachCase;
	});

	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{casesArray?.map((caseInfo) => {
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
