import SmartAttorneyLogo from "../../assets/smart-attorney-figma/Favicon 1@4x 1@3x.png";
import FolderFromFigma from "../../assets/smart-attorney-figma/FolderFromFigma.png";
import DashboardSym from "../../assets/smart-attorney-figma/DashboardIcon.png";
import calendar from "../../assets/smart-attorney-figma/Calendar.png";
import team from "../../assets/smart-attorney-figma/Team.png";
import notification from "../../assets/smart-attorney-figma/Component 2 (1).png";
import settings from "../../assets/smart-attorney-figma/Settings.png";
import { useNavigate } from "react-router-dom";
function SidebarItems() {
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex flex-col items-center w-full h-full">
				<img className="cursor-pointer w-20 h-20" src={SmartAttorneyLogo} />
			</div>
			<div className="flex flex-col items-center w-full h-full">
				<button className ="cursor-pointer" onClick={() => navigate("/dashboard")}>
					<div className="flex flex-col items-center w-full h-full mt-8 mb-4">
						<img className="cursor-pointer w-10 h-10" src={DashboardSym} />
					</div>
				</button>
				<button className ="cursor-pointer" onClick={() => navigate("/create-case")}> 
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="cursor-pointer w-10 h-10" src={FolderFromFigma} />
					</div>
				</button>
				<button className ="cursor-pointer" onClick={() => { /* Handle button click */ }}>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="cursor-pointer w-10 h-10" src={calendar} />
					</div>
				</button>
				<button className ="cursor-pointer" onClick={() => { /* Handle button click */ }}>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="cursor-pointer w-10 h-10" src={team} />
					</div>
				</button>
				<button className ="cursor-pointer" onClick={() => { /* Handle button click */ }}>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="cursor-pointer w-10 h-10" src={notification} />
					</div>
				</button>
				<button className ="cursor-pointer" onClick={() => { /* Handle button click */ }}>
					<div className="flex flex-col items-center w-full h-full mt-4 mb-4">
						<img className="cursor-pointer w-10 h-10" src={settings} />
					</div>
				</button>
			</div>
		</div>
	);
}

export default SidebarItems;
