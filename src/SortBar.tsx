function SortBar() {
	const options: string[] = ["Name", "Date Created", "Last Opened", "Open Cases", "Deadline", "Labels"];

	return (
		<div className="flex flex-row gap-6 items-center">
			<p className="mr-6">Sort by:</p>

			{options.map((option) => {
				return (
					<p className="border-0 border-black px-2 py-1 rounded-lg cursor cursor-pointer" key={option}>
						{option}
					</p>
				);
			})}
		</div>
	);
}

export default SortBar;
