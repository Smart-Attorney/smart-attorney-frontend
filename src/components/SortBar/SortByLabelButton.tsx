import { useEffect, useState } from "react";
import { CaseLabelUtils } from "../../utils/case-label-utils";
import { CaseFolderLabelObj, LabelsDropdownMenuOptionObj } from "../../utils/types";
import LabelsDropdownMenuOptions from "./LabelsDropdownMenuOptions";
import { getCaseLabels } from "./api/get-case-labels";

interface SortByLabelButtonProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByLabelsOption: (labelOption: string) => void;
	toggleLabelsButtonClicked: (isClicked: boolean) => void;
	// labelsMenuOptions: LabelsDropdownMenuOptionObj[] | null;
	// updateLabelsMenuOptions: (newMenuOptions: LabelsDropdownMenuOptionObj[]) => void;
}

function SortByLabelButton({
	id,
	name,
	clicked,
	//@ts-ignore
	sortByLabelsOption,
	toggleLabelsButtonClicked,
	// labelsMenuOptions,
	// updateLabelsMenuOptions,
}: SortByLabelButtonProps) {
	const [isLabelsHovered, setIsLabelsHovered] = useState<boolean>(false);
	const [dropdownMenuPosition, setDropdownMenuPosition] = useState({
		top: 0,
		left: 0,
	});
	const [menuOptions, setMenuOptions] = useState<LabelsDropdownMenuOptionObj[]>();

	useEffect(() => {
		handleGetUserCaseLabels();
		// console.log(menuOptions);
	}, []);

	/************************************************************/

	const handleGetUserCaseLabels = async () => {
		try {
			const response = await getCaseLabels();
			if (response.ok) {
				const data: CaseFolderLabelObj[] = await response.json();
				const sortedLabels = CaseLabelUtils.sortAlphabetically(data);
				const uniqueLabels = CaseLabelUtils.filterUniqueLabels(sortedLabels);
				const labelOptions = parseLabelOptions(uniqueLabels);
				setMenuOptions(labelOptions);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const parseLabelOptions = (caseLabels: Map<string, string>): LabelsDropdownMenuOptionObj[] => {
		let optionsArr: LabelsDropdownMenuOptionObj[] = [];
		caseLabels.forEach((key) => {
			const parsedLabelName = key.substring(0, 1).toUpperCase() + key.substring(1, key.length).toLowerCase();
			optionsArr.push({
				id: key,
				name: parsedLabelName,
				clicked: false,
			});
		});
		return optionsArr;
	};

	/************************************************************/

	const openDropdownMenu = () => {
		setIsLabelsHovered(true);
	};

	const closeDropdownMenu = () => {
		setIsLabelsHovered(false);
	};

	/************************************************************/

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
		const updatedOptions = menuOptions?.map((option) =>
			menuOptionName === option.name ? { ...option, clicked: !option.clicked } : { ...option, clicked: false }
		);
    setMenuOptions(updatedOptions);
		// const updatedOptions = labelsMenuOptions!.map((option) =>
		// 	menuOptionName === option.name ? { ...option, clicked: !option.clicked } : { ...option, clicked: false }
		// );
		// updateLabelsMenuOptions(updatedOptions);
	};

	const handleMenuOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		// TODO: bug here
		if (checked === true) {
			sortByLabelsOption(name);
		}
		toggleMenuOptionClicked(name);
		toggleLabelsButtonClicked(checked);
	};

	/************************************************************/

	const menuOptionElements = menuOptions?.map(({ id, name, clicked }) => (
		<LabelsDropdownMenuOptions key={id} id={id} name={name} clicked={clicked} onChange={handleMenuOptionClick} />
	));
	// const menuOptionElements = labelsMenuOptions?.map(({ id, name, clicked }) => (
	// 	<LabelsDropdownMenuOptions key={id} id={id} name={name} clicked={clicked} onChange={handleMenuOptionClick} />
	// ));

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
				{menuOptions?.length === 0 ? (
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
