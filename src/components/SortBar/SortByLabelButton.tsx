import { useEffect, useRef, useState } from "react";
import { CaseLabelUtils } from "../../utils/case-label-utils";
import { CaseLabelObj, DashboardCaseCardObj, LabelsDropdownMenuOptionObj } from "../../types/api";
import LabelsDropdownMenuOptions from "./LabelsDropdownMenuOptions";
import { getCaseLabels } from "./api/get-case-labels";

interface SortByLabelButtonProps {
	id: string;
	name: string;
	clicked: boolean;
	sortByLabelsOption: (labelOption: string) => void;
	toggleLabelsButtonClicked: (isClicked: boolean) => void;
	isMenuOptionChecked: boolean;
	caseLabels?: DashboardCaseCardObj[] | null;
}

function SortByLabelButton(props: SortByLabelButtonProps) {
	const { id, name, clicked, sortByLabelsOption, toggleLabelsButtonClicked, isMenuOptionChecked, caseLabels } = props;

	const selectedOption = useRef<string>("");

	const [isLabelsHovered, setIsLabelsHovered] = useState<boolean>(false);
	const [dropdownMenuPosition, setDropdownMenuPosition] = useState({
		top: 0,
		left: 0,
	});
	const [menuOptions, setMenuOptions] = useState<LabelsDropdownMenuOptionObj[]>();

	useEffect(() => {
		handleGetUserCaseLabels();
	}, [caseLabels]);

	useEffect(() => {
		if (isMenuOptionChecked) return;
		selectedOption.current = "";
		uncheckAllMenuOptions();
	}, [isMenuOptionChecked]);

	/************************************************************/

	const handleGetUserCaseLabels = async () => {
		try {
			const response = await getCaseLabels();
			if (response.ok) {
				const data: CaseLabelObj[] = await response.json();
				const sortedLabels = CaseLabelUtils.alphabetize(data);
				const uniqueLabels = CaseLabelUtils.unique(sortedLabels);
				const menuOptions = formatLabels(uniqueLabels);
				setMenuOptions(menuOptions);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const formatLabels = (labels: Set<string>): LabelsDropdownMenuOptionObj[] => {
		let formattedLabels: LabelsDropdownMenuOptionObj[] = [];
		for (let label of labels) {
			const labelName = label.substring(0, 1).toUpperCase() + label.substring(1, label.length).toLowerCase();
			formattedLabels.push({
				id: labelName,
				name: labelName,
				isClicked: selectedOption.current.toLowerCase() === label.toLowerCase() ? true : false,
			});
		}
		return formattedLabels;
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

	const uncheckAllMenuOptions = (): void => {
		const updatedOptions = menuOptions?.map((option) => ({ ...option, isClicked: false }));
		setMenuOptions(updatedOptions);
	};

	const toggleMenuOptionClicked = (menuOptionName: string) => {
		const updatedOptions = menuOptions?.map((option) =>
			menuOptionName === option.name ? { ...option, isClicked: !option.isClicked } : { ...option, isClicked: false }
		);
		setMenuOptions(updatedOptions);
	};

	const handleMenuOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		if (checked === true) {
			selectedOption.current = name.toLowerCase();
			sortByLabelsOption(name);
		}
		toggleMenuOptionClicked(name);
		toggleLabelsButtonClicked(checked);
	};

	/************************************************************/

	const menuOptionElements = menuOptions?.map(({ id, name, isClicked }) => (
		<LabelsDropdownMenuOptions key={id} id={id} name={name} clicked={isClicked} onChange={handleMenuOptionClick} />
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
