import { useState } from "react";
import SortOption from "./SortOption";
import { SortOptionsObj } from "../utils/types";

function SortBar({ options }: { options: SortOptionsObj[] }) {
	const [sortOptions, setSortOptions] = useState<SortOptionsObj[]>(options);

	const handleSortCardsByOption = (event: React.MouseEvent<HTMLParagraphElement>): void => {
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
			onClick={(event) => handleSortCardsByOption(event)}
		/>
	));

	return (
		<div className="flex flex-row flex-wrap items-center gap-6">
			<p className="mr-6" style={{ color: "#FFFFFF" }}>
				Sort by:
			</p>
			{optionElements}
		</div>
	);
}

export default SortBar;
