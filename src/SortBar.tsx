function SortBar() {
	const options: string[] = ["Name", "Date Created", "Last Opened", "Open Cases", "Deadline", "Labels"];

	const sortOptions = options.map((option) => {
		return <p key={option}>{option}</p>;
	});

	return (
		<div className="flex flex-row gap-5">
			<p>Sort by:</p>
			{sortOptions}
		</div>
	);
}

export default SortBar;
