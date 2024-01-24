import {
	CalendarIcon,
	DashboardIcon,
	FolderIcon,
	NotificationBellIcon,
	SettingsGearIcon,
	SmartAttorneyIcon,
	TeamIcon,
} from "../../assets/smart-attorney-figma/sidebar";

import RenderButton from "./RenderButton";

function SidebarItemsContainer() {
	return (
		// This outer div keeps the buttons in place, even when scrolling past view height.
		<div className="fixed">
			{/* The Smart Attorney icon links to the landing page. */}
			<a href="https://www.smartattorney.co/" target="_blank" rel="noopener noreferrer">
				<img className="w-20 h-20 cursor-pointer" src={SmartAttorneyIcon} />
			</a>

			<div className="flex flex-col items-center">
				<RenderButton path="/dashboard" imageSrc={DashboardIcon} label="Dashboard" />
				<RenderButton path="/create-case" imageSrc={FolderIcon} label="Create Case" />
				<RenderButton path="/calendar" imageSrc={CalendarIcon} label="Calendar" />
				<RenderButton path="/team" imageSrc={TeamIcon} label="Team" />
				<RenderButton path="/notifications" imageSrc={NotificationBellIcon} label="Notifications" />
				<RenderButton path="/settings" imageSrc={SettingsGearIcon} label="Settings" />
			</div>
		</div>
	);
}

export default SidebarItemsContainer;
