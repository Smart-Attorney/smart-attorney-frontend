import { useEffect, useRef, useState } from "react";
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
	// value should be wide enough to fit all options on one line with no wrapping
	initialWidth: number;
	// value of window width before the sort bar resizes
	minWidth: number;
	options: SortOptionsObj[];
	unsortedArray?: DashboardFolderCardObj[] | null;
	setSortedArray?: React.Dispatch<React.SetStateAction<DashboardFolderCardObj[] | null>>;
}

function SortBar({ initialWidth, minWidth, options, unsortedArray, setSortedArray }: SortBarProps) {
	const optionsContainer = useRef<HTMLDivElement>(null);

	const [sortOptions, setSortOptions] = useState<SortOptionsObj[]>(options);
	const [containerWidth, setContainerWidth] = useState<number>(initialWidth);

	// Stops background scroll when user mouse wheels while hovering sort options
	useEffect(() => {
		optionsContainer.current?.addEventListener("wheel", preventDefaultScroll, { passive: false });
		return () => {
			optionsContainer.current?.removeEventListener("wheel", preventDefaultScroll);
		};
	}, []);

	// applies container width changes on initial load
	useEffect(() => {
		adjustSortOptionsContainerWidth();
	}, []);

	/************************************************************/

	const adjustSortOptionsContainerWidth = () => {
		const currentWindowWidth = window.innerWidth;
		if (currentWindowWidth < minWidth) {
			setContainerWidth(initialWidth - (minWidth - currentWindowWidth));
		} else {
			setContainerWidth(initialWidth);
		}
	};

	window.onresize = adjustSortOptionsContainerWidth;

	/************************************************************/

	const preventDefaultScroll = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	const handleMouseWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
		const optionsContainerScrollPosition = optionsContainer.current ? optionsContainer.current?.scrollLeft : 0;
		optionsContainer.current?.scrollTo({
			top: 0,
			left: optionsContainerScrollPosition + event.deltaY,
		});
	};

	/************************************************************/

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

	/************************************************************/

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
		<div className="flex flex-row items-start justify-start gap-8 w-fit">
			<div className="flex flex-row items-center gap-2 mt-0.5 min-w-fit">
				<img className="w-6 h-5" src={SortIcon} />
				<p className="text-white">Sort by:</p>
			</div>

			<div
				style={{ width: `${containerWidth}px` }}
				className="flex flex-row overflow-x-hidden overflow-y-hidden hover:overflow-x-auto custom-scrollbar gap-x-7"
				ref={optionsContainer}
				onWheel={handleMouseWheelScroll}
			>
				{optionElements}
			</div>
		</div>
	);
}

export default SortBar;
