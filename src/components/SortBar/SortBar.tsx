import { useState } from "react";
import { SortIcon } from "../../assets/smart-attorney-figma/global";
import { SortOptionsObj } from "../../utils/constants/sort-options";
import { sortArrayByOption } from "../../utils/sort";
import { DashboardFolderCardObj } from "../../utils/types";
import SortOption from "./SortOption";

/* 
  pass state setter to sortBar
  pass copy of folder array to sortBar
  when option is selected, run sort function on folder array
  update state with newly sorta array
*/

interface SortBarProps {
	options: SortOptionsObj[];
	unsortedArray?: DashboardFolderCardObj[] | null;
	setSortedArray?: React.Dispatch<React.SetStateAction<DashboardFolderCardObj[] | null>>;
}

function SortBar(props: SortBarProps) {
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

			const sortedArray = sortArrayByOption(newArray, id) as DashboardFolderCardObj[];

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

	// boolean check if sort options wrap
	// calculate dynamic width of sort options container based on the width resolution of window

	return (
		<div className="flex flex-row items-start justify-start gap-8 w-fit">
			<div className="flex flex-row items-center gap-2 mt-0.5 min-w-fit">
				<img className="w-6 h-5" src={SortIcon} />
				<p className="text-white">Sort by:</p>
			</div>
			{/* w-[300px] overflow-y-hidden overflow-x-auto*/}
			<div className="flex flex-row flex-wrap gap-x-7 ">{optionElements}</div>
		</div>
	);
}

export default SortBar;
