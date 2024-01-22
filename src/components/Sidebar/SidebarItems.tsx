import { useNavigate } from "react-router-dom";

import {
	SmartAttorneyIcon,
	FolderIcon,
	DashboardIcon,
	CalendarIcon,
	TeamIcon,
	NotificationBellIcon,
	SettingsGearIcon,
} from "../../assets/smart-attorney-figma/sidebar";

function SidebarItems() {
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex flex-col items-center w-full h-full">
				<img className="w-20 h-20 cursor-pointer" src={SmartAttorneyIcon} />
			</div>
			<div className="flex flex-col items-center w-full h-full">
				<button className="cursor-pointer" onClick={() => navigate("/dashboard")}>
					<div className="flex flex-col items-center w-full h-full mt-8 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={DashboardIcon} />
					</div>
				</button>
				<button className="cursor-pointer" onClick={() => navigate("/create-case")}>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={FolderIcon} />
					</div>
				</button>
				<button
					className="cursor-pointer"
					onClick={() => {
						/* Handle button click */
					}}
				>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={CalendarIcon} />
					</div>
				</button>
				<button
					className="cursor-pointer"
					onClick={() => {
						/* Handle button click */
					}}
				>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={TeamIcon} />
					</div>
				</button>
				<button
					className="cursor-pointer"
					onClick={() => {
						/* Handle button click */
					}}
				>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={NotificationBellIcon} />
					</div>
				</button>
				<button
					className="cursor-pointer"
					onClick={() => {
						/* Handle button click */
					}}
				>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="w-10 h-10 cursor-pointer" src={SettingsGearIcon} />
					</div>
				</button>
			</div>
		</div>
	);
}

export default SidebarItems;
