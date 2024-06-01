import { useState } from "react";
import { SortByLabel } from "../../utils/constants/sort-options";

interface SortOptionProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByOption: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	sortByLabel?: () => void;
}

function SortOption({ id, name, clicked, sortByOption }: SortOptionProps) {
	/* TODO
     Consider extracting the logic that handles the "Labels" dropdown menu into
     another component. 
  */

	// collect all case folder labels
	// pass them into sort
	// add labels as select options in drop down
	// when clicking on labels, invoke the function sort by label

	const [isLabelsHovered, setIsLabelsHovered] = useState<boolean>(false);
	const [selectBoxPosition, setSelectBoxPosition] = useState({
		top: 0,
		left: 0,
	});

	const openLabelSelectBox = () => {
		setIsLabelsHovered(true);
	};

	const closeLabelSelectBox = () => {
		setIsLabelsHovered(false);
	};

	const handleMouseOnLabels = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const sortOption = (event.target as HTMLParagraphElement).id;
		if (sortOption != "Labels") return;
		const labelButton = document.getElementById("Labels")?.getBoundingClientRect();
		if (!labelButton) return;

		const selectBoxTopPosition = labelButton.top + labelButton.height;
		const selectBoxLeftPosition = labelButton.left;

		setSelectBoxPosition({
			top: selectBoxTopPosition,
			left: selectBoxLeftPosition,
		});

		openLabelSelectBox();
	};

	const sortOptionStyle = {
		color: clicked ? "black" : "white",
		backgroundColor: clicked ? "white" : "transparent",
	};

	return (
		<>
			{id === SortByLabel.LABELS ? (
				/* For the "Labels" sort option */
				<>
					<div className="px-2 py-1 rounded-lg min-w-max" style={sortOptionStyle}>
						<p
							id={id}
							className="cursor-pointer"
							onClick={sortByOption}
							onMouseEnter={(event) => handleMouseOnLabels(event)}
							onMouseLeave={closeLabelSelectBox}
						>
							{name}
						</p>
					</div>
					<div
						id="label-select-box"
						style={{
							visibility: isLabelsHovered ? "visible" : "hidden",
							top: `${selectBoxPosition.top}px`,
							left: `${selectBoxPosition.left}px`,
						}}
						className="absolute w-[132px] h-24 bg-white border border-[#9C9DA4] rounded z-20"
						onMouseEnter={openLabelSelectBox}
						onMouseLeave={closeLabelSelectBox}
					>
						<p>hello world</p>
						<p>hello world</p>
						<p>hello world</p>
					</div>
				</>
			) : (
				/* For every other sort option */
				<div className="px-2 py-1 rounded-lg min-w-max" style={sortOptionStyle}>
					<p id={id} className="cursor-pointer" onClick={sortByOption}>
						{name}
					</p>
				</div>
			)}
		</>
	);
}

export default SortOption;
