import SmartAttorneyLogo from "../../assets/smart-attorney-figma/Favicon 1@4x 1@3x.png";

function SidebarItems() {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<img className="cursor-pointer w-14 h-14" src={SmartAttorneyLogo} />
		</div>
	);
}

export default SidebarItems;
