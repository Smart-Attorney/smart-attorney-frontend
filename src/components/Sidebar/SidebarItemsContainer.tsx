import {
	CalendarBlack,
	DashboardBlack,
	NotificationBlack,
	ProjectsBlack,
	SettingsBlack,
	SmartAttorneyIcon,
	TeamBlack,
} from "../../assets/smart-attorney-figma/sidebar";
import RenderButton from "./RenderButton";

function SidebarItemsContainer() {
	return (
		// This outer div keeps the buttons in place, even when scrolling past view height.
		<div className="fixed">
			{/* The Smart Attorney icon links to the landing page. */}
			<a href="https://www.smartattorney.co/" target="_blank" rel="noopener noreferrer">
				<img className="w-20 h-20 mb-3 cursor-pointer" src={SmartAttorneyIcon} />
			</a>

			<div className="flex flex-col items-center">
				<RenderButton path="/dashboard" imageSrc={DashboardBlack} label="Dashboard" />
				<RenderButton path="/create-case" imageSrc={ProjectsBlack} label="Create Case" />
				<RenderButton path="/calendar" imageSrc={CalendarBlack} label="Calendar" />
				<RenderButton path="/team" imageSrc={TeamBlack} label="Team" />
				<RenderButton path="/notifications" imageSrc={NotificationBlack} label="Notifications" />
				<RenderButton path="/settings" imageSrc={SettingsBlack} label="Settings" />
			</div>
		</div>
	);
}

export default SidebarItemsContainer;
