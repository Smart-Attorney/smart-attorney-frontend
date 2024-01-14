import { useState } from "react";
import SortOption from "./SortOption";
import { SortOptionsObj } from "../utils/types";

/* 
  pass state setter to sortBar
  pass copy of folder array to sortBar
  when option is selected, run sort function on folder array
  update state with newly sorta array
*/

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
			<p className="mr-6 text-white">Sort by:</p>
			{optionElements}
		</div>
	);
}

export default SortBar;
