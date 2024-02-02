import { useLocation } from "react-router-dom";
import { SmartAttorneyIcon } from "../../assets/smart-attorney-figma/sidebar";
import {
	Calendar_Active,
	Dashboard_Active,
	Notifications_Active,
	Projects_Active,
	Settings_Active,
	Team_Active,
} from "../../assets/smart-attorney-figma/sidebar/icons-active";
import {
	Calendar_Inactive,
	Dashboard_Inactive,
	Notifications_Inactive,
	Projects_Inactive,
	Settings_Inactive,
	Team_Inactive,
} from "../../assets/smart-attorney-figma/sidebar/icons-inactive";
import RenderButton from "./RenderButton";

/* 
Currently, the images are hard-coded and dynamically swapped when the path matches the location.
For the future, a much better method is to style the active-icon effect with CSS, but currently for the sake of time and sanity, the images are hard-coded. 
*/

function SidebarItemsContainer() {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		// This outer div keeps the buttons in place, even when scrolling past view height.
		<div className="fixed">
			{/* The Smart Attorney icon links to the landing page. */}
			<a href="https://www.smartattorney.co/" target="_blank" rel="noopener noreferrer">
				<img className="w-20 h-20 mb-3 cursor-pointer" src={SmartAttorneyIcon} />
			</a>

			<div className="flex flex-col items-center">
				<RenderButton
					path="/dashboard"
					imageSrc={currentPath === "/dashboard" ? Dashboard_Active : Dashboard_Inactive}
					label="Dashboard"
				/>
				<RenderButton
					path="/create-case"
					imageSrc={currentPath === "/create-case" ? Projects_Active : Projects_Inactive}
					label="Create Case"
				/>
				<RenderButton
					path="/calendar"
					imageSrc={currentPath === "/calendar" ? Calendar_Active : Calendar_Inactive}
					label="Calendar"
				/>
				<RenderButton
					path="/team"
					imageSrc={currentPath === "/team" ? Team_Active : Team_Inactive}
					label="Team"
				/>
				<RenderButton
					path="/notifications"
					imageSrc={currentPath === "/notifications" ? Notifications_Active : Notifications_Inactive}
					label="Notifications"
				/>
				<RenderButton
					path="/settings"
					imageSrc={currentPath === "/settings" ? Settings_Active : Settings_Inactive}
					label="Settings"
				/>
			</div>
		</div>
	);
}

export default SidebarItemsContainer;
