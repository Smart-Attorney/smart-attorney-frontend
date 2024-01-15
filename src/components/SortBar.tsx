import { useState } from "react";
import SortOption from "./SortOption";
import { CaseFolderObj, SortOptionsObj } from "../utils/types";
import { sortArrayByOption } from "../utils/sort";
import Database from "../services/database";

/* 
  pass state setter to sortBar
  pass copy of folder array to sortBar
  when option is selected, run sort function on folder array
  update state with newly sorta array
*/

interface SortBarProps {
	options: SortOptionsObj[];
	unsortedArray?: CaseFolderObj[] | null;
	setSortedArray?: React.Dispatch<React.SetStateAction<CaseFolderObj[] | null>>;
}

function SortBar(props: SortBarProps) {
	const db = new Database();

	const { options, unsortedArray, setSortedArray } = props;
	const [sortOptions, setSortOptions] = useState<SortOptionsObj[]>(options);

	const handleSortCardsByOption = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		const { id } = event.target as HTMLParagraphElement;
		setSortOptions((prev) =>
			prev.map((option) =>
				id === option.name ? { ...option, clicked: !option.clicked } : { ...option, clicked: false }
			)
		);

    if (unsortedArray && setSortedArray) {
      /* 
        Reason for this shallow copy:
        "React components automatically re-render whenever there is a change in their state or props. In your example, sortedPlans.sort is sorting the array in place and returning that very same array, and thus you never actually update the state. The easiest way is to just copy the state, modify the copy, then setting the state equal to the copy and then the state gets updated and the component re-renders."
        Source: https://stackoverflow.com/questions/71766944/react-setstate-not-triggering-re-render
      */
      const newArray = [...unsortedArray];

			const sortedArray = sortArrayByOption(newArray, id) as CaseFolderObj[];
			db.updateCaseArray(sortedArray);
			setSortedArray(sortedArray);
		}
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
