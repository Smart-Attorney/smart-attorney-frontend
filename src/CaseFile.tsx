import JsonData from "./data-new-case";

function CaseFile() {
	return (
		<div className="grid gap-8 min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1500px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[650px]:grid-cols-2">
			{JsonData.map((fileInfo) => {
				return (
					<div
						className="bg-[#D9D9D9] h-64 w-64 rounded-3xl py-4 pl-12 flex flex-col justify-between"
						key={fileInfo.id}
					>
						<h1>{fileInfo.status}</h1>

						<p className="mb-8">{fileInfo.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default CaseFile;
