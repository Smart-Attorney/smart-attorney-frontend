import SmartAttorneyLogo from "../../assets/smart-attorney-figma/Favicon 1@4x 1.png";
import FolderFromFigma from "../../assets/smart-attorney-figma/FolderFromFigma.png";
import DashboardSym from "../../assets/smart-attorney-figma/DashboardIcon.png";
import calendar from "../../assets/smart-attorney-figma/Calendar.png";
import team from "../../assets/smart-attorney-figma/Team.png";
import notification from "../../assets/smart-attorney-figma/Component 2 (1).png";
import settings from "../../assets/smart-attorney-figma/Settings.png";
import { useNavigate, useLocation } from 'react-router-dom';

interface ButtonProps {
	path: string;
	imageSrc: string;
	label: string;
  }
function SidebarItems() {
	const navigate = useNavigate();
	const location = useLocation();

	const isCurrentPath = (path: string) => location.pathname === path;

	const renderButton = ({ path, imageSrc, label }: ButtonProps) => (
		<button
		  className={`cursor-pointer ${isCurrentPath(path) ? 'active' : ''}`}
		  onClick={() => navigate(path)}
		>
		  <div className={`flex items-center justify-center w-16 h-16 mt-4 mb-4 ${isCurrentPath(path) ? 'active-circle' : ''}`}>
			<img className="cursor-pointer w-8 h-8" src={imageSrc} alt={label} />
		  </div>
		</button>
	  );
	
	return (
		<div>
			<div className="flex flex-col items-center w-full h-full">
				<img className="cursor-pointer w-20 h-20" src={SmartAttorneyLogo} />
			</div>
			<div className="flex flex-col items-center w-full h-full">
				{renderButton({ path: '/dashboard', imageSrc: DashboardSym, label: 'Dashboard' })}
				{renderButton({ path: '/create-case', imageSrc: FolderFromFigma, label: 'Create Case' })}
				{renderButton({ path: '/calendar', imageSrc: calendar, label: 'Calendar' })}
				{renderButton({ path: '/team', imageSrc: team, label: 'Team' })}
				{renderButton({ path: '/notifications', imageSrc: notification, label: 'Notifications' })}
				{renderButton({ path: '/settings', imageSrc: settings, label: 'Settings' })}
			</div>
		</div>
	);
}

export default SidebarItems;
