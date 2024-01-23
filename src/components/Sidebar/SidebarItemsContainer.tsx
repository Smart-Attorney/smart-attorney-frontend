import {
	CalendarIcon,
	DashboardIcon,
	FolderIcon,
	NotificationBellIcon,
	SettingsGearIcon,
	SmartAttorneyIcon,
	TeamIcon,
} from "../../assets/smart-attorney-figma/sidebar";

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
      <div className={`flex items-center justify-center w-12 h-12 mt-4 mb-4 ${isCurrentPath(path) ? 'active-circle' : ''}`}>
        <img className="cursor-pointer w-8 h-8" src={imageSrc} alt={label} />
      </div>
    </button>
  );

  return (
    <div>
      <div className="flex flex-col items-center w-full h-full">
        <img className="cursor-pointer w-20 h-20" src={SmartAttorneyIcon} />
      </div>
      <div className="flex flex-col items-center w-full h-full">
        {renderButton({ path: '/dashboard', imageSrc: DashboardIcon, label: 'Dashboard' })}
        {renderButton({ path: '/create-case', imageSrc: FolderIcon, label: 'Create Case' })}
        {renderButton({ path: '/calendar', imageSrc: CalendarIcon, label: 'Calendar' })}
        {renderButton({ path: '/team', imageSrc: TeamIcon, label: 'Team' })}
        {renderButton({ path: '/notifications', imageSrc: NotificationBellIcon, label: 'Notifications' })}
        {renderButton({ path: '/settings', imageSrc: SettingsGearIcon, label: 'Settings' })}
      </div>
    </div>
  );
}

export default SidebarItems;

