import { useEffect, useRef, useState } from "react";
import { SortIcon } from "../../assets/smart-attorney-figma/global";
import { CaseUtils } from "../../utils/case-utils";
import { SORT_OPTION, SortOptionsObj } from "../../utils/constants/sort-options";
import { DocumentUtils } from "../../utils/document-utils";
import { CaseFileObj, DashboardFolderCardObj } from "../../utils/types";
import SortByLabelButton from "./SortByLabelButton";
import SortByOptionButton from "./SortByOptionButton";

interface SortBarProps {
	initialWidth: number; // value should be wide enough to fit all options on one line with no wrapping
	minWidth: number; // value of window width before the sort bar resizes
	options: SortOptionsObj[];
	caseFolderCards?: DashboardFolderCardObj[] | null;
	setCaseFolderCards?: React.Dispatch<React.SetStateAction<DashboardFolderCardObj[] | null>>;
	documentCards?: CaseFileObj[];
	setDocumentCards?: React.Dispatch<React.SetStateAction<CaseFileObj[]>>;
}

function SortBar({
	initialWidth,
	minWidth,
	options,
	caseFolderCards,
	setCaseFolderCards,
	documentCards,
	setDocumentCards,
}: SortBarProps) {
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
		// translates vertical mouse wheel motion to horizontal scroll motion
		if (event.deltaX === 0) {
			optionsContainer.current?.scrollTo({
				top: 0,
				left: optionsContainerScrollPosition + event.deltaY,
			});
		}
		// translates horizontal mouse wheel motion to horizontal scroll motion
		if (event.deltaY === 0) {
			optionsContainer.current?.scrollTo({
				top: 0,
				left: optionsContainerScrollPosition + event.deltaX,
			});
		}
	};

	/************************************************************/

	const toggleLabelsButtonClicked = (isClicked: boolean) => {
		setSortOptions((prev) =>
			prev.map((option) =>
				option.name === SORT_OPTION.LABELS ? { ...option, clicked: isClicked } : { ...option, clicked: false }
			)
		);
	};

	const toggleOptionClicked = (optionName: string) => {
		setSortOptions((prev) =>
			prev.map((option) =>
				optionName === option.name ? { ...option, clicked: !option.clicked } : { ...option, clicked: false }
			)
		);
	};

	const sortDashboardCards = (sortOption: string) => {
		if (!caseFolderCards || !setCaseFolderCards) return;
		const sortedCards = CaseUtils.sortByOption(caseFolderCards, sortOption);
		const shallowCopy = [...sortedCards]; // [1] See references below
		setCaseFolderCards(shallowCopy as DashboardFolderCardObj[]);
	};

	const sortFolderCards = (sortOption: string) => {
		if (!documentCards || !setDocumentCards) return;
		const sortedCards = DocumentUtils.sortByOption(documentCards, sortOption);
		const shallowCopy = [...sortedCards]; // [1] See references below
		setDocumentCards(shallowCopy as CaseFileObj[]);
	};

	const handleSortCardsByOption = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		const { id: selectedOption } = event.target as HTMLParagraphElement;
		toggleOptionClicked(selectedOption);
		sortDashboardCards(selectedOption);
		sortFolderCards(selectedOption);
	};

	const handleSortCardsByLabelsOption = (labelOption: string) => {
		if (!caseFolderCards || !setCaseFolderCards) return;
		const sortedCards = CaseUtils.sortByOption(caseFolderCards, SORT_OPTION.LABELS, labelOption);
		const shallowCopy = [...sortedCards]; // [1] See references below
		setCaseFolderCards(shallowCopy as DashboardFolderCardObj[]);
	};

	/************************************************************/

	const sortByOptionButtonElements = sortOptions.map((option) =>
		option.name === SORT_OPTION.LABELS ? (
			<SortByLabelButton
				key={option.name}
				id={option.name}
				name={option.name}
				clicked={option.clicked}
				sortByLabelsOption={handleSortCardsByLabelsOption}
				toggleLabelsButtonClicked={toggleLabelsButtonClicked}
			/>
		) : (
			<SortByOptionButton
				key={option.name}
				id={option.name}
				name={option.name}
				clicked={option.clicked}
				sortByOption={(event) => handleSortCardsByOption(event)}
			/>
		)
	);

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
				{sortByOptionButtonElements}
			</div>
		</div>
	);
}

export default SortBar;

/*  [1] Reason for the "shallowCopy":
 *
 *  "React components automatically re-render whenever there is a change in
 *  their state or props. In your example, sortedPlans.sort is sorting the
 *  array in place and returning that very same array, and thus you never
 *  actually update the state. The easiest way is to just copy the state,
 *  modify the copy, then setting the state equal to the copy and then
 *  the state gets updated and the component re-renders."
 *
 *  Source:
 *  https://stackoverflow.com/questions/71766944/react-setstate-not-triggering-re-render
 */
