import { useState } from "react";
import SortOption from "./SortOption";

interface Options {
	clicked: boolean;
	name: string;
}

function SortBar({ options }: { options: Options[] }) {
	const [sortOptions, setSortOptions] = useState<Options[]>(options);

	const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const { id } = event.target as HTMLParagraphElement;
		setSortOptions((prev) =>
			prev.map((option) => (id === option.name ? { ...option, clicked: !option.clicked } : option))
		);
	};

	const optionElements = sortOptions.map((option) => (
		<SortOption
			key={option.name}
			id={option.name}
			name={option.name}
			clicked={option.clicked}
			onClick={(event) => handleClick(event)}
		/>
	));

	return (
		<div className="flex flex-row flex-wrap items-center gap-6">
			<p className="mr-6">Sort by:</p>
			{optionElements}
		</div>
	);
}

export default SortBar;
