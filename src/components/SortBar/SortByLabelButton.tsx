import { useState } from "react";
import { LabelsDropdownMenuOptionObj } from "../../utils/types";
import LabelsDropdownMenuOptions from "./LabelsDropdownMenuOptions";

interface SortByLabelButtonProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByLabelsOption: (labelOption: string) => void;
	labelsMenuOptions: LabelsDropdownMenuOptionObj[] | null;
	updateLabelsMenuOptions: (newMenuOptions: LabelsDropdownMenuOptionObj[]) => void;
	toggleLabelsButtonClicked: (isClicked: boolean) => void;
}

function SortByLabelButton({
  id,
	name,
	clicked,
  //@ts-ignore
	sortByLabelsOption,
	labelsMenuOptions,
	updateLabelsMenuOptions,
	toggleLabelsButtonClicked,
}: SortByLabelButtonProps) {
	// collect all case folder labels
	// pass them into sort
	// add labels as select options in drop down
	// when clicking on labels, invoke the function sort by label

	const [isLabelsHovered, setIsLabelsHovered] = useState<boolean>(false);
	const [dropdownMenuPosition, setDropdownMenuPosition] = useState({
		top: 0,
		left: 0,
	});

	/************************************************************/

	const openDropdownMenu = () => {
		setIsLabelsHovered(true);
	};

	const closeDropdownMenu = () => {
		setIsLabelsHovered(false);
	};

	const handleMouseOnLabels = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const sortOption = (event.target as HTMLParagraphElement).id;
		if (sortOption != "Labels") return;
		const labelButtonCoords = document.getElementById("Labels")?.getBoundingClientRect();
		if (!labelButtonCoords) return;
		const dropdownMenuTopPosition = labelButtonCoords.top + labelButtonCoords.height;
		const dropdownMenuLeftPosition = labelButtonCoords.left;
		setDropdownMenuPosition({
			top: dropdownMenuTopPosition,
			left: dropdownMenuLeftPosition,
		});
		openDropdownMenu();
	};

	const toggleMenuOptionClicked = (menuOptionName: string) => {
		const updatedOptions = labelsMenuOptions!.map((option) =>
			menuOptionName === option.name ? { ...option, clicked: !option.clicked } : { ...option, clicked: false }
		);
		updateLabelsMenuOptions(updatedOptions);
	};

	const handleMenuOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		// TODO: bug here
		// if (checked === true) {
		// 	sortByLabelsOption(name);
		// }
		toggleMenuOptionClicked(name);
		toggleLabelsButtonClicked(checked);
	};

	/************************************************************/

	const menuOptionElements = labelsMenuOptions?.map(({ id, name, clicked }) => (
		<LabelsDropdownMenuOptions key={id} id={id} name={name} clicked={clicked} onChange={handleMenuOptionClick} />
	));

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
					onMouseEnter={(event) => handleMouseOnLabels(event)}
					onMouseLeave={closeDropdownMenu}
				>
					{name}
				</p>
			</div>

			{/* Labels Dropdown Menu */}
			<div
				id="labels-dropdown-menu"
				style={{
					visibility: isLabelsHovered ? "visible" : "hidden",
					top: `${dropdownMenuPosition.top}px`,
					left: `${dropdownMenuPosition.left}px`,
				}}
				className="absolute w-[132px] min-h-max bg-white border border-[#9C9DA4] rounded z-20"
				onMouseEnter={openDropdownMenu}
				onMouseLeave={closeDropdownMenu}
			>
				{labelsMenuOptions?.length === 0 ? (
					<div className="py-1 px-2.5">
						<p className="text-sm italic text-center">no labels</p>
					</div>
				) : (
					menuOptionElements
				)}
			</div>
		</>
	);
}

export default SortByLabelButton;
