import { useState } from "react";

interface SortByLabelButtonProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByOption: (event: React.MouseEvent<HTMLParagraphElement>) => void;
	labels: Map<string, string> | undefined;
	sortByLabel?: () => void;
}

function SortByLabelButton({ id, name, clicked, sortByOption, labels }: SortByLabelButtonProps) {
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
		const labelButtonCoords = document.getElementById("Labels")?.getBoundingClientRect();
		if (!labelButtonCoords) return;

		const selectBoxTopPosition = labelButtonCoords.top + labelButtonCoords.height;
		const selectBoxLeftPosition = labelButtonCoords.left;

		setSelectBoxPosition({
			top: selectBoxTopPosition,
			left: selectBoxLeftPosition,
		});

		openLabelSelectBox();
	};

	const labelElements = Array.from(labels!).map(([key, value]) => {
		return (
			<div key={key} className="flex flex-row gap-x-2 hover:bg-[#dddddd] py-1 px-2.5">
				<input type="checkbox" id={key} name={value} className="cursor-pointer" />
				<label htmlFor={key} className="w-full overflow-x-hidden text-sm cursor-pointer overflow-ellipsis">
					{value}
				</label>
			</div>
		);
	});

	return (
		<>
			<div
				className="px-2 py-1 rounded-lg min-w-max"
				style={{
					color: clicked ? "black" : "white",
					backgroundColor: clicked ? "white" : "transparent",
				}}
			>
				<p
					id={id}
					className="cursor-pointer"
					onClick={
						labelElements.length > 0
							? sortByOption
							: () => {
									return;
								}
					}
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
				className="absolute w-[132px] min-h-max bg-white border border-[#9C9DA4] rounded z-20"
				onMouseEnter={openLabelSelectBox}
				onMouseLeave={closeLabelSelectBox}
			>
				{labelElements.length > 0 ? (
					labelElements
				) : (
					<div>
						<p className="text-sm italic text-center">no labels</p>
					</div>
				)}
			</div>
		</>
	);
}

export default SortByLabelButton;
