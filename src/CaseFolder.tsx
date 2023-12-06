import JsonData from "./data";

function CaseFolder() {
  
	const display = JsonData.map((caseInfo) => {
		return (
			<div key={caseInfo.id}>
				<p>{caseInfo.deadline}</p>
				<p>{caseInfo.name}</p>
			</div>
		);
	});

	return (
		<>
			<p>The Cases:</p>
			{display}
		</>
	);
}

export default CaseFolder;
