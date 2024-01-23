import {
	CalendarIcon,
	DashboardIcon,
	FolderIcon,
	NotificationBellIcon,
	SettingsGearIcon,
	SmartAttorneyIcon,
	TeamIcon,
} from "../../assets/smart-attorney-figma/sidebar";
import SidebarItem from "./SidebarItem";

function SidebarItemsContainer() {
	return (
		<div className="fixed flex flex-col items-center w-20">
			<a
				className="flex flex-col items-center w-full mb-5"
				href="https://www.smartattorney.co/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img className="w-16" src={SmartAttorneyIcon} />
			</a>
			<SidebarItem linkTo="/dashboard" image={DashboardIcon} />
			<SidebarItem linkTo="/create-case" image={FolderIcon} />
			<SidebarItem linkTo="" image={CalendarIcon} />
			<SidebarItem linkTo="" image={TeamIcon} />
			<SidebarItem linkTo="" image={NotificationBellIcon} />
			<SidebarItem linkTo="" image={SettingsGearIcon} />
		</div>
	);
}

export default SidebarItemsContainer;
