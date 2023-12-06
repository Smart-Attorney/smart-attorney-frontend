import { useState } from "react";
import SortOption from "./SortOption";

interface Options {
	clicked: boolean;
	name: string;
}

const options: Options[] = [
	{ clicked: false, name: "Name" },
	{ clicked: false, name: "Date Created" },
	{ clicked: false, name: "Last Opened" },
	{ clicked: false, name: "Open Cases" },
	{ clicked: false, name: "Deadline" },
	{ clicked: false, name: "Labels" },
];

function SortBar() {
	const [sortOptions, setSortOptions] = useState(options);

	const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const { id } = event.target as HTMLParagraphElement;

		setSortOptions((prev) =>
			prev.map((option) => {
				return id === option.name ? { ...option, clicked: !option.clicked } : option;
			})
		);
	};

	const optionElements = sortOptions.map((option) => {
		return (
			<SortOption
				key={option.name}
				id={option.name}
				name={option.name}
				clicked={option.clicked}
				onClick={(event) => handleClick(event)}
			/>
		);
	});

	return (
		<div className="flex flex-row flex-wrap items-center gap-6">
			<p className="mr-6">Sort by:</p>

			{optionElements}
		</div>
	);
}

export default SortBar;
